<script>
    export let questions = null;
    export let picker = false;
    export let selectedQuestions=[];
  
    export let eventFunction=function(qId,inserted){};
  
    function setType(){
      setTimeout(()=>{window.MathJax.typeset()},1000);
      return "";
    }
  
    $:
    {
      if(questions)
      {
        setType();
      }
    }
  
    function toggleSelectedQuestions(qId){
      let q = questions.filter(question => question._id==qId)[0];
      if(selectedQuestions.includes(qId))
      {
        let ind=selectedQuestions.indexOf(qId);
        selectedQuestions.splice(ind,1);
        eventFunction(q,false);
      }
      else
      {
        selectedQuestions.push(qId);
        eventFunction(q,true);
      }
      selectedQuestions = selectedQuestions;
      console.log(selectedQuestions);
    }
  
  import {onMount} from 'svelte';
  import {Token} from '../../_utils/dynamic_store.js';
 
  import {ApiUrl} from '../../_utils/static_store.js';
  import { get } from 'svelte/store';
  
  async function handleDelete(questionId){
          let confirmm = confirm("Really want to delete permanently?");
          if(!confirmm)
          {
              return;
          }
          var token = localStorage.getItem("token");
          var loginPath=get(ApiUrl);
          let res;
          res = await fetch(loginPath+'/panel/question_delete/'+questionId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
  
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
    
    {#if questions}
    <p class="w3-large">#Questions:{questions.length}</p>
    {#if !picker}
    <table class="w3-table-all w3-hoverable"  width="100%">
        <thead>
          <tr class="w3-light-grey">
            <th>#</th>
            <th>Question</th>
            <th>Type</th>
            <th>Class</th>
            <!-- <th>Subjects</th> -->
            <th>Question ID</th>
            <th>Delete</th>
          </tr>
        </thead>
        {#each questions as question}
        <tr class="w3-hover-shadow">
          <td>{question.id}</td>
            <td>{@html atob(question.question)}</td>
            <td>{question.question_type}</td>
            <td>{question.class_number}</td>
            <!-- <td>{question.subjects}</td> -->
            <!-- <td><Options options={question.options} /></td> -->
            <td><a class="w3-text-blue" href="/questions/edit/{question._id}">{question._id}</a></td>
            <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(question._id)}} >Delete</button></td>
  
        </tr>
        <!-- <tr class="w3-hover-shadow">
          <td>{@html atob(question.question)}</td>
          <td>{question.question_type}</td>
          <td>{question.class_number}</td>
          <td><a class="w3-text-blue" href="/questions/edit/{question._id}">{question._id}</a></td>
          <td><button class="w3-text-red w3-center" on:click={()=>{handleDelete(student._id)}} >Delete</button></td>
  
        </tr> -->
        {/each}
        
      </table>
      {setType()}
    
  
    {:else if picker}
    <table class="w3-table-all w3-hoverable"  width="100%">
        <thead>
          <tr class="w3-light-grey">
            <th>Selected</th>
            <th>Question</th>
            <th>Type</th>
            <!-- <th>Class</th> -->
            <th>Subjects</th>
            <th>Question ID</th>
          </tr>
        </thead>
        {#each questions as question}
        <tr class="w3-hover-shadow">
          <!-- {console.log('questions refreshed')} -->
  
          
            {#if selectedQuestions.includes(question._id)}
              <td>
                <!-- <input class="w3-checkbox w3-input" type="checkbox" value="{question._id}" checked on:click={toggleSelectedQuestions(question._id)}/> -->
                <a class="w3-button w3-red" on:click={toggleSelectedQuestions(question._id)} > Remove</a>
              </td>
            {:else}
              <td>
                <a class="w3-button w3-blue" on:click={toggleSelectedQuestions(question._id)} > Add Question</a>
                <!-- <input class="w3-checkbox w3-input" type="checkbox" value="{question._id}" on:click={toggleSelectedQuestions(question._id)}/> -->
              </td>
            {/if}
            <!-- <td><input class="w3-checkbox w3-input" type="checkbox" value="{question._id}" bind:group={selectedQuestions}/></td> -->
            <td>{@html atob(question.question)}</td>
            <td>{question.question_type}</td>
            <!-- <td>{question.}</td> -->
            <td>{question.subjects.map(subj => subj.name).join(",")}</td>
            <!-- <td><Options options={question.options} /></td> -->
            <td><a class="w3-text-blue" target="_blank" href="/questions/edit/{question._id}">{question._id}</a></td>
        </tr>
        {/each}
        
      </table>
      {setType()}
      {/if}
    {/if}