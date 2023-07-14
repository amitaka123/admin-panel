<script>
  export let picker = false;
  export let selectedFiles;
    export let files = null;
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
    // console.log(selectedQuestions);
  }

   

    async function deleteFile(fileId){
		var confirmed= confirm("Really want to delete the file?");
		if(!confirmed)
		{
            // console.log(__dirname);
			return;
		}
		var loginPath=get(ApiUrl);
		var token = localStorage.getItem("token");
		// var token = localStorage.getItem("token");
		const res = await fetch(loginPath+'/panel/institute_files/academic_file_delete/'+fileId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response = await JSON.parse(response);
					if(response.status =="success")
					{
						location.reload();
					}
					else
					{
						alert(response.message);
					}
			}
			catch(e){
				console.log("caught");
				alert("some problem has occured");
				console.log(e);
      }
			// let data = JSON.parse(text);
			
		}
		else
    {
      console.log(await res.text());
      alert("some problem has occured");
		}
	}
    </script>
    
    {#if files && !picker}
    <table class="w3-table-all w3-hoverable">
        <thead>
          <tr class="w3-light-grey">
			<td>ID</td>
			<!-- <th>Title</th> -->
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        {#each files as file}
        <tr class="w3-hover-shadow">
			<td>{file._id}</td>
			<!-- <td>{file.title}</td> -->
            <td>{file.name}</td>
            <td><a class="w3-text-white w3-round w3-red w3-margin w3-padding w3-card" on:click={deleteFile(file._id)}>Delete</a></td>
        </tr>
        {/each}
      </table>
	  {:else if files && picker}
  <table class="w3-table-all w3-hoverable"  width="100%">
      <thead>
        <tr class="w3-light-grey">
          <th>Selected</th>
          <td>ID</td>
			<!-- <th>Title</th> -->
            <th>Name</th>
            <!-- <th>URL</th>
            <th>Uploader ID</th>
		 <th>File Type</th>
            <th>Created at</th> -->
            
        </tr>
      </thead>
      {#each files as file}
      <tr class="w3-hover-shadow">
        <!-- {console.log('questions refreshed')} -->

        
          {#if selectedFiles.includes(file._id)}
            <td><input class="w3-checkbox w3-input" type="checkbox" value="{file._id}" checked on:click={toggleSelectedFiles(file._id)}/></td>
          {:else}
            <td><input class="w3-checkbox w3-input" type="checkbox" value="{file._id}" on:click={toggleSelectedFiles(file._id)}/></td>
          {/if}
          <!-- <td><input class="w3-checkbox w3-input" type="checkbox" value="{question._id}" bind:group={selectedQuestions}/></td> -->
          <td>{file._id}</td>
		<!-- <td>{file.title}</td> -->
		<td>{file.name}</td>
	
      </tr>
      {/each}
      
    </table>
    {/if}