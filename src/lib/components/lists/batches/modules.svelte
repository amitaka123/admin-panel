<script>
  export let picker = false;
  export let selectedFiles;
    export let modules = null;
    export let moduleId;
    import {ApiUrl} from '../../../_utils/static_store.js';
    import { get } from 'svelte/store';

	function toggleSelectedFiles(qId){
    if(selectedFiles.includes(qId))
    {
      let ind=selectedFiles.indexOf(qId);
      selectedFiles.splice(ind,1);
    }
    else
    {
		selectedFiles.push(qId);
    }
    selectedFiles = selectedFiles;
  }

  async function handleDelete(moduleId){
		let confirmm = confirm("Really want to remove the file from the batch?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/batches/batch_remove_module/'+batchId+"/"+moduleId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						location.reload();
					}
					else{
						console.log(response.message);
						alert(response.message);
					}	
			}
			catch(e){
				console.log("caught");
				
				console.log(e);
			}
		}
		else{
					console.log(await res.text());
				}
	}
    </script>
    
    {#if modules && !picker}
    <table class="w3-table-all w3-hoverable">
        <thead>
          <tr class="w3-light-grey">
			<td>ID</td>
            <th>Name</th>
            <th>Remove from Batch?</th>
          </tr>
        </thead>
        {#each modules as gModule}
        <tr class="w3-hover-shadow">
			<td>{gModule._id}</td>
            <td>{gModule.name}</td>
           
            <td><a class="w3-text-white w3-round w3-red w3-margin w3-padding w3-card" on:click={handleDelete(gModule._id)}>Remove</a></td>
        </tr>
        {/each}
      </table>
	  {:else if modules && picker}
  <table class="w3-table-all w3-hoverable"  width="100%">
      <thead>
        <tr class="w3-light-grey">
          <th>Selected</th>
          <td>ID</td>
			
            <th>Name</th>
            
            
        </tr>
      </thead>
      {#each modules as gModule}
      <tr class="w3-hover-shadow">
          {#if selectedFiles.includes(gModule._id)}
            <td><input class="w3-checkbox w3-input" type="checkbox" value="{gModule._id}" checked on:click={toggleSelectedFiles(gModule._id)}/></td>
          {:else}
            <td><input class="w3-checkbox w3-input" type="checkbox" value="{gModule._id}" on:click={toggleSelectedFiles(gModule._id)}/></td>
          {/if}
          <td>{file._id}</td>
		 <td>{file.name}</td>
      </tr>
      {/each}
      
    </table>
    {/if}