<script>
	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	export var body = {stream:""};

	// let stream="";

	let subjects=[];
	let chapters=[];
	let branches=[];

	 var loginPath=get(ApiUrl);
	 onMount(async ()=>{
		console.log("mounted");		
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);
		getSubjects();
		getChapters();
		
	});

	

	async function handleSubmit(){
		console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/batches/lecture_create',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

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
			finally{
				
			}	
		}
		else{
					console.log(await res.text());
					user.email="no logged";
					
				}
	}


	async function getSubjects(){
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/subjects',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						subjects=response.data;
						console.log(subjects);
						// branches=response.data.branches;
						// console.log(streams);
						// console.log(branches);
					}
					else{
						console.log(response.message);
						alert("Server Error:"+response.message);
					}	
			}
			catch(e){
				console.log("caught");
				console.log(e);
			}
				
		}
		else{
					console.log(await res.text());
					user.email="no logged";
					
				}
	}

	async function getChapters(){
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/chapters',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						chapters=response.data;
						console.log(chapters);
						// branches=response.data.branches;
						// console.log(streams);
						// console.log(branches);
					}
					else{
						console.log(response.message);
						alert("Server Error:"+response.message);
					}	
			}
			catch(e){
				console.log("caught");
				console.log(e);
			}
				
		}
		else{
					console.log(await res.text());
					user.email="no logged";
					
				}
	}
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	input[type=checkbox]{
		display:inline;
		width:50px;
	}
</style>

<svelte:head>
	<title>Lecture</title>
</svelte:head>


<h4 class=" w3-round w3-margin w3-xlarge"> Create new Lecture</h4>
<h4 class=" w3-margin w3-text-grey"> Lectures are later can be added into respective batches</h4>
<hr>
<form on:submit|preventDefault={handleSubmit} >
	<label>Name</label>
	<input class="w3-input w3-border w3-round w3-margin w3-padding" type="text" bind:value={body.name} placeholder="Name(*)" required/>
	<!-- <input class="w3-input w3-border w3-round" type="text" bind:value={body.s} placeholder="Address" required/>
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.contact} placeholder="Contact us" required/> -->
	<label>Description</label>
	<textarea class="w3-ipnut w3-block w3-border w3-margin w3-padding w3-round" bind:value={body.description} placeholder="Description" ></textarea><br>

	<label>Faculties</label>
	<input class="w3-input w3-border w3-round w3-margin w3-padding" type="text" bind:value={body.faculties} placeholder="Faculties" required/>


	<label>Lecture URL(AWS link)</label>
	<input class="w3-input w3-border w3-round w3-margin w3-padding" type="text" bind:value={body.media} placeholder="Video URL" required/>

	<label>Lecture TimeStamp</label>
	<input class="w3-input w3-border w3-round w3-margin w3-padding" type="datetime-local" bind:value={body.timestamp} required/>


	<!-- <label>Select a stream</label>
	<select class="w3-input" bind:value={body.stream} >
		<option value="">Select a Stream</option>
		{#each streams as stream}
			<option value={stream._id}>
				{stream.name}
			</option>
		{/each}
	</select> -->


	<!-- <label>Select a Class</label>
	<select class="w3-input" bind:value={body.class_number} >
		<option value="" >Select a Class</option>
		<option value="7">7th Class</option>
		<option  value="8">8th Class</option>
		<option value="9">9th Class</option>
		<option value="10">10th Class</option>
		<option  value="11">11th Class</option>
		<option value="12">12th Class</option>
		<option value="13">Passout</option>
	</select> -->

	{#if subjects}
	<label>Select a Subject</label>
	<select class="w3-input w3-margin w3-padding w3-white w3-round" bind:value={body.subject} >
		<option value="" >Select a Subject</option>
		{#each subjects as subject}
			<option value={subject._id}>
				{subject.name}
			</option>
		{/each}
	</select>
	{/if}

	{#if chapters}
	<label>Select a Chapter</label>
	<select class="w3-input w3-margin w3-padding w3-white w3-round" bind:value={body.chapter} >
		<option value="" >Select a Chapter</option>
		{#each chapters as chapter}
			<option value={chapter._id}>
				{chapter.name}
			</option>
		{/each}
	</select>
	{/if}

	<input class="w3-button w3-right w3-border w3-round w3-green w3-card w3-border" type="submit" value="Create">
</form>
