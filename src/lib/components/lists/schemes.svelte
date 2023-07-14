<script>
  export let schemes = [];
  import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(schemeId){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/marking_scheme_delete/'+schemeId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
          <th>Positive Marks</th>
          <th>Negative Marks</th>
          <th>Scheme ID</th>
          <th>Delete?</th>
          
        </tr>
      </thead>
      {#each schemes as scheme}
      <tr class="w3-hover-shadow">
          <td>{scheme.name}</td>
          <td>{scheme.positive_marks}</td>
          <td>{scheme.negative_marks}</td>
          <td><a class="w3-text-blue" href="/marking_schemes/{scheme._id}">{scheme._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(scheme._id)}} >Delete</button></td>

      </tr>
      {/each}
    </table>
