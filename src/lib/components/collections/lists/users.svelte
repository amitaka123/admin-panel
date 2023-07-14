<script>
    export let users = null;
</script>

{#if users}
<table class="w3-table-all w3-hoverable">
    <thead>
        <tr class="w3-light-grey">
        <th>Name</th>
        <th>Email</th>
        <th>phone</th>
        <th>Enabled as a Host</th>
        <!-- <th>Host Info</th> -->
        <th>User ID</th>
        </tr>
    </thead>
    {#each users as user}
    <tr class="w3-hover-shadow">
        <td>{user.name}{user.enabled_as_administrator?"(Administrator)":""}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.enabled_as_host}</td>
        
        <!-- <td>{user.host_information?user.host_inforrmation._id:"-"}</td> -->
        <td><a class="w3-text-blue"  href="/users/{user._id}">{user._id}</a></td>
    </tr>
    {/each}
    </table>
{/if}