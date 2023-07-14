<script>
export let advertisements = null;
</script>

{#if advertisements}
<table class="w3-table-all w3-hoverable">
    <thead>
      <tr class="w3-light-grey">
        <th>advertisement</th>
        <th>Type</th>
        <th>Status</th>
        <th>Booking</th>
        <th>advertisement ID</th>
      </tr>
    </thead>
    {#each advertisements as advertisement}
    <tr class="w3-hover-shadow">
        <td>{advertisement.name}</td>
        <td>{advertisement.advertisement_type}</td>
        <td>{advertisement.advertisement_status}</td>
        <td>{advertisement.booking_status}</td>
        <td><a class="w3-text-blue"  href="/advertisements/{advertisement._id}">{advertisement._id}</a></td>
    </tr>
    {/each}
  </table>
{/if}