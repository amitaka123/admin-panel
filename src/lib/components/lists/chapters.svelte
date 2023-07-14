<script>
  export let chapters = null;
  import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(chapterId){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/chapter_delete/'+chapterId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
  
  {#if chapters}
  <table class="w3-table-all w3-hoverable"  width="100%">
      <thead>
        <tr class="w3-light-grey">
          <th>#</th>
          <th>Name</th>
          <th>Subject</th>
          <th>Streams</th>
          <th>Chapter ID</th>
          <th>Delete?<th>
          
        </tr>
      </thead>
      {#each chapters as chapter,ind}
      <tr class="w3-hover-shadow">
        <td>{ind+1}</td>
          <td>{chapter.name}</td>
          <td>{chapter.subject?chapter.subject.name:"-"}</td>
          <td>{chapter.streams?chapter.streams.map(s=>s.name).join(","):"-"}</td>
          <td><a class="w3-text-blue" href="/chapters/{chapter._id}">{chapter._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(student._id)}} >Delete</button></td>
      </tr>
      {/each}
      
    </table>
  {/if}