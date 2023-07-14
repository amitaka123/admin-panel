<script>
  export let lectures = [];
  import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(lectureId){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/batches/lecture_delete/'+lectureId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
		<th>Description</th>
		<th>Subject Id</th>
		<th>Media URL</th>
		<th>Lecture Id</th>
		<th>Delete?</th>
		
	  </tr>
	</thead>
	{#each lectures as lecture,ind}
	<tr class="w3-hover-shadow">
		<td>{ind+1}</td>
		<td>{lecture.name}</td>
		<td>{lecture.description}</td>
		<td>{lecture.subject}</td>
		<td>{lecture.media}</td>
		<td><a class="w3-text-blue" href="/lectures/{lecture._id}">{lecture._id}</a></td>
		<td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(lecture._id)}} >Remove</button></td>

	</tr>
	{/each}
  </table>
