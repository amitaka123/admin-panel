<script context="module">

</script>

<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import GridList from '$lib/components/collections/grid/list.svelte';
    import Events from '$lib/components/collections/lists/events.svelte';
    import Advertisements from '$lib/components/collections/lists/advertisements.svelte';

    let requestPath = get(store.paths.panelAdvertisements);
    // let products;
    let advertisements=null;
    export let filters = {};
    // export const listType="grid";// can be vertical & grid
    console.log(requestPath);

    onMount(_initialize);
    let authStore;

    async function _initialize(){
        console.log("initializing");
        authStore = (await import('$lib/stores/authentication')).authStore;
        if(authStore && get(authStore).isAuthenticated())
            {
               await getProducts();
            }
        else{
            console.log("else");
        }
    }

    async function getProducts()
	{
		try{
            let productsRes = await fetch(requestPath,{method:"get",headers:{"Authorization":"Bearer "+get(authStore).token}    });
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    advertisements = response.data;
                    // advertisements = getadvertisementsList(advertisements);
                    // console.log(advertisementsList);
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


    // function getAdvertisementsList(advertisements)
    // {
    //     console.log("inside get Products")
    //     return advertisements.map((event)=>{
    //         return {id:event._id,title:event.name,subtitle:event.price,description:event.description,target:"/advertisements/"+event._id};
    //     });
    // }

</script>

{#if advertisements}
<div class="m-20">
    <!-- <Advertisements -->
    <Advertisements advertisements={advertisements} />
</div>
    
{/if}
