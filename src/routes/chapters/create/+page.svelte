<script>
	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';

	import PickUpFiles from '../../../lib/components/file_picker.svelte';

	export var edit = false;
	export var body = {files:[],streams:[]};

	let subjects=[],streams=[];
	
	function initializeTinyMice(){
		tinymce.init({
			selector: 'textarea',  // change this value according to your HTML
			plugins: 'advlist link image lists media',
  			media_live_embeds: true
		});

	}
	
	var loginPath=get(ApiUrl);
	 onMount(async ()=>{
		setTimeout(() => {
			 initializeTinyMice();
		 }, 2000);
		
		console.log("mounted");
		// localStorage.setItem("token","some value");
		
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);

		await getSubjects();
		await getStreams()
		
	});

	

	async function handleSubmit(){
		// var body = new Object;
		body.content= btoa(tinymce.get('content').getContent());
		// console.log(body);
		// return;
		console.log(body);
		var token = localStorage.getItem("token");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		if(edit)
		{

			res = await fetch(loginPath+'/panel/chapter_edit/'+body._id,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

		}
		else
		{
			
			res = await fetch(loginPath+'/panel/chapter_create',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

		}
		if(res.status==200){
			try{
					let response= await res.text();
					//console.log(response);
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
			
			// let data = JSON.parse(text);
			
		}
		else{
					console.log(await res.text());
					user.email="no logged";
					
				}
	}

	async function getSubjects(){
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

	async function getStreams(){
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
</script>

<style>
	h1, figure {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	h2,h4{
		font-size: 2.0em;
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
	<title>Gravity</title>
</svelte:head>


<h4 class="w3-black w3-round w3-card w3-padding"> {edit?"Edit Chapter":"Add a new Chapter"} </h4>
<form on:submit|preventDefault={handleSubmit} >
	<label>Name</label>
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.name} placeholder="Name(*)" required/>
	
	{#if subjects}
	<p>Select Subject</p><br>
	<select class="w3-input w3-border w3-round w3-margin" bind:value={body.subject}>
		<option value="-">Select Subject</option>
		{#each subjects as subject}
		<!-- <label>{}</label> -->
			<option value={subject._id}>{subject.name.toUpperCase()}</option>
			<!-- <input class="w3-checkbox w3-input" type="checkbox"  bind:group={body.streams} /> -->
		{/each}

	</select>
	{/if}

		{#if streams}
		<p >Pick up Streams</p><br>
            {#each streams as stream}
            <label>{stream.name.toUpperCase()}</label>
                <input class="w3-checkbox w3-input" type="checkbox" value={stream._id} bind:group={body.streams} />
            {/each}
		{/if}
		<hr>
		<label for="content">Content </label>
		<textarea id="content" class="w3-input w3-round w3-border" placeholder="Text / Latex" />
		<hr>
		
		<h2>Content Attatchment</h2>

		{#if body.files}
		<p class="w3-left">Number of files selected: {body.files.length} </p>
		{/if}
	<PickUpFiles class="picker" bind:selectedFiles={body.files} ></PickUpFiles>


	<!-- <p>To attach a file please go and upload the file from here and paste the File ID Below.</p>
	<input class="w3-input w3-border w3-round" type="text" placeholder="File ID" bind:value={body.file} /> -->
	
	<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Create">

</form>

<!-- <p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.{username} {password}</strong></p> -->
<!-- <p>saasdad</p> -->