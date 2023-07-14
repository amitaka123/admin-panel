<script context="module">

</script>

<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import HorizontalList from '$lib/components/collections/horizontal_list/list.svelte';
    import GridList from '$lib/components/collections/grid/list.svelte';
    // import VerticalList from '$lib/components/collections/vertical_list/list.svelte';
    import { prod } from '$app/env';

    let requestPath = get(store.paths.panelTemplates);
    // let products;
    let templatesList=null;
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
            let productsRes = await fetch(requestPath+"/all"+utilities.serialize(filters),{method:"get",headers:{"Authorization":"Bearer "+get(authStore).token}    });
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    let templates = response.data;
                    templatesList = getTemplatesList(templates);
                    console.log(templatesList);
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


    function getTemplatesList(templates)
    {
        console.log("inside get Products")
        return templates.map((template)=>{
            return {id:template._id,item_type:template.color,image_url:template.logo,title:template.name,subtitle:template.price,description:template.description,target:"/certifications/templates/"+template._id};
        });
    }

</script>

{#if templatesList}
    <GridList list={templatesList} heading="Reiki Certificate Templates" subheading="All TEMPLATES" />
{/if}
