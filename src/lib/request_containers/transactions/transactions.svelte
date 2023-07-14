<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import utilities from '$lib/utils/functions';
    import GridList from '$lib/components/collections/grid/list.svelte';
    import Transactions from '$lib/components/collections/lists/transactions.svelte';
    import Transaction from './transaction.svelte';

    let requestPath = get(store.paths.panelTransactions);
    // let products;
    let transactions=[];
    // export let filters = {};
    // export const listType="grid";// can be vertical & grid
    console.log(requestPath);

    onMount(_initialize);
    let authStore;

    async function _initialize(){
        console.log("initializing");
        authStore = (await import('$lib/stores/authentication')).authStore;
        if(authStore && get(authStore).isAuthenticated())
            {
               await getTransactions();
            }
        else{
            console.log("else");
        }
    }


    async function getTransactions()
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
                    transactions = response.data;
                    console.log("successfully aquired transaction");
                    console.log(transactions);
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
{#if transactions}
<!-- <p class="text-4xl"></p> -->
<h2 class="text-center text-2xl">Transactions</h2>
<div class="m-20">
    <Transactions transactions={transactions} />
    <!-- <Users users={transactions} /> -->
</div>
    
{/if}