<script>
	import PickUpQuestions from '../_questions/simple_question_picker.svelte';
	import {onMount} from 'svelte';
	import {Token} from '../dynamic_store.js';
	import {ApiUrl} from '../static_store.js';
	import { get } from 'svelte/store';
	import ImageUpload from '../imageUpload.svelte';

	import FileUploads from '../file_upload.svelte';

	import cloneDeep from 'lodash.clonedeep';
	// import _ from 'lodash';

import { bind, prevent_default } from 'svelte/internal';

	// export var question;
	var loginPath=get(ApiUrl);
	
	export var body = null;																								
	export var edit = false;
	
	var categories = null;
    var streams=[],batches=[],subjects=[],schemes=[];
	// let edit = false;


	function initializeTinyMice(){
		tinymce.init({
			selector: 'textarea',  // change this value according to your HTML
			plugins: 'advlist link image lists'
		});
	}

	 onMount(async ()=>{
		 setTimeout(() => {
			 initializeTinyMice();
		 }, 2000);
		//  console.log(bodyJson);
		//  console.log(body);
		 console.log(edit);
		 var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);

		// getCategories();
        
        getstreamsBatchesSubjectsSchemes();
		if(edit)
		{

			console.log("editing mode");
			body.instructions= atob(body.instructions);
			return;
		}
        body = {
            structure:{
                // question_id:question(id),subject(id),question_type(string),scheme(id)
            }
        };

		body.enabled=true;
		body.subjects = [];
        body.questions=[];
        body.batches=[];
		body.streams=[];
		// body.structure = {physics:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				chemistry:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				botany:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				zoology:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}}};
		
		body.category ="-";
		body.stream="-";
		body.test_type="simple";
		body.difficulty="medium";
        body.start_date=null;
        body.end_date=null;
		body.class_number = "13";
		body.max_marks=4*45*4;
		body.duration=200;
		// body.test_pdf ="-";
		// console.log("");
		console.log("mounted. creation mode for TEST");
        
		//Fill up the textboxes
	});


	async function getstreamsBatchesSubjectsSchemes() {
		var token = localStorage.getItem("token");
		var res;
		var res = await fetch(loginPath+'/panel/streams_batches_subjects_schemes/',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
			if(res.status==200){
				try{
						let response= await res.text();
						response= await JSON.parse(response);
						if(response.status == "success")
						{
							streams= response.data.streams;
							// console.log(streams);
                            batches= response.data.batches;
                            subjects= response.data.subjects;
                            schemes=response.data.schemes;
						}
						else{
							console.log(response.message);
						}		
				}
				catch(e){
					console.log("caught1");
					alert("Some problem has occured, see console for more info.");
					console.log(e.message);
				}
			}
			else{
						console.log(await res.text());						
					}
	}



	async function saveTest(){
		let data = cloneDeep(body);
		data.instructions=btoa(tinymce.get('instructions').getContent());
		var keys = Object.keys(data);
		for(var key of keys)
		{
			if(data[key]=="-")
			{
				// alert("Error: "+key+" not set");
				// return;
				console.log("deleting: "+key);
				delete data[key];
			}
		}
		console.log(JSON.stringify(body));

		
		
		//checks end
		console.log(data);
		
			let token = localStorage.getItem("token");
			var res;
			if(edit)
			{
				res = await fetch(loginPath+'/panel/test_edit/',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(data)});
			}
			else
			{
				 res = await fetch(loginPath+'/panel/test_create/',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(data)});
			}

			if(res.status==200){
				try{
						let response= await res.text();
						//console.log(response);
						response= await JSON.parse(response);
						if(response.status == "success")
						{
							alert("saved successfully");
							location.href="/tests";
						}
						else{
							alert(response.message);
						}		
				}
				catch(e){
					console.log("caught2");
					alert("Some problem has occured, see console for more info.");
					console.log(e);
				}
				finally{				
				}
			}
			else{
						console.log(await res.text());						
					}
		}

	function toggleEnabled(){
		console.log("switching");
		body.enabled = !body.enabled;
		// console.log(body.for_advanced);
	}

    async function eventFunction(question,isInserted){
        // console.log(question._id);
        console.log(isInserted);
        if(isInserted)
        {
            body.structure[question._id] = {question,scheme:schemes[0]._id};
            console.log(body.structure[question._id]);
        }
        else
        {
            delete body.structure[question._id];
        }
    }

	async function getStreams(){
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/streams',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						streams=response.data;
						console.log(streams);
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
			finally{
				
			}	
		}
		else{
					console.log(await res.text());
					user.email="no logged";
					
				}
	}
	async function handleDelete(){
		let confirmm = confirm("Really want to delete permanently?");
		if(!confirmm)
		{
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/test_delete/'+body._id,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						location.href="/tests";
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

<style>
	h1, figure, p {
		text-align: center;
		margin: 0;
	}

	h1 {
		/* font-size: 2.8em; */
		text-transform: uppercase;
		font-weight: 700;
		margin:5px;
		/* font-family: 'MonteCarlo', cursive; */
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	.item{
		padding:10px;
		display:block;
		width:100%;
		text-decoration: none;
		margin:1px;
		background-color: rgb(255, 255, 255);
	}
	.item:hover{
		/* background-color: rgb(191, 201, 255); */
		cursor:pointer;
	}
	p{
		text-align: left;
		/* font-family: 'Merriweather', serif; */
	}

	
	a{
		text-decoration: none;
	}
	textarea{
		width:80%;
	}
	select{
		width:100%;
	}

	.width{
		width:100%;
		/* background: red; */
	}
	label{
		font-size: 70%;
		color:grey
	}

	input[type="radio"]{
		display:inline;
		width:50px;
	}

	input[type="checkbox"]{
		display:inline;
		width:50px;
	}

	.picker{
		max-height: 600px;
		overflow: scroll;
	}

	h2{
		font-size:200%;
	}
    td{
        padding:10px;
    }
    table{
        table-layout:fixed;
    }
</style>


<h3 class="w3-black w3-round w3-padding width"> {edit?'Edit a':'Create a'} <span class="w3-text-green">Test</span> </h3>
<div class="width">
	{#if edit}
		<button class="w3-red w3-text-white w3-padding w3-margin w3-center" on:click={handleDelete} >Delete?</button>
	{/if}
	{#if body}
    <form on:submit|preventDefault={saveTest}>
		<h4>Test {body.test_type}</h4>
		

		<label>Enabled</label>
		<input class="w3-radio w3-input" type="checkbox" bind:checked={body.enabled}/>
		<hr>


		<label for="question">Name*</label>
		<input type="text"  class="w3-input w3-round w3-border" placeholder="Name" bind:value={body.name} required/>

		<label for="marks">Duration*</label>
		<input type="number" placeholder="Minutes" class="w3-input w3-round w3-border" bind:value={body.duration}  required/>

        <label for="marks">Number of Attempts*</label>
		<input type="number" placeholder="Attempts(0=infinite)" class="w3-input w3-round w3-border"  bind:value={body.attempts} required/>

        <label for="marks">Start Time</label>
		<input type="datetime-local" placeholder="Start time for the test" class="w3-input w3-round w3-border"  bind:value={body.start_time} />
        
        <label for="marks">End Time</label>
		<input type="datetime-local" placeholder="Start time for the test" class="w3-input w3-round w3-border"  bind:value={body.end_time}/>


		<label for="marks">Max Marks*</label>
		<input type="number" placeholder="Maximum Marks" class="w3-input w3-round w3-border" bind:value={body.max_marks} required  />

		{#if streams && body.streams}
		<p>Pick up Streams</p><br>
            {#each streams as stream}
            <label>{stream.name.toUpperCase()}</label>
                <input class="w3-checkbox w3-input" type="checkbox" value={stream._id} bind:group={body.streams} />
            {/each}
		{/if}

		{#if subjects && body.subjects}
		<p>Pick up Subjects</p>
            {#each subjects as subject}
            <label>{subject.name.toUpperCase()}</label>
                <input class="w3-checkbox w3-input" type="checkbox" value={subject._id} bind:group={body.subjects} />
            {/each}
		{/if}

        {#if batches && body.batches}
		<p>Pick up Batches</p><br>
            {#each batches as batch}
            <label>{batch.name.toUpperCase()}</label>
                <input class="w3-checkbox w3-input" type="checkbox" value={batch._id} bind:group={body.batches} />
            {/each}
		{/if}
		<hr>
		<label for="question_difficulty"> Difficulty</label>
		<select id="question_difficulty" class="w3-input w3-border w3-round w3-margin" bind:value={body.difficulty}>
			<option value="-">Select a Difficulty</option>
			<option  value="very-easy">Very Easy</option>
			<option value="easy">Easy</option>
			<option value="medium">Medium</option>
			<option value="hard">Hard</option>
			<option value="vary-hard">Very-Hard</option>
		</select>

		<hr>
	
		<hr>
		<!-- <label for="question_correct"> Stream </label>
		<select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={body.stream}>
			<option value="-">Select a Stream</option>
			{#if streams}
                {#each streams as stream}
                <option  value="{stream._id}">{stream.name}</option>
                {/each}
            {/if}
		
		</select> -->

		

        <hr>
		<!-- <label for="question_correct"> Batches </label><br>
        {#if batches}
            {#each batches as batch}
            <label>{batch.name.toUpperCase()}</label>
		        <input class="w3-checkbox w3-input" type="checkbox" value={batch._id} bind:group={body.batches} />
            {/each}
        {/if}
        

        <hr> -->

		<label for="solution">Instructions </label>
		<textarea id="instructions" class="w3-input w3-round w3-border" placeholder="Text / Latex"  bind:value={body.instructions} />
		<hr>
		

		<div>
			{#if body.questions}
			<!-- <h2>Select {mandatoryQuestionsCount} Physics Compulsory questions</h2> -->

		<PickUpQuestions class="picker" bind:selectedQuestions={body.questions} eventFunction={eventFunction} {streams} {subjects}></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.questions.length}</h2>


			{#each Object.keys(body.structure) as questionId}

            <table class="w3-table-all w3-hoverable"  width="100%">
                <thead>
                  <tr class="w3-light-grey">
                    
                    <th>Question</th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Marking Scheme</th>
                  </tr>
                </thead>
                
                <tr class="w3-hover-shadow">
                  <!-- {console.log('questions refreshed')} -->
          
                  
                    
                    <!-- <td><input class="w3-checkbox w3-input" type="checkbox" value="{question._id}" bind:group={selectedQuestions}/></td> -->
                    <td>{@html atob(body.structure[questionId].question.question)}</td>
                    <td>{body.structure[questionId].question.question_type}</td>
                    <td>{body.structure[questionId].question.subject.toUpperCase()}</td>
                    <td>
                        <select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={body.structure[questionId].scheme}>
                            {#if schemes}
                                {#each schemes as scheme}
                                <option  value="{scheme._id}">{scheme.name}</option>
                                {/each}
                            {/if}
                        
                        </select></td>
			</tr>
                
                
            </table>
			{/each}
			{/if}

		</div>
		

		<input class="w3-button w3-round w3-border" type="submit" value="All Done" >
	</form>
    {/if}
</div>
