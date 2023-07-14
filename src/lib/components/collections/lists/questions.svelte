<script>
  export let questions = null;
  export let picker = false;
  export let selectedQuestions;

  export let eventFunction= function(qId,inserted){};

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
  </script>
  
  {#if questions && !picker}
  <table class="w3-table-all w3-hoverable"  width="100%">
      <thead>
        <tr class="w3-light-grey">
          <th>Event</th>
          <th>Type</th>
          <th>Status</th>
          <!-- <th>Subjects</th> -->
          <th>Booking</th>
          <th>Event ID</th>
        </tr>
      </thead>
      {#each questions as question}
      <tr class="w3-hover-shadow">
          <td>{@html atob(question.question)}</td>
          <td>{question.question_type}</td>
          <td>{question.class_number}</td>
          <!-- <td>{question.subjects}</td> -->
          <!-- <td><Options options={question.options} /></td> -->
          <td><a class="w3-text-blue" href="/questions/edit/{question._id}">{question._id}</a></td>
      </tr>
      {/each}
      
    </table>
    {setType()}
  

  {:else if questions && picker}
  <table class="w3-table-all w3-hoverable"  width="100%">
      <thead>
        <tr class="w3-light-grey">
          <th>Selected</th>
          <th>Question</th>
          <th>Type</th>
          <th>Class</th>
          <th>Subjects</th>
          <th>Question ID</th>
        </tr>
      </thead>
      {#each questions as question}
      <tr class="w3-hover-shadow">
        <!-- {console.log('questions refreshed')} -->

        
          {#if selectedQuestions.includes(question._id)}
            <td><input class="w3-checkbox w3-input" type="checkbox" value="{question._id}" checked on:click={toggleSelectedQuestions(question._id)}/></td>
          {:else}
            <td><input class="w3-checkbox w3-input" type="checkbox" value="{question._id}" on:click={toggleSelectedQuestions(question._id)}/></td>
          {/if}
          <!-- <td><input class="w3-checkbox w3-input" type="checkbox" value="{question._id}" bind:group={selectedQuestions}/></td> -->
          <td>{@html atob(question.question)}</td>
          <td>{question.question_type}</td>
          <td>{question.class_number}</td>
          <td>{question.subjects.map(subj => subj.name ).join(",")}</td>
          <!-- <td><Options options={question.options} /></td> -->
          <td><a class="w3-text-blue" target="_blank" href="/questions/edit/{question._id}">{question._id}</a></td>
      </tr>
      {/each}
      
    </table>
    {setType()}
  {/if}