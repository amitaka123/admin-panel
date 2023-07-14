<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
import ImageUpload from '../general/imageUpload.svelte';
    let configurations;
    let authStore;


    let requestPath = get(store.paths.panelCertificates);

    onMount(_initialize);

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        getConfiguration();
    }


    

    async function getConfiguration()
	{
        
		try{
            let res = await fetch(requestPath+"/configurations",{method:"get",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"}});
            if(res.status==200)
            {
                let response = await res.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    configurations = response.data;
                    console.log("successfully aquired configurations");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring configurations!");
            console.log(err.message);
        }	
	}

    async function savecertificateConfigurations(){
    console.log("edit");
    if(configurations==null)
    {
        alert("no configuration found to update");
        return ;
    }
    try{
            let productsRes = await fetch(requestPath+"/"+configurations,{method:"post",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(configurations)});
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {

                    // @ts-ignore
                    alert("successfully saved configurations");
                    //location.reload();
                }
            }
        }
        catch(err)
        {
            alert(err.message);
            console.log(err.message);
        }
}
</script>


{#if configurations}

<form on:submit|preventDefault={savecertificateConfigurations}  class="mx-10">
    <div class="flex justify-center">
        <div>
            
        <ImageUpload url={"/api/panel/files/image_upload"} avatar={configurations.logo} bind:uploadedPath={configurations.logo}/>
        <p class="text-2xl text-center">Logo</p>
        </div>
        <div>
            
            
        <ImageUpload url={"/api/panel/files/image_upload"} avatar={configurations.signature} bind:uploadedPath={configurations.signature}/>
        <p class="text-2xl text-center">Signature Image</p>
        </div>
    </div>
Title:<input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={configurations.title} placeholder="Title of the Post" />
Organization:<input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={configurations.organization} placeholder="Organization" />
        
<input class=" btn rounded-lg shadow-xl bg-blue-400 mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200 cursor-pointer" type="submit" value="Save">

</form>
{/if}
