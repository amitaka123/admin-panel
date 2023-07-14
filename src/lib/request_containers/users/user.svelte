<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import GridList from '$lib/components/collections/grid/list.svelte';
    import Users from '$lib/components/collections/lists/users.svelte';

    let requestPath = get(store.paths.panelUsersPath);
    export let userId=null;
    // let products;
    let user=null;
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
               await getUser();
            }
        else{
            console.log("else");
        }
    }

    async function enableAsHost(){
        await toggleEnabledHost(true);
    }

    async function disableAsHost(){
        await toggleEnabledHost(false);
    }


    async function toggleEnabledHost(val){
        try{
            let data={"enabled_as_host":val};
            let done = await fetch(requestPath+"/edit/"+userId,{method:"post",headers:{"Authorization":"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify(data)});
            if(done.status==200)
            {
                alert("successfully Enabled");
                location.reload();
            }
            else{
                //asdsad
                alert("Something went wrong!");
                // location.reload();
            }
        }
        catch(err)
        {
            alert("Some Problem has occured");
            console.log(err.message);
        }	
    }

    async function getUser()
	{
		try{
            let productsRes = await fetch(requestPath+"/single/"+userId,{method:"get",headers:{"Authorization":"Bearer "+get(authStore).token}    });
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    user = response.data;
                    console.log("successfully aquired user");
                    console.log(user);
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

{#if user}
<div class="m-20">
<table class="w3-table-all w3-hoverable">
    <thead>
        <tr class="w3-light-grey">
        <th>Name</th>
        <th>Email</th>
        <th>phone</th>
        <th>Enabled as a Host</th>
        <th>Enabled as a Administrator</th>
        <th>Host Information</th>
        <th>User ID</th>
        </tr>
    </thead>
    <tr class="w3-hover-shadow">
        <td>{user.name}{user.enabled_as_administrator?"(Administrator)":""}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.enabled_as_host}</td>
        <td>{user.enabled_as_administrator}</td>
        {#if user.host_information}
        <td><a class="w3-text-blue"  href="/users/host/{user.host_information._id}">{user.host_information._id}</a></td>
        {:else}
        <td>-</td>  
        {/if}
        <td>{user._id}</td>
    </tr>
    </table>
    <!-- <Users users={user} /> -->
</div>
<hr>
<p class="text-2xl">Options</p>
{#if user.enabled_as_host}
<button class="btn bg-red-400 p-10 m-20" on:click={disableAsHost}>Disable as host</button>
{:else}
<button class="btn bg-green-400 p-10 m-20" on:click={enableAsHost }>Enable as Host</button>
{/if}
    
{/if}
