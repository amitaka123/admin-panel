<script>
export let events = null;
</script>

{#if events}
<table class="w3-table-all w3-hoverable">
    <thead>
      <tr class="w3-light-grey">
        <th>Event</th>
        <th>Type</th>
        <th>Status</th>
        <th>Booking</th>
        <th>Event ID</th>
      </tr>
    </thead>
    {#each events as event}
    <tr class="w3-hover-shadow">
        <td>{event.name}</td>
        <td>{event.event_type}</td>
        <td>{event.event_status}</td>
        <td>{event.booking_status}</td>
        <td><a class="w3-text-blue"  href="/events/{event._id}">{event._id}</a></td>
    </tr>
    {/each}
  </table>
{/if}