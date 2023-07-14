<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import Bookings from '$lib/components/collections/lists/bookings.svelte';

    let requestPath = get(store.paths.panelBooking);
    // let products;h
    let bookings=[];
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
                    bookings = response.data;
                    console.log("successfully aquired booking");
                    console.log(bookings);
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring the booking!");
            console.log(err.message);
        }	
	}
</script>
{#if bookings}
<!-- <p class="text-4xl"></p> -->
<h2 class="text-center text-2xl">Bookings</h2>
<div class="m-20">
    <Bookings bookings={bookings} />
    <!-- <Users users={bookings} /> -->
</div>
    
{/if}