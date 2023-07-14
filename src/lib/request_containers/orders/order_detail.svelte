<script>
    
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import OrderDetails from '$lib/components/orders/order_details.svelte';


    export let orderId;

    let order;

    let requestPath = get(store.paths.openMarketOrders);
    // let products;
    export let filters = {};
    export const listType="grid";// can be vertical & grid
    console.log(requestPath);

    //take from here for login check!

    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    let authStore;

    onMount(_initialize);

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        if(get(authStore).isAuthenticated()){
            getProducts();
        }
        else{
            location.href="/";
        }
    }

    // Login check ends!

    async function getProducts()
	{
        if(!orderId){
            console.log("No product Id found");
            return;
        }
		try{
            let productsRes = await fetch(requestPath+"/single/"+orderId+""+utilities.serialize(filters),{method:"get",headers:{'Authorization':"Bearer "+get(authStore).token}});
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    product = response.data;
                    console.log("successfully aquired product");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring product!");
            console.log(err.message);
        }	
	}
</script>


{#if order}
    <OrderDetails order={order} />
{/if}
