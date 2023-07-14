<script>
    export let results = null;
    </script>
    
    {#if results}
    <table class="w3-table-all w3-hoverable"> 
        <thead>
          <tr class="w3-light-grey">
            <th>Test Name</th>
            <th>Timestamp</th>
            <th>Score</th>
            <th>Percentage</th>
            <th>Result ID</th>
            <!-- <th>Email Id</th>
            <th>Student ID</th> -->
          </tr>
        </thead>
        {#each results as result}
        <tr class="w3-hover-shadow">
            <td>{result.test_id.name}</td>
            <td>{result.createdAt}</td>
            <td>{result.total}</td>
            <td>{result.total}/{result.max_marks}</td>
           
            <td><a class="w3-text-blue"  href="/results/{result._id}">{result._id}</a></td> 
        </tr>
        {/each}
      </table>
    {/if}