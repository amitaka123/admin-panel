<script>
    export let instructions = [];
    import {ApiUrl} from '../../../routes/_utils/static_store.js';
  import { get } from 'svelte/store';
  
  async function handleDelete(intructionId){
          let confirmm = confirm("Really want to delete permanently?");
          if(!confirmm)
          {
              return;
          }
          var token = localStorage.getItem("token");
          var loginPath=get(ApiUrl);
          let res;
          res = await fetch(loginPath+'/panel/instructions/delete/'+intructionId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
  
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
            <th>Instructions</th>
            <th>View</th>
            <th>Delete?</th>
            
            
          </tr>
        </thead>
        {#each instructions as instruction}
        <tr class="w3-hover-shadow">
            <td>{instruction.name}</td>
            <td>{@html atob(instruction.instructions)}</td>
            <td><a class="w3-text-blue" href="/instructions/edit/{instruction._id}">{instruction._id}</a></td>
            <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(instruction._id)}}>Delete</button></td>
        </tr>
        {/each}
      </table>
  