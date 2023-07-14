<script>
  export let modules = [];
  import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(moduleId){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/modules/module_delete/'+moduleId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
          <th>Index</th>
          <th>Name</th>
          <!-- <th>Stream</th> -->
          <th>Class</th>
          <th>Subject</th>
		  <th>View</th>
		  <th>Edit?</th>
          <th>Delete?</th>
          
        </tr>
      </thead>
      {#each modules as sModule,ind}
      <tr class="w3-hover-shadow">
          <td>{ind+1}</td>
          <td>{sModule.name}</td>
          <!-- <td>{batch.stream.name}</td> -->
          <!-- <td>{batch.branch.name}</td> -->
          <td>{sModule.class_number.toString()}</td>
		  <td>{sModule.subject.name}</td> 
		  <td><a class="w3-text-blue" href="/modules/{sModule._id}">{sModule._id}</a></td>
		  <td><a class="w3-text-blue" href="/modules/edit/{sModule._id}">Edit</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(sModule._id)}} >Delete</button></td>

      </tr>
      {/each}
    </table>
