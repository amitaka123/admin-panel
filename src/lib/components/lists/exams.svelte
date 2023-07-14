<script>
  export let exams = [];
  import {Token} from '../../_utils/dynamic_store.js';
import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';
  // export mathjax=null;
  // import Options from "./options.svelte";

  async function handleDelete(examId){
		let confirmm = confirm("Really want to delete the staff member permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/exams/delete/'+examId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
          <th>Date</th>
          <th>Exam ID</th>
          <th>Delete?</th>
          
        </tr>
      </thead>
      {#each exams as exam}
      <tr class="w3-hover-shadow">
          <td>{exam.name}</td>
          <td>{exam.exam_date.substring(0,10)}</td>
          <td><a class="w3-text-blue" href="/exams/{exam._id}">{exam._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(exam._id)}} >Delete</button></td>
      </tr>
      {/each}
    </table>