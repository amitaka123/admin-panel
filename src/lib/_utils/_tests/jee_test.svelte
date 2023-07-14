<script>
	import PickUpQuestions from '../_questions/question_picker.svelte';
	import {onMount} from 'svelte';
	import {Token} from '../dynamic_store.js';
	import {ApiUrl} from '../static_store.js';
	import { get } from 'svelte/store';

	import cloneDeep from 'lodash.clonedeep';
	// import _ from 'lodash';

import { bind, prevent_default } from 'svelte/internal';

	// export var question;
	var loginPath=get(ApiUrl);

	let mandatoryQuestionsCount = 20;
	let optionalQuestionsCount = 10;
	let optionalMandatory=5;
	
	export var body = {
		structure:{physics:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"5/10",count:0}}},
						chemistry:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"5/10",count:0}}},
						mathematics:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"5/10",count:0}}},
						}
					};																										
	export var edit = false;
	
	var categories = null;
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

		getCategories();

		if(edit)
		{
			console.log("editing mode for a Test");
			console.log(body.question);
			body.instructions= atob(body.instructions);
			return;
		}

		body.enabled=true;
		body.subjects = ['physics','chemistry','mathematics'];
		// body.structure = {physics:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				chemistry:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				botany:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				zoology:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}}};
		
		body.category ="-";
		body.stream="engineering";
		body.test_type="jee-mains";
		body.difficulty=3;
		body.class_number = "13";
		body.max_marks=4*25*3;
		body.duration=200;
		// body.test_pdf ="-";
		// console.log("");
		console.log("mounted. creation mode for TEST");
		//Fill up the textboxes
	});


	async function getCategories() {
		var token = localStorage.getItem("token");
		var res;
		var res = await fetch(loginPath+'/panel/categories/',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
			

			if(res.status==200){
				try{
						let response= await res.text();
						//console.log(response);
						response= await JSON.parse(response);
						if(response.status == "success")
						{
							categories= response.data;
						}
						else{
							console.log(response.message);
							// alert(response.message);
						}		
				}
				catch(e){
					console.log("caught");
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

		

		

		//checking for number of questions in each section.
		if (!(body.structure && body.structure.physics.scq.mandatory.questions.length == mandatoryQuestionsCount
			&& body.structure.physics.scq.optional.questions.length == optionalQuestionsCount
			&& body.structure.chemistry.scq.mandatory.questions.length == mandatoryQuestionsCount
			&& body.structure.chemistry.scq.optional.questions.length == optionalQuestionsCount
			&& body.structure.mathematics.scq.mandatory.questions.length == mandatoryQuestionsCount
			&& body.structure.mathematics.scq.optional.questions.length == optionalQuestionsCount
			))
		{
			alert("Please check that each section contains proper number of questions")
			return;
		}

		let questions = [];

		questions=questions.concat(body.structure.physics.scq.mandatory.questions);
		questions=questions.concat(body.structure.physics.scq.optional.questions);
		questions=questions.concat(body.structure.chemistry.scq.mandatory.questions);
		questions=questions.concat(body.structure.chemistry.scq.optional.questions);
		questions=questions.concat(body.structure.mathematics.scq.mandatory.questions);
		questions=questions.concat(body.structure.mathematics.scq.optional.questions);

		console.log(questions.length);

		body.questions=questions;

		console.log(JSON.stringify(body));

		// questions.concat(body.structure.botany.scq.mandatory.questions);
		// questions.concat(body.structure.botany.scq.optional.questions);
		// questions.concat(body.structure.zoology.scq.mandatory.questions);
		// questions.concat(body.structure.zoology.scq.optional.questions);

		


		
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
							location.reload();
							//location.href="/tests";
						}
						else{
							// console.log(response.message);
							alert(response.message);
						}		
				}
				catch(e){
					console.log("caught");
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
		// console.log("switching");
		body.enabled = !body.enabled;
		// console.log(body.for_advanced);
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
</style>


<h3 class="w3-black w3-round w3-padding width"> {edit?'Edit a':'Create a'} <span class="w3-text-green">Test</span> </h3>
<div class="width">
	{#if edit}
	<button class="w3-red w3-text-white w3-padding w3-margin w3-center" on:click={handleDelete} >Delete?</button>
	{/if}
	{#if body}

	<form on:submit|preventDefault={saveTest}>
		<h4>Test</h4>
		

		<label>Enabled</label>
		<input class="w3-radio w3-input" type="radio" checked={body.enabled} on:click={toggleEnabled}/>
		<hr>


		<label for="question">Name*</label>
		<input type="text"  class="w3-input w3-round w3-border" placeholder="Name" bind:value={body.name} />

		<label for="marks">Duration*</label>
		<input type="number" placeholder="Minutes" class="w3-input w3-round w3-border"  value="200" required disabled/>
		<label for="marks">Max Marks*</label>
		<input type="number" placeholder="Maximum Marks" class="w3-input w3-round w3-border" bind:value={body.max_marks} required disabled />
	
		{#if body.subjects}
		<p>Pick up Subjects</p>
		<label>Physics</label>
		<input class="w3-checkbox w3-input" type="checkbox" value="physics" bind:group={body.subjects} disabled/>
		<label>Chemistry</label>
		<input type="checkbox" value="chemistry" bind:group={body.subjects} disabled/>
		<label>Mathematics</label>
		<input type="checkbox" value="mathematics" bind:group={body.subjects} disabled/>


		{/if}

		<hr>
		<label for="question_correct"> Class </label>
		<select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={body.class_number} disabled>
			<option value="-">Select a Class</option>
			<option value="7">7th Class</option>
			<option  value="8">8th Class</option>
			<option value="9">9th Class</option>
			<option value="10">10th Class</option>
			<option  value="11">11th Class</option>
			<option value="12">12th Class</option>
			<option value="13">Passout</option>

		
		</select>

		<hr>
		<label for="test_type"> Test Type </label>
		<select id="test_type" class="w3-input w3-border w3-round w3-margin" value="jee-mains" disabled >
			<option value="-">Select a test type</option>
			<option value="neet">Neet</option>
			<option  value="jee-mains">JEE Mains</option>
			<option value="jee-advanced">JEE Advanced</option>
			<option value="olympiad">Olympiad</option>
			<option  value="boards">Boards</option>
			<option value="mat">MAT</option>
			<option value="ntse">NTSE</option>
			<option value="others">Other</option>

		
		</select>

		<hr>
		<label > Category </label>
		<select class="w3-input w3-border w3-round w3-margin" bind:value={body.category}>
			<option value="-">Select a Category</option>
		{#if categories}
			{#each categories as category}
			<option  value="{category._id}">{category.name}</option>
			{/each}
		{/if}

		</select>

		
		

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
		<label for="question_correct"> Stream </label>
		<select id="question_correct" class="w3-input w3-border w3-round w3-margin" value='engineering' disabled>
			<option value="-">Select a Stream</option>
			<option value="school">School</option>
			<option  value="engineering">Engineering</option>
			<option value="medical">Medical</option>
		
		</select>

		


		<label for="solution">Instructions </label>
		<textarea id="instructions" class="w3-input w3-round w3-border" placeholder="Text / Latex"  bind:value={body.instructions} />
		<hr>
		
		<!-- <label>Select a PDF file</label>
		<FileUploads dontReload={true} bind:url={body.test_pdf}></FileUploads>
		<br>
		{#if body.test_pdf && body.test_pdf !="-"}
			
				<a  class="w3-button w3-padding w3-blue w3-round w3-margin" href="{body.test_pdf}" target="_blank">View uploaded PDF</a>
			
		{/if}
		<hr> -->
		

		<div>
			{#if body.structure.physics}
			<h2>Select {mandatoryQuestionsCount} Physics Compulsory questions</h2>

		<PickUpQuestions class="picker" subject={'physics'} q_type={"scq"}
		 bind:selectedQuestions={body.structure.physics.scq.mandatory.questions}></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.structure.physics.scq.mandatory.questions.length}/{mandatoryQuestionsCount}</h2>
			{#each body.structure.physics.scq.mandatory.questions as question}
			<div class="qitem">
                <div>{@html question} </div>
            </div>
			{/each}
			{/if}

		</div>

		<div>
			{#if body.structure.physics}
			<h2>Select {optionalQuestionsCount} Physics Optional questions- {optionalMandatory} compulsory</h2>

		<PickUpQuestions class="picker" subject={'physics'} q_type={"scq"}
		 bind:selectedQuestions={body.structure.physics.scq.optional.questions} ></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.structure.physics.scq.optional.questions.length}/{optionalQuestionsCount}</h2>
			{#each body.structure.physics.scq.optional.questions as question}
			<div class="qitem">
                <div>{@html question} </div>
            </div>
			{/each}
			{/if}

		</div>

		<div>
			{#if body.structure.chemistry}
			<h2>Select {mandatoryQuestionsCount} chemistry Compulsory questions</h2>

		<PickUpQuestions class="picker" subject={'chemistry'} q_type={"scq"}
		 bind:selectedQuestions={body.structure.chemistry.scq.mandatory.questions}></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.structure.chemistry.scq.mandatory.questions.length}/{mandatoryQuestionsCount}</h2>
			{#each body.structure.chemistry.scq.mandatory.questions as question}
			<div class="qitem">
                <div>{@html question} </div>
            </div>
			{/each}
			{/if}
		</div>

		

		<div>
			{#if body.structure.chemistry}
			<h2>Select {optionalQuestionsCount} chemistry Optional questions- {optionalMandatory} compulsory</h2>

		<PickUpQuestions class="picker" subject={'chemistry'} q_type={"scq"}
		 bind:selectedQuestions={body.structure.chemistry.scq.optional.questions} ></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.structure.chemistry.scq.optional.questions.length}/{optionalQuestionsCount}</h2>
			{#each body.structure.chemistry.scq.optional.questions as question}
			<div class="qitem">
                <div>{@html question} </div>
            </div>
			{/each}
			{/if}

		</div>

		<div>
			{#if body.structure.mathematics}
			<h2>Select {mandatoryQuestionsCount} Mathematics Compulsory questions</h2>

		<PickUpQuestions class="picker" subject={'mathematics'} q_type={"scq"}
		 bind:selectedQuestions={body.structure.mathematics.scq.mandatory.questions}></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.structure.mathematics.scq.mandatory.questions.length}/{mandatoryQuestionsCount}</h2>
			{#each body.structure.mathematics.scq.mandatory.questions as question}
			<div class="qitem">
                <div>{@html question} </div>
            </div>
			{/each}
			{/if}

		</div>

		

		<div>
			{#if body.structure.mathematics}
			<h2>Select {optionalQuestionsCount} mathematics Optional questions- {optionalMandatory} compulsory</h2>

		<PickUpQuestions class="picker" subject={'mathematics'} q_type={"scq"}
		 bind:selectedQuestions={body.structure.mathematics.scq.optional.questions} ></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.structure.mathematics.scq.optional.questions.length}/{optionalQuestionsCount}</h2>
			{#each body.structure.mathematics.scq.optional.questions as question}
			<div class="qitem">
                <div>{@html question} </div>
            </div>
			{/each}
			{/if}

		</div>

		<!-- <div>
			{#if body.structure.zoology}
			<h2>Select {mandatoryQuestionsCount} zoology Compulsory questions</h2>

		<PickUpQuestions class="picker" subject={'zoology'} q_type={"scq"}
		 bind:selectedQuestions={body.structure.zoology.scq.mandatory.questions}></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.structure.zoology.scq.mandatory.questions.length}/{mandatoryQuestionsCount}</h2>
			{#each body.structure.zoology.scq.mandatory.questions as question}
			<div class="qitem">
                <div>{@html question} </div>
            </div>
			{/each}
			{/if}

		</div>

		

		<div>
			{#if body.structure.zoology}
			<h2>Select {optionalQuestionsCount} zoology Optional questions- {optionalMandatory} compulsory</h2>

		<PickUpQuestions class="picker" subject={'zoology'} q_type={"scq"}
		 bind:selectedQuestions={body.structure.zoology.scq.optional.questions} ></PickUpQuestions>
		
			<hr>
			<h2>Selected Questions: {body.structure.zoology.scq.optional.questions.length}/{optionalQuestionsCount}</h2>
			{#each body.structure.zoology.scq.optional.questions as question}
			<div class="qitem">
                <div>{@html question} </div>
            </div>
			{/each}
			{/if}

		</div> -->
		

		<input class="w3-button w3-round w3-border" type="submit" value="Done" >
	</form>

	{/if}
</div>
