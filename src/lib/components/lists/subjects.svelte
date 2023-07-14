<script>
  export let subjects = [];
  import {Token} from '../../_utils/dynamic_store.js';
import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';
  // export mathjax=null;
  // import Options from "./options.svelte";

  async function handleDelete(subjectId){
		let confirmm = confirm("Really want to delete the Subject permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/subject_delete/'+subjectId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
          <th>Stream</th>
          <th>Subject ID</th>
          <th>Delete?</th>
          
        </tr>
      </thead>
      {#each subjects as subject}
      <tr class="w3-hover-shadow">
          <td>{subject.name}</td>
          <td>
            {#each subject.streams as stream}
              {stream.name},
            {/each}
          </td>
          <!-- <td>{subject.contact}</td> -->
          <td><a class="w3-text-blue" href="/subjects/{subject._id}">{subject._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(subject._id)}} >Delete</button></td>
      </tr>
      {/each}
    </table>
