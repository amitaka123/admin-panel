<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import OrderProductsListItem from '$lib/components/orders/list_items/order_products_list_item.svelte';

    export let productId;
    let product;
    let requestPath = get(store.paths.openMarketProducts);
    export let filters = {};
    export const listType="grid";// can be vertical & grid
    console.log(requestPath);

    onMount(_initialize);
    async function _initialize(){
        getProduct();
    }
    
    async function getProduct()
	{
        if(!productId){
            console.log("No product Id found");
            return;
        }
		try{
            let productsRes = await fetch(requestPath+"/single/"+productId+""+utilities.serialize(filters),{method:"get"});
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


{#if product}
    <OrderProductsListItem {product}/>
{/if}
