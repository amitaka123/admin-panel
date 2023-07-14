<script>
export let moduleChapters = [];
import {ApiUrl} from '../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(moduleChapterId){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/modules/module_chapter_delete/'+moduleChapterId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
  
  <!-- <table class="w3-table-all w3-hoverable"  width="100%">
      <thead>
        <tr class="w3-light-grey">
          <th>#</th>
          <th>Name</th>
         
          <th>Class</th>
          <th>Subject</th>
          <th>Batch Id</th>
          <th>Delete?</th>
          
        </tr>
      </thead>
      {#each moduleChapters as moduleChapter,ind}
      <tr class="w3-hover-shadow">
          <td>{ind+1}</td>
          <td>{moduleChapter.name}</td>
          
          <td>{moduleChapter.class_number.toString()}</td>
		  <td>{moduleChapter.subject.name}</td> 
		  <td><a class="w3-text-blue" href="/modules/{moduleChapter._id}">{moduleChapter._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(moduleChapter._id)}} >Delete</button></td>

      </tr>
      {/each}
    </table> -->

<table class="w3-table-all w3-hoverable">
    <thead>
      <tr class="w3-light-grey">
        <th>#</th>
		<th>Id</th>
        <th>Name</th>
		<th>Chapter</th>
        <th># Questions(Level I)</th>
		<th># Questions(Level II)</th>
		<th># Questions(Level III)</th>	
		<th>Edit?<th>
        <th>Delete?<th>
      </tr>
    </thead>
    {#each moduleChapters as moduleChapter,ind}
    <tr class="w3-hover-shadow">
        <td>{ind+1}</td>
		<td><a class="w3-text-blue" href="/module_chapters/{moduleChapter._id}">{moduleChapter._id}</a></td>
        <td>{moduleChapter.name}</td>
		<td><a class="w3-text-blue"  href="/chapters/{moduleChapter.chapter._id}">{moduleChapter.chapter.name}</a></td>
        <td>{moduleChapter.level_1.length}</td>
		<td>{moduleChapter.level_2.length}</td>
		<td>{moduleChapter.level_3.length}</td>
		<td><a class="w3-text-blue" href="/module_chapters/edit/{moduleChapter._id}">Edit</a></td>
        <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(moduleChapter._id)}} >Delete</button></td>

	</tr>
    {/each}
  </table>

