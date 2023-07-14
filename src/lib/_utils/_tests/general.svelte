<script>
	// import PickUpQuestions from '../_questions/simple_question_picker.svelte';
	import TestSection from "./general_test_section_modified.svelte";
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
	
	let selectedQuestions=[];
	export var body = null;																								
	export var edit = false;
	
	var categories = null;
    var streams=[],batches=[],subjects=[],schemes=[],packages=[],instructions=[];
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
        
        await getstreamsBatchesSubjectsSchemes();
		await getPackages();
		if(edit)
		{
			console.log("editing mode");
			body.instructions= atob(body.instructions);
			return;
		}
        body = {
            structure:{
				sections:[]
            }
        };

		body.enabled=true;
		body.subjects = [];
        body.questions=[];
        body.batches=[];
		body.streams=[];
		body.packages=[];
		// body.structure = {physics:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				chemistry:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				botany:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}},
		// 				zoology:{scq:{mandatory:{questions:[],count:0},optional:{questions:[],schema:"10/15",count:0}}}};
		
		body.category ="-";
		body.stream="-";
		body.test_type="general";
		body.difficulty="medium";
        body.start_date=null;
        body.end_date=null;
		body.class_number = "13";
		// body.max_marks=4*45*4;
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
							instructions = response.data.instructions;
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

	async function getPackages() {
		var token = localStorage.getItem("token");
		var res;
		var res = await fetch(loginPath+'/panel/packages/',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
			if(res.status==200){
				try{
						let response= await res.text();
						response= await JSON.parse(response);
						if(response.status == "success")
						{
                            packages= response.data;
							console.log("packages");
							console.log(packages);
							
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

		

		if(body.structure.sections.length==0)
		{
			alert("Please create at least one section!");
			return;
		}

		for(var i=0;i<body.structure.sections.length;i++)
		{
			if(body.structure.sections[i].questions.length==0)
			{
				alert("Sections with no Questions is not allowed, Section#:"+body.structure.sections[i].id);
				return;
			}
		}
		var keys = Object.keys(data);
		for(var key of keys)
		{
			if(data[key]=="-")
			{
				console.log("deleting: "+key);
				delete data[key];
			}
		}

		let token = localStorage.getItem("token");
		var res;
		console.log(body);
		
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
					}
					else{
						alert(response.message);
					}		
			}
			catch(e){
				// console.log("caught2");
				alert("Some problem has occured, see console for more info.");
				console.log(e);
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
					// user.email="no logged";
					
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


	function createNewSection(){
		console.log("creating section");
		let section = {
            name:"",
			id:Math.floor(1000 + Math.random() * 9000),
			section_type:"compulsory",//optional
			numberCompulsoryQuestions:10,
			questions:[]//{question,marking}
        };
		body.structure.sections.push(section);

		body.structure.sections=body.structure.sections;
	}

	function deleteSection(id){
		let confirmation=confirm("Really want to delete the section?");
		if(!confirmation)
		{
			return;
		}
		console.log("removing section"+id);
		
		for(var i = 0; i<body.structure.sections.length;i++)
		{
			if(body.structure.sections[i].id==id){
				body.structure.sections.splice(i,1);
			}
		}

		body.structure.sections=body.structure.sections;
	}
</script>

<style>
	h1, figure {
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
		font-size:130%;
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
		/* font-size: 70%; */
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
	h3{
		font-size:150%;
	}
	label{
		font-size:100%;
	}
	input[type="checkbox"]
	{
		width :20px;
    	height:20px;
	}

	.ztop{
		z-index:10;
	}
</style>
<h3 class="w3-black w3-round w3-padding width"> {edit?'Edit a':'Create a'} <span class="w3-text-green">Test</span> </h3>
<div class="width">
	{#if edit}
		<button class="w3-red w3-text-white w3-padding w3-margin w3-center" on:click={handleDelete} >Delete?</button>
	{/if}
	{#if body}
    <form on:submit|preventDefault={saveTest}>
		<h4>General Test</h4>
		<label>Enabled</label>
		<input class="w3-radio w3-input" type="checkbox" bind:checked={body.enabled}/>

		<label for="question">Name*</label>
		<input type="text"  class="w3-input w3-round w3-border" placeholder="Name" bind:value={body.name} required/>

		<label for="marks">Duration*</label>
		<input type="number" placeholder="Minutes" class="w3-input w3-round w3-border" bind:value={body.duration}  required/>

        <!-- <label for="marks">Number of Attempts*</label>
		<input type="number" placeholder="Attempts(0=infinite)" class="w3-input w3-round w3-border"  bind:value={body.attempts} required/>

        <label for="marks">Start Time</label>
		<input type="datetime-local" placeholder="Start time for the test" class="w3-input w3-round w3-border"  bind:value={body.start_time} />
        
        <label for="marks">End Time</label>
		<input type="datetime-local" placeholder="Start time for the test" class="w3-input w3-round w3-border"  bind:value={body.end_time}/>

		<label for="question_difficulty"> Test Type</label>
		<select id="question_difficulty" class="w3-input w3-border w3-round w3-margin" bind:value={body.test_type}>
			<option value="-">Select a Type</option>
			<option value="general">General Test</option>
			<option value="iit-mains">JEE Mains</option>
			<option value="iit-advanced">JEE Advanced</option>
			<option value="need">NEET</option>
		</select> -->
		<!-- <hr>
		{#if packages && body.packages}
		<p>Pick up Packages</p><br>
            {#each packages as pack}
			<div class="w3-border w3-margin">
                <input class="w3-checkbox w3-input" type="checkbox" value={pack._id} bind:group={body.packages} />
				<label>{pack.name.toUpperCase()}</label>
			</div>
            {/each}
		{/if}
		<hr> -->

		{#if packages && body.packages}
		<div class="w3-dropdown-hover w3-card w3-green w3-round w3-margin">
			<p class="w3-button">Packages</p>
			<div class="w3-dropdown-content w3-bar-block w3-border ztop">
				{#each packages as packag}
				<div class="w3-border w3-margin">
					<input class="w3-checkbox w3-input w3-bar-item w3-button" type="checkbox" value={packag._id} bind:group={body.packages} />
					<label>{packag.name.toUpperCase()}</label>
				</div>
				{/each}
			</div>
		  </div> 
		{/if}

		{#if streams && body.streams}
		<div class="w3-dropdown-hover w3-card  w3-round w3-margin">
			<p class="w3-button">Streams</p>
			<div class="w3-dropdown-content w3-bar-block w3-border ztop">
				{#each streams as stream}
				<div class="w3-border w3-margin">
					<input class="w3-checkbox w3-input w3-bar-item w3-button" type="checkbox" value={stream._id} bind:group={body.streams} />
					<label>{stream.name.toUpperCase()}</label>
				</div>
				{/each}
			</div>
		  </div>
		{/if}

		{#if subjects && body.subjects}
		<div class="w3-dropdown-hover w3-card  w3-round w3-margin">
			<p class="w3-button">Subjects</p>
			<div class="w3-dropdown-content w3-bar-block w3-border ztop">
				{#each subjects as subject}
				<div class="w3-border w3-margin">
					<input class="w3-checkbox w3-input w3-bar-item w3-button" type="checkbox" value={subject._id} bind:group={body.subjects} />
					<label>{subject.name.toUpperCase()}</label>
				</div>
				{/each}
			</div>
		  </div> 
            
		{/if}

		<!-- <hr> -->
        <!-- {#if batches && body.batches}
		<p>Pick up Batches</p><br>
            {#each batches as batch}
			<div class="w3-border w3-margin w3-margin">
				<input class="w3-checkbox w3-input" type="checkbox" value={batch._id} bind:group={body.batches} />
				<label>{batch.name.toUpperCase()}</label>
			</div>
			{/each}
		{/if} -->

		{#if batches && body.batches}
		<div class="w3-dropdown-hover w3-card  w3-round w3-margin">
			<p class="w3-button">Batches</p>
			<div class="w3-dropdown-content w3-bar-block w3-border ztop">
				{#each batches as batch}
				<div class="w3-border w3-margin">
					<input class="w3-checkbox w3-input w3-bar-item w3-button" type="checkbox" value={batch._id} bind:group={body.batches} />
					<label>{batch.name.toUpperCase()}</label>
				</div>
				{/each}
			</div>
		  </div> 
            
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
		<label for="solution">Instructions </label>
		<textarea id="instructions" class="w3-input w3-round w3-border" placeholder="Text / Latex"  bind:value={body.instructions} />
		<hr>
		
		<div>
			<hr>
			<h3 >Sections</h3>
			<p class="w3-button w3-text-large w3-green w3-card w3-margin" on:click={createNewSection} >+Add</p>
			{#if body.structure && body.structure.sections}
				<label for="solution">Sections</label>
				{#each body.structure.sections as section}
					<TestSection {subjects} {schemes} {streams} questionInstructions={instructions} {deleteSection} bind:questions={selectedQuestions} {edit} bind:body={section} />
				{/each}
			{/if}

		</div>
		
		<input class="w3-button w3-round w3-border" type="submit" value="All Done" >
	</form>
    {/if}
</div>
