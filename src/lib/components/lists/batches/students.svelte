<script>
export let students = null;

export let batchId ;

import {onMount} from 'svelte';
import {Token} from '../../../_utils/dynamic_store.js';
import {ApiUrl} from '../../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(studentId){
		let confirmm = confirm("Really want to remove the student from the batch?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/batches/batch_remove_student/'+batchId+"/"+studentId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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

{#if students}
<table class="w3-table-all w3-hoverable">
    <thead>
      <tr class="w3-light-grey">
        <th>#</th>
        <th>Name</th>
        <!-- <th>Stream</th>
        <th>Batch</th>
        <th>Brach</th> -->
        <th>Email Id</th>	
        <th>Student ID</th>
        <th>Remove from Batch?<th>
      </tr>
    </thead>
    {#each students as student,ind}
    <tr class="w3-hover-shadow">
        <td>{ind+1}</td>
        <td>{student.name}</td>
        <!-- <td>{student.stream.name}</td>
        <td>{student.batch?student.batch.name:"-"}</td>
        <td>{student.branch?student.branch.name:"-"}</td> -->
        <td>{student.email}</td>
        <td><a class="w3-text-blue"  href="/students/{student._id}">{student._id}</a></td>
        <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(student._id)}} >Remove</button></td>
    </tr>
    {/each}
  </table>
{/if}