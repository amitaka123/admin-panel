<script>
  export let packages = [];
  import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(studentId){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/package_delete/'+studentId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
          <!-- <th>Class</th>
          <th>Branch</th>-->
          <th>Package Id</th> 
          <th>Delete?<th>
          
        </tr>
      </thead>
      {#each packages as pack,ind}
      <tr class="w3-hover-shadow">
          <td>{ind+1}</td>
          <td>{pack.name}</td>
          <td>{pack.stream.name}</td>
          <!-- <td>{pack.branch.name}</td>
          <td>{pack.class_number.toString()}</td> -->
          <td><a class="w3-text-blue" href="/packages/edit/{pack._id}">{pack._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(pack._id)}} >Delete</button></td>

      </tr>
      {/each}
    </table>
