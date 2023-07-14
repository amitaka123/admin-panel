<script>
export let moduleChapters = null;

export let moduleId ;

import {onMount} from 'svelte';
import {Token} from '../../../_utils/dynamic_store.js';
import {ApiUrl} from '../../../_utils/static_store.js';
import { get } from 'svelte/store';

async function handleDelete(moduleChapterId){
		let confirmm = confirm("Really want to remove the module chapter from the Module?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/modules/module_remove_chapter/'+moduleId+"/"+moduleChapterId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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

{#if moduleChapters}
<table class="w3-table-all w3-hoverable">
    <thead>
      <tr class="w3-light-grey">
        <th>#</th>
        <th>Name</th>
        <!-- <th>Stream</th>
        <th>Batch</th>
        <th>Brach</th> -->
		<th>Chapter</th>
        <th># Questions(Level I)</th>
		<th># Questions(Level II)</th>
		<th># Questions(Level III)</th>	
        <th>Remove from Module?<th>
      </tr>
    </thead>
    {#each moduleChapters as moduleChapter,ind}
    <tr class="w3-hover-shadow">
        <td>{ind+1}</td>
        <td>{moduleChapter.name}</td>
		<td><a class="w3-text-blue"  href="/chapters/{moduleChapter.chapter._id}">{moduleChapter.chapter.name}</a></td>
        <td>{moduleChapter.level_1.length}</td>
		<td>{moduleChapter.level_2.length}</td>
		<td>{moduleChapter.level_3.length}</td>
        <!-- <td><a class="w3-text-blue"  href="/students/{student._id}">{student._id}</a></td> -->
        <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(moduleChapter._id)}} >Remove</button></td>
    </tr>
    {/each}
  </table>
{/if}