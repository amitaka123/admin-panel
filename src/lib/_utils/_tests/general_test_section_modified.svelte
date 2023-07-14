<script>
	import PickUpQuestions from '../_questions/simple_question_picker_modified.svelte';
	import {onMount} from 'svelte';
	import {Token} from '../dynamic_store.js';
	import {ApiUrl} from '../static_store.js';
	import { get } from 'svelte/store';
	import { bind, prevent_default } from 'svelte/internal';

	// export var question;
	var loginPath=get(ApiUrl);
	
	export var body;//single object from section	
	export var test;//test.questions																					
	export var edit = false;

	export var deleteSection=function(id){
		console.log("unimplemented function:"+id);
	};

	export var questions = [];// for Id array
    export var subjects=[],schemes=[],streams=[],questionInstructions=[];

	let preferredScheme,preferredSubject,preferredInstructions;


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
		 console.log(edit);
		 var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);
		body.questions.map(qna=>{
			questions.push(qna.question);
		});

		preferredScheme="-";
		preferredSubject="-";
		preferredInstructions="-";
		
	});

    async function eventFunction(question,isInserted){
        console.log(isInserted);
        if(isInserted)
        {
            body.questions.push({question:question._id,question_text:question.question,scheme:preferredScheme!="-"?preferredScheme:schemes[0]._id,subject:preferredSubject!="-"?preferredSubject:subjects[0]._id,instructions:preferredInstructions!="-"?preferredInstructions:questionInstructions[0]._id});
        }
        else
        {
			for(var i = 0; i <body.questions.length;i++)
			{
				if(body.questions[i].question == question._id)
				{
					body.questions.splice(i,1);
					break;
				}
			}
        }
		body.questions = body.questions;
    }


	function toggleVision(id)
	{
		console.log("OKK");
		var d=document.getElementById(id);
		d.classList.toggle("w3-hide");
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
	h3{
		font-size:140%;
	}
</style>


<h3 class=" w3-white w3-card w3-padding w3-margin width w3-hover-shadow" style="cursor:pointer" on:click={()=>toggleVision(body.id)}><span class="w3-text-green">Section: {body.name}</span> </h3>
<div class="width w3-light-gray" id="{body.id}">
	{#if body}
	<a href="#" class="w3-red w3-card w3-padding w3-center" on:click={()=>{deleteSection(body.id)}}>Remove Section</a>
	
    <form>
		<h4>Section {body.name}</h4>
		<label for="question">Name*</label>
		<input type="text"  class="w3-input w3-round w3-border" placeholder="Name" bind:value={body.name} required/>
		<hr>
		<label for="question_difficulty">Section Type</label>
		<select id="question_difficulty" class="w3-input w3-border w3-round w3-margin" bind:value={body.section_type} required>
			<option value="compulsory">All questions Compulsory</option>
			<option  value="optional-neet">Some questions are Optional - NEET</option>	
			<!-- <option value="compulsory">All questions Compulsory</option> -->
			<option  value="optional-jee">Some questions are Optional - JEE</option>	
		</select>

		{#if schemes && preferredScheme}
		Default Marking Scheme for this Section
		<select class="w3-input w3-border w3-round w3-margin" bind:value={preferredScheme}>
			<option  value="-">Select Scheme</option>
			{#each schemes as scheme}
			<option  value="{scheme._id}">{scheme.name}</option>
			{/each}
		</select>

		{/if}

		{#if subjects && preferredSubject}
		Default Subject for this Section
		<select class="w3-input w3-border w3-round w3-margin" bind:value={preferredSubject}>
			<option  value="-">Select Subject</option>
			{#each subjects as subject}
			<option  value="{subject._id}">{subject.name}</option>
			{/each}
		</select>

		{/if}

		{#if questionInstructions && preferredInstructions}
		Default Instruction for this Section
		<select class="w3-input w3-border w3-round w3-margin" bind:value={preferredInstructions}>
			<option  value="-">Select Instruction</option>
			{#each questionInstructions as instruction}
			<option  value="{instruction._id}">{instruction.name}</option>
			{/each}
		</select>

		{/if}
		

		{#if (body.section_type=="optional-jee" || body.section_type=="optional-neet") }
		<label for="marks">Number of Copmulsory Questions*</label>
		<input type="number" placeholder="Number of Copmulsory Questions*" class="w3-input w3-round w3-border"  bind:value={body.numberCompulsoryQuestions} required/>
		{/if}
		<hr>
		<div>
			{#if body.questions}
			<!-- <h2>Select {mandatoryQuestionsCount} Physics Compulsory questions</h2> -->
			<PickUpQuestions class="picker" bind:selectedQuestions={questions} eventFunction={eventFunction} {streams} {subjects}></PickUpQuestions>
			<h2>Selected Questions: {questions.length}</h2>
			{#each body.questions as questionAndMarking}

            <table class="w3-table-all w3-hoverable"  width="100%">
                <thead>
                  <tr class="w3-light-grey">
                    <th>Question</th>
                    <!-- <th>Type</th> -->
                    <th>Subject</th>
                    <th>Marking Scheme</th>
					<th>Instructions</th>
                  </tr>
                </thead>
                
                <tr class="w3-hover-shadow">
                    <td>{@html atob(questionAndMarking.question_text)}</td>
                    <!-- <td>{questionAndMarking.question.question_type}</td> -->
                    <!-- <td>{questionAndMarking.question.subjects.map(s=>s.name).join(",")}</td> -->
					<td>
						<select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={questionAndMarking.subject}>
                            {#if subjects}
                                {#each subjects as subject}
                                <option  value="{subject._id}">{subject.name}</option>
                                {/each}
                            {/if}
                        
                        </select>
					</td>
                    <td>
                        <select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={questionAndMarking.scheme}>
                            {#if schemes}
                                {#each schemes as scheme}
                                <option  value="{scheme._id}">{scheme.name}:+{scheme.positive_marks},-{scheme.negative_marks}</option>
                                {/each}
                            {/if}
                        
                        </select>
					</td>
					<td>
                        <select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={questionAndMarking.instructions}>
                            {#if questionInstructions}
                                {#each questionInstructions as instruction}
                                <option  value="{instruction._id}">{instruction.name}</option>
                                {/each}
                            {/if}
                        
                        </select>
					</td>
			</tr>
            </table>
			{/each}
			{/if}

		</div>
	</form>
    {/if}
</div>
