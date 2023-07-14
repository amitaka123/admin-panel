<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import PhysicalProduct from '$lib/components/products/physical_product.svelte';
    import DigitalProduct from '$lib/components/products/digital_product.svelte';
    import ServiceProduct from '$lib/components/products/service_product.svelte';

    export let productId;

    let product;
    // let authStore;
    // let cartManager;

    let requestPath = get(store.paths.openMarketProducts);
    // let products;
    export let filters = {};
    export const listType="grid";// can be vertical & grid
    console.log(requestPath);

    onMount(_initialize);

    async function _initialize(){
        // authStore = (await import('$lib/stores/authentication')).authStore;
        // cartManager = (await import('$lib/managers/cart_manager')); 
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
    {#if product.product_type=="physical"}
     <PhysicalProduct {product} />
    {/if}
    {#if product.product_type=="digital"}
     <DigitalProduct {product} />
    {/if}
    {#if product.product_type=="service"}   
     <ServiceProduct {product} />
    {/if}
{/if}
