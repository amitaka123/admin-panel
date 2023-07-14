<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import GridList from '$lib/components/collections/grid/list.svelte';
    import Users from '$lib/components/collections/lists/users.svelte';

    let requestPath = get(store.paths.panelTransactions);
    export let transactionId=null;
    // let products;
    let transaction=null;
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
               await getTransaction();
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
            let done = await fetch(requestPath+"/edit/"+transactionId,{method:"post",headers:{"Authorization":"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify(data)});
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

    async function getTransaction()
	{
		try{
            let productsRes = await fetch(requestPath+"/single/"+transactionId,{method:"get",headers:{"Authorization":"Bearer "+get(authStore).token}    });
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    transaction = response.data;
                    console.log("successfully aquired transaction");
                    console.log(transaction);
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring the transaction!");
            console.log(err.message);
        }	
	}
</script>

{#if transaction}
<div class="m-20">
<table class="w3-table-all w3-hoverable">
    <thead>
        <tr class="w3-light-grey">
        <th>Id</th>
        <th>Creadit/Debit</th>
        <th>Amount</th>
        <!-- <th>Enabled as a Host</th>
        <th>Enabled as a Administrator</th>
        <th>Host Information</th>
        <th>User ID</th> -->
        </tr>
    </thead>
    <tr class="w3-hover-shadow">
        <td>{transaction._id}</td>
        <td>{transaction.creadit?"Credit":"Debit"}</td>
        <td>{transaction.amount}</td>
        <!-- <td>{transaction.enabled_as_host}</td>
        <td>{transaction.enabled_as_administrator}</td>
        {#if transaction.host_information}
        <td><a class="w3-text-blue"  href="/users/host/{transaction.host_information._id}">{transaction.host_information._id}</a></td>
        {:else}
        <td>-</td>  
        {/if}
        <td>{transaction._id}</td> -->
    </tr>
    </table>
    <!-- <Users users={transaction} /> -->
</div>
<hr>
<p class="text-2xl">More</p>
{#if transaction.details_json}
<pre class="btn bg-red-400 p-10 m-20" >{transaction.details_json}</pre>
{/if}
{/if}
