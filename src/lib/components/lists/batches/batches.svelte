<script>
  export let batches = [];
  import {ApiUrl} from '../../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(batchId){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/batches/batch_delete/'+batchId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
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
  
  <table class="w3-table-all w3-hoverable"  width="100%">
      <thead>
        <tr class="w3-light-grey">
          <th>#</th>
          <th>Name</th>
          <th>Stream</th>
          <th>Class</th>
          <th>Branch</th>
          <th>Batch Id</th>
          <th>Delete?</th>
        </tr>
      </thead>
      {#each batches as batch,ind}
      <tr class="w3-hover-shadow">
          <td>{ind+1}</td>
          <td>{batch.name}</td>
          <td>{batch.stream.name}</td>
          <td>{batch.branch.name}</td>
          <td>{batch.class_number.toString()}</td>
          <td><a class="w3-text-blue" href="/batches/{batch._id}">{batch._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(batch._id)}} >Delete</button></td>

      </tr>
      {/each}
    </table>
