
import { cartStore } from "$lib/stores/cart";
import { get } from "svelte/store";
import store from '$lib/stores/store.js';
let requestPath = get(store.paths.openUserCart);

class CartManager{
    constructor(){
        this.initialized=false;
        console.log("initializing Cart with path: "+requestPath);
        // console.log(get(cartStore));
        this.fetchCart();
        // this.token = token;
    }

    getCart = async function(){
        if(this.initialized)
            return get(cartStore).cart;
        else{
            let ret=await this.fetchCart();
            if(ret)
                return get(cartStore).cart;
            else
                return false;
        }
    };

    getCartStore = async function(){
        if(this.initialized)
            return cartStore;
        else{
            let ret=await this.fetchCart();
            if(ret)
                return cartStore;
            else
                return false;
        }
    };


    //use this function to display what is on there on the cart details page!
    // fetchFullCart=async function()
	// {
    //     // console.log("fetching cart");
    //     let authStore = (await import('$lib/stores/authentication')).authStore;
    //     if(!get(authStore).isAuthenticated()){
    //         console.log("no token found while fetching cart");
    //         return false;
    //     }
	// 	try{
    //         console.log("trying to fetch cart");
    //         let ordersRes = await fetch(requestPath+"/full",{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
    //         // console.log(ordersRes);
    //         if(ordersRes.status==200)
    //         {
    //             let response = await ordersRes.text();
    //             // console.log(response);
    //             response = JSON.parse(response);
    //             // @ts-ignore
    //             if(response.status == "success")
    //             {
    //                 // @ts-ignore
    //                 let cart = response.data;
    //                 return cart;
    //                 // this.cart = cart;
    //             }
    //         }
    //         else{
    //             console.log("fetching cart failed");
    //             cartStore.update(state=>{
    //                 state.error=true;
    //                 return state;
    //             });
    //             return false;
    //             // console.log(ordersRes.status);
    //         }
    //     }
    //     catch(err)
    //     {
    //         console.log("fetching cart failed in catch");
    //         cartStore.update(state=>{
    //             state.error=true;
    //             return state;
    //         });
    //         return false;
    //         // alert("Some Problem has occured in aquiring your shopping Cart!");
    //         // console.log(err.message);
    //     }	

	// };

    fetchCart=async function()
	{
        // console.log("fetching cart");
        let authStore = (await import('$lib/stores/authentication')).authStore;
        if(!get(authStore).isAuthenticated()){
            console.log("no token found while fetching cart");
            return false;
        }
		try{
            console.log("trying to fetch cart");
            let ordersRes = await fetch(requestPath,{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
            // console.log(ordersRes);
            if(ordersRes.status==200)
            {
                let response = await ordersRes.text();
                // console.log(response);
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    let cart = response.data;
                    // console.log("state updating");
                    cartStore.update(state=>{
                        state.cart=cart;
                        state.error=false;
                        return state;
                    });
                    this.initialized=true;
                    return true;
                    // this.cart = cart;
                }
            }
            else{
                console.log("fetching cart failed");
                cartStore.update(state=>{
                    state.error=true;
                    return state;
                });
                return false;
                // console.log(ordersRes.status);
            }
        }
        catch(err)
        {
            console.log("fetching cart failed in catch");
            cartStore.update(state=>{
                state.error=true;
                return state;
            });
            return false;
            // alert("Some Problem has occured in aquiring your shopping Cart!");
            // console.log(err.message);
        }	

	}

    addItem=async function(productId,quantity=1)
	{
        // console.log("fetching cart");
        let authStore = (await import('$lib/stores/authentication')).authStore;
        if(!get(authStore).isAuthenticated()){
            console.log("no token found while fetching cart");
            return false;
        }
		try{
            console.log("trying to fetch cart");
            let ordersRes = await fetch(requestPath+"/add_item",{method:"post",headers:{'Content-Type':"application/json",Authorization:"Bearer "+get(authStore).token},body:JSON.stringify({product_id:productId,quantity:quantity})});
            if(ordersRes.status==200)
            {
                let response = await ordersRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    let cart = response.data;
                    cartStore.update(state=>{
                        state.cart=cart;
                        state.error=false;
                        return state;
                    });
                    this.initialized=true;
                    console.log("returning true");
                    return true;
                }
            }
            else{
                console.log("fetching cart failed");
                cartStore.update(state=>{
                    state.error=true;
                    return state;
                });
                return false;
                // console.log(ordersRes.status);
            }
        }
        catch(err)
        {
            console.log("fetching cart failed in catch");
            cartStore.update(state=>{
                state.error=true;
                return state;
            });
            return false;
            // alert("Some Problem has occured in aquiring your shopping Cart!");
            // console.log(err.message);
        }	

	}

    removeItem=async function(productId)
	{
        // console.log("fetching cart");
        let authStore = (await import('$lib/stores/authentication')).authStore;
        if(!get(authStore).isAuthenticated()){
            console.log("no token found while fetching cart");
            return false;
        }
		try{
            console.log("trying to fetch cart");
            let ordersRes = await fetch(requestPath+"/remove_item" +"/"+productId,{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
            if(ordersRes.status==200)
            {
                let response = await ordersRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    let cart = response.data;
                    cartStore.update(state=>{
                        state.cart=cart;
                        state.error=false;
                        return state;
                    });
                    this.initialized=true;
                    return true;
                }
            }
            else{
                console.log("fetching cart failed");
                cartStore.update(state=>{
                    state.error=true;
                    return state;
                });
                return false;
                // console.log(ordersRes.status);
            }
        }
        catch(err)
        {
            console.log("fetching cart failed in catch");
            cartStore.update(state=>{
                state.error=true;
                return state;
            });
            return false;
            // alert("Some Problem has occured in aquiring your shopping Cart!");
            // console.log(err.message);
        }	
        
	}

    checkIfPresentInCart=async function(productId)
    {
        let authStore = (await import('$lib/stores/authentication')).authStore;
        if(!get(authStore).isAuthenticated()){
            console.log("no token found while fetching cart");
            return false;
        }
		try{
            let cart = get(cartStore).cart;
            let found = false;
            cart.map(item=>{
                if(item.product == productId)
                {
                    found=true;
                    console.log("found the product Id");
                }
            });
            if(found)
                return true;
            else
                return false;
        }
        catch(err){
            console.log(err.message);
        }
    }

    
}
let cartManager=new CartManager();

export default cartManager;