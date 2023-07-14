<script context="module">

</script>

<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import GridList from '$lib/components/collections/grid/list.svelte';

    let requestPath = get(store.paths.panelCertificates);
    // let products;
    let certificatesList=null;
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
                    let certificates = response.data;
                    certificatesList = getCertificatesList(certificates);
                    console.log(certificatesList);
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


    function getCertificatesList(certificates)
    {
        console.log("inside get Products")
        return certificates.map((certificate)=>{
            return {id:certificate._id,item_type:certificate.color,image_url:certificate.logo,title:certificate.name,subtitle:certificate.price,description:certificate.description,target:"/certifications/certificates/"+certificate._id};
        });
    }

</script>

{#if certificatesList}
    <GridList list={certificatesList} heading="Reiki Certificates" subheading="All CERTIFICATES" />
{/if}
