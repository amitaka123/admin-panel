<script>
    export let bookings = null;
</script>
    
{#if bookings}
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
    {#each bookings as booking}
    <tr class="w3-hover-shadow">
        <td><a class="w3-text-blue"  href="/events/{booking.event._id}">{booking.event.name}</a></td>
        <td>{booking.event.venue}</td>
        <td><a class="w3-text-blue"  href="/users/{booking.user._id}">{booking.user.name}</a></td>
        <td><a class="w3-text-blue"  href="/users/{booking.host._id}">{booking.host.name}</a></td>
        <td>{booking.booking_status}</td>
        <td><a class="w3-text-blue"  href="/bookings/{booking._id}">{booking._id}</a></td>
    </tr>
    {/each}
    </table>
{/if}