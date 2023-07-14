<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';


    let requestPath = get(store.paths.panelHostInfoPath);
    export let infoId=null;
    // let products;
    let hostInfo=null;
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
               await getInfo();
            }
        else{
            console.log("else");
        }
    }

    // async function enableAsHost(){
    //     await toggleEnabledHost(true);
    // }

    // async function disableAsHost(){
    //     await toggleEnabledHost(false);
    // }


    // async function toggleEnabledHost(val){
    //     try{
    //         let data={"enabled_as_host":val};
    //         let done = await fetch(requestPath+"/edit/"+infoId,{method:"post",headers:{"Authorization":"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify(data)});
    //         if(done.status==200)
    //         {
    //             alert("successfully Enabled");
    //             location.reload();
    //         }
    //         else{
    //             //asdsad
    //             alert("Something went wrong!");
    //             // location.reload();
    //         }
    //     }
    //     catch(err)
    //     {
    //         alert("Some Problem has occured");
    //         console.log(err.message);
    //     }	
    // }

    async function getInfo()
	{
		try{
            let productsRes = await fetch(requestPath+"/single/"+infoId,{method:"get",headers:{"Authorization":"Bearer "+get(authStore).token}    });
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    hostInfo = response.data;
                    console.log("successfully aquired host info");
                    console.log(hostInfo);
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring the user!");
            console.log(err.message);
        }	
	}
</script>

{#if hostInfo}
<div class="m-20">
<table class="w3-table-all w3-hoverable">
    <thead>
        <tr class="w3-light-grey">
        <th>Host Id</th>
        <!-- <th>Email</th>
        <th>phone</th>
        <th>Enabled as a Host</th>
        <th>Enabled as a Administrator</th>
        <th>Host Information</th>
        <th>User ID</th> -->
        </tr>
    </thead>
    <tr class="w3-hover-shadow">
        <!-- <td>{hostInfo.name}{hostInfo.enabled_as_administrator?"(Administrator)":""}</td> -->
        <td>{hostInfo.host._id}</td>
        <!-- <td>{hostInfo.phone}</td>
        <td>{hostInfo.enabled_as_host}</td>
        <td>{hostInfo.enabled_as_administrator}</td>
        {#if hostInfo.host_information}
        <td><a class="w3-text-blue"  href="/hostInfos/host_info/{hostInfo.host_information._id}">{hostInfo.host_information._id}</a></td>
        {:else}
        <td>-</td>  
        {/if}
        <td>{hostInfo._id}</td> -->
    </tr>
    </table>
    <!-- <hostInfos hostInfos={hostInfo} /> -->
</div>
<hr>
<!-- <p class="text-2xl">Options</p> -->
<!-- {#if hostInfo.enabled_as_host}
<button class="btn bg-red-400 p-10 m-20" on:click={disableAsHost}>Disable as host</button>
{:else}
<button class="btn bg-green-400 p-10 m-20" on:click={enableAsHost }>Enable as Host</button>
{/if} -->
    
{/if}
