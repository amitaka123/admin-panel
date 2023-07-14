<script>
  export let comprehensions = [];
  import {Token} from '../../_utils/dynamic_store.js';
import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';
  // export mathjax=null;
  // import Options from "./options.svelte";

  async function handleDelete(comprehensionId){
		let confirmm = confirm("Really want to delete the staff member permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/exacomprehension_delete/'+comprehensionId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
			<th>ID: View/Edit</th>
			<th>Name</th>
          <!-- <th>Date</th> -->
          <th>Content</th>
		  
          <th>Delete</th>
          
        </tr>
      </thead>
      {#each comprehensions as comprehension}
      <tr class="w3-hover-shadow">
		<td><a class="w3-text-blue" href="/comprehensions/{comprehension._id}">{comprehension._id}</a></td>

          <td>{comprehension.name}</td>
          <!-- <td>{comprehension.createdAt}</td> -->
		  <td>{@html atob(comprehension.content)}</td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(comprehension._id)}} >Delete</button></td>
      </tr>
      {/each}
    </table>