<script>

/** @type {import('./$types').PageData} */
export let data;
export let chapterId = data.chapterId;
console.log("chapterID from slug:" + chapterId);	

	import {onMount} from 'svelte';
	import {Token} from '../../../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../../../_utils/static_store.js';
	import { get } from 'svelte/store';

	
	function initializeTinyMice(){
		tinymce.init({
			selector: 'textarea',  // change this value according to your HTML
			plugins: 'advlist link image lists media',
  			media_live_embeds: true
		});

	}

	export var edit = false;
	export var body = {};

	// var name=null;
	// var subject=null;
	// var sequence=null;
	// var content=null;
	
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
	});

	

	async function handleSubmit(){
		// var body = new Object;
		// console.log(body);
		var token = localStorage.getItem("token");
		// body.topic = topic;
		body.content= btoa(tinymce.get('content').getContent());

		var loginPath=get(ApiUrl);
		let res;
		if(edit)
		{

			res = await fetch(loginPath+'/panel/topic_edit/',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

		}
		else
		{
			
			res = await fetch(loginPath+'/panel/topic_create/'+chapterId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

		}
		if(res.status==200){
			try{
					let response= await res.text();
					//console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						location.href="/chapters/"+chapterId;
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
	<title>Gravity</title>
</svelte:head>


<h4 class="w3-black w3-round w3-card w3-padding"> {edit?"Edit Topic":"Add a new Topic"} </h4>
<form on:submit|preventDefault={handleSubmit} >
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.name} placeholder="Name(*)" required/>
	<input class="w3-input w3-border w3-round" type="number" bind:value={body.sequence} placeholder="Sequence #(*)" required/>
	<label for="content">Content </label>
		<textarea id="content" class="w3-input w3-round w3-border" placeholder="Text / Latex" />
		<hr>
	

	
	<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Done">

</form>

<!-- <p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.{username} {password}</strong></p> -->
<!-- <p>saasdad</p> -->