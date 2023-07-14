
<script>

/** @type {import('./$types').PageData} */
export let data;
export let chapterId = data.chapterId;
console.log("chapterID from slug:" + chapterId);	

	import {onMount} from 'svelte';
	import {Token} from '../../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../../_utils/static_store.js';
	import { get } from 'svelte/store';
	import PickUpFiles from '../../../../lib/components/file_picker.svelte';
	import FilesList from '../../../../lib/components/lists/files.svelte';


	

	export var edit = true;
	export var body = {class_number:0,files:[]};

	let subjects=[],streams=[];

	// var name=null;
	// var subject=null;
	// var sequence=null;
	// var content=null;

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


		var loginPath=get(ApiUrl);
		
		console.log("mounted");
		// localStorage.setItem("token","some value");
		
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);

		await getBody();
		await getStreams();
		await getSubjects();
	});

	async function getBody(){
		var token = localStorage.getItem("token");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		
			
			res = await fetch(loginPath+'/panel/chapter_get/'+chapterId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		
		if(res.status==200){
			try{
					let response= await res.text();
					//console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						// location.href="/chapters";
						body = response.data;
						console.log(body);
						body.content= atob(body.content);
						body.class_number=body.class_number.toString();
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

	async function handleSubmit(){
		// var body = new Object;
		// console.log(body);
		body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		if(edit)
		{

			res = await fetch(loginPath+'/panel/chapter_edit/',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

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
						alert("Saved Successfully");
						// location.reload();
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
					// user.email="no logged";
					
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

	h2,h4 {
		font-size: 2.2em;
		/* text-transform: uppercase; */
		/* font-weight: 700; */
		/* margin: 0 0 0.5em 0; */
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
	<title>Chapter</title>
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
	
	<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Save">

</form>

<!-- <p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.{username} {password}</strong></p> -->
<!-- <p>saasdad</p> -->