<script context="module">

</script>

<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import GridList from '$lib/components/collections/grid/list.svelte';
    import Users from '$lib/components/collections/lists/users.svelte';

    let requestPath = get(store.paths.panelUsersPath);
    // let products;
    let users=null;
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
               await getUsers();
            }
        else{
            console.log("else");
        }
    }


    async function toggleHost(user_id,enabled){
        try{
            let data={"enabled_as_host":enabled};
            let done = await fetch(requestPath+"/edit/"+user_id,{method:"post",headers:{"Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(data)});
            if(done.status==200)
            {
                // alert("successfully Enabled");
            }
            else{
                //asdsad
            }
        }
        catch(err)
        {
            alert("Some Problem has occured");
            console.log(err.message);
        }	
    }

    async function getUsers()
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
                    users = response.data;
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


    // function getEventsList(events)
    // {
    //     console.log("inside get Products")
    //     return events.map((event)=>{
    //         return {id:event._id,title:event.name,subtitle:event.price,description:event.description,target:"/events/"+event._id};
    //     });
    // }

</script>

{#if users}
<div class="m-20">
    <Users users={users} />
</div>
    
{/if}
