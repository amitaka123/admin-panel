<script>
    export let transactions = null;
</script>

{#if transactions}
<table class="w3-table-all w3-hoverable">
    <thead>
        <tr class="w3-light-grey">
        <th>Transaction Id</th>
        <th>Credit/Debit</th>
        <th>amount</th>
        
        </tr>
    </thead>
    {#each transactions as transaction}
    <tr class="w3-hover-shadow">
        <!-- <td>{transaction._id}</td>
        <td>{transaction.email}</td>
        <td>{transaction.amount}</td> -->
        <td><a class="w3-text-blue"  href="/transactions/{transaction._id}">{transaction._id}</a></td>
        <td>{transaction.creadit?"Credit":"Debit"}</td>
        <td>{transaction.amount}</td>

        
        <!-- <td>{user.host_information?user.host_inforrmation._id:"-"}</td> -->
        <!-- <td><a class="w3-text-blue"  href="/users/{user._id}">{user._id}</a></td> -->
    </tr>
    {/each}
    </table>
{/if}