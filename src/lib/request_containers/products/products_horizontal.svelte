<script context="module">

</script>

<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import HorizontalList from '$lib/components/collections/horizontal_list/list.svelte';
    import VerticalList from '$lib/components/collections/vertical_list/list.svelte';
    import { prod } from '$app/env';

    let requestPath = get(store.paths.openMarketProducts);
    // let products;
    let productsList=null;
    export let filters = {};
    export const listType="horizontal";// can be vertical & grid
    console.log(requestPath);

    onMount(_initialize);

    function _initialize(){
        console.log("initializing");
        getProducts();
    }

    async function getProducts()
	{
		try{
            let productsRes = await fetch(requestPath+"/all"+utilities.serialize(filters),{method:"get"});
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    let products = response.data;
                    productsList = getProductsList(products);
                    console.log(productsList);
                    console.log("successfully aquired products list");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring products list!");
            console.log(err.message);
        }	
	}


    function getProductsList(products)
    {
        console.log("inside get Products")
        return products.map((product)=>{
            return {id:product._id,item_type:product.product_type,image_url:product.thumbnail,title:product.name,subtitle:product.price,description:product.description,target:"/marketplace/products/"+product._id};
        });
    }

</script>

{#if productsList && listType == "horizontal"}
    <HorizontalList list={productsList} heading="Products" subheading="" target="/marketplace/products/"/>
{/if}
