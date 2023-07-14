<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    let requestPath = get(store.paths.panelBooking);
    export let bookingId=null;
    // let products;
    let booking=null;
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
               await getBooking();
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
            let done = await fetch(requestPath+"/edit/"+bookingId,{method:"post",headers:{"Authorization":"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify(data)});
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

    async function getBooking()
	{
		try{
            let productsRes = await fetch(requestPath+"/single/"+bookingId,{method:"get",headers:{"Authorization":"Bearer "+get(authStore).token}    });
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    booking = response.data;
                    console.log("successfully aquired booking");
                    console.log(booking);
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

{#if booking}
<div class="m-20">
<table class="w3-table-all w3-hoverable">
    <thead>
        <tr class="w3-light-grey">
            <th>Event</th>
            <th>Location</th>
            <th>User</th>
            <th>Host</th>
            <th>Status</th>
            <th>Booking Id</th>
        </tr>
    </thead>
    <tr class="w3-hover-shadow">
        <td><a class="w3-text-blue"  href="/events/{booking.event._id}">{booking.event.name}</a></td>
        <td>{booking.event.venue}</td>
        <td><a class="w3-text-blue"  href="/users/{booking.user._id}">{booking.user.name}</a></td>
        <td><a class="w3-text-blue"  href="/users/{booking.host._id}">{booking.host.name}</a></td>
        <td>{booking.booking_status}</td>
        <td>{booking._id}</td>
    </tr>
    </table>
    <!-- <Users users={booking} /> -->
</div>
<hr>
<p class="text-2xl">More</p>
<!-- {#if booking.details_json}
<pre class="btn bg-red-400 p-10 m-20" >{booking.details_json}</pre>
{/if} -->
{/if}
