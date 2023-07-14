<script>
    import store from '$lib/stores/store.js';
    let requestPath = get(store.paths.openMarketOrders);

    
    import utilities from '$lib/utils/functions';
    import VerticalList from '$lib/components/collections/vertical_list/list.svelte';

    
    let ordersList=null;
    export let filters = {};
    console.log(requestPath);

   //take from here for login check!

   import {onMount} from 'svelte';
    import { get } from 'svelte/store';
import OrderListItem from '$lib/components/orders/list_items/order_list_item.svelte';
    let authStore;

    onMount(_initialize);

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        if(get(authStore).isAuthenticated()){
            getOrders();
        }
        else{
            console.log("token not found");
            location.href="/";
        }
    }

    // Login check ends!

    async function getOrders()
	{
		try{
            let ordersRes = await fetch(requestPath+"/all"+utilities.serialize(filters),{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
            if(ordersRes.status==200)
            {
                let response = await ordersRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    let orders = response.data;
                    ordersList = getOrdersList(orders);
                    console.log(ordersList);
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring Orders list!");
            console.log(err.message);
        }	
	}


    function getOrdersList(orders)
    {
        console.log("inside get Orders")
        return orders.map((order)=>{
            return {id:order._id,item_type:order.delivery_type,title:order.status,subtitle:order.amount,description:order.items.length+" Items in the Order",target:"/marketplace/orders/"+order._id};
        });
    }

</script>


{#if ordersList}
    {#each ordersList as order}
        <OrderListItem order={order} />
    {/each}
{/if}
