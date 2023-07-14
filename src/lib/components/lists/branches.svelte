<script>
  export let branches = [];
  import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(branchId){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/branch_delete/'+branchId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
          <th>Address</th>
          <th>Contact</th>
          <th>Branch ID</th>
          <th>Delete?</th>
          
          
        </tr>
      </thead>
      {#each branches as branch}
      <tr class="w3-hover-shadow">
          <td>{branch.name}</td>
          <td>{branch.address}</td>
          <td>{branch.contact}</td>
          <td><a class="w3-text-blue" href="/branch/{branch._id}">{branch._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(branch._id)}} >Delete</button></td>
      </tr>
      {/each}
    </table>
