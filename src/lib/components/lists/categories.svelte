<script>
    export let categories = null;
    import {ApiUrl} from '../../_utils/static_store.js';
    import { get } from 'svelte/store';

   

    async function deleteCat(catId){
		
		
		var confirmed= confirm("Really want to delete the file?");
		
		
		if(!confirmed)
		{
            console.log(__dirname);
			return;
		}


		var loginPath=get(ApiUrl);
		var token = localStorage.getItem("token");
		// var token = localStorage.getItem("token");
		
		const res = await fetch(loginPath+'/panel/category_delete/'+catId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token}});
		
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response = await JSON.parse(response);
					if(response.status =="success")
					{
						location.href = "/categories";
					}
					else
					{
						alert(response.message);
					}
					
					
			}
			catch(e){
				console.log("caught");
				alert("some problem has occured");
				console.log(e);
			}
			finally{
				
			}
			
			// let data = JSON.parse(text);
			
		}
		else{
					console.log(await res.text());
					alert("some problem has occured");
					
				}
	}
    </script>
    
    {#if categories}
    <table class="w3-table-all w3-hoverable">
        <thead>
          <tr class="w3-light-grey">
            <th>Name</th>
            
            <th>Category ID</th>
            <th>Created at</th>
            <th>Delete?</th>
          </tr>
        </thead>
        {#each categories as cat}
        <tr class="w3-hover-shadow">
            <td>{cat.name}</td>
            
            <td>{cat._id}</td>
            <td>{cat.createdAt}</td>
            <td><a class="w3-text-white w3-round w3-red w3-margin w3-padding w3-card" on:click={deleteCat(cat._id)}>Delete</a></td>
        </tr>
        {/each}
      </table>
    {/if}