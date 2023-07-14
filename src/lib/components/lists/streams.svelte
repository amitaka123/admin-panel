<script>
  export let streams = [];
  import {Token} from '../../_utils/dynamic_store.js';
import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';
  // export mathjax=null;
  // import Options from "./options.svelte";

  async function handleDelete(streamId){
		let confirmm = confirm("Really want to delete the staff member permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/stream_delete/'+streamId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
          <th>Name</th>
          <th>Description</th>
          <th>Branch ID</th>
          <th>Delete?</th>
          
        </tr>
      </thead>
      {#each streams as stream}
      <tr class="w3-hover-shadow">
          <td>{stream.name}</td>
          <td>{stream.description}</td>
          <td><a class="w3-text-blue" href="/stream/{stream._id}">{stream._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(stream._id)}} >Delete</button></td>
      </tr>
      {/each}
    </table>