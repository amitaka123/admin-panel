<script>

/** @type {import('./$types').PageData} */
export let data;
export let instructionId = data.instructionId;
console.log("instructionID from slug:" + instructionId);	

	import {onMount} from 'svelte';
	import {Token} from '../../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../../_utils/static_store.js';
	import { get } from 'svelte/store';

	

	export var edit = true;
	export var body = {};

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
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);

		getBody();
	});

	async function getBody(){
		console.log("instructions Id: "+instructionId);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		
			
			res = await fetch(loginPath+'/panel/instructions/single/'+instructionId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		
		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						body = response.data;
						body.instructions= atob(body.instructions);
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

	async function handleSubmit(){
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		body.instructions =btoa(tinymce.get('instructions').getContent());

		res = await fetch(loginPath+'/panel/instructions/edit/'+instructionId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

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


<h4 class="w3-black w3-round w3-card w3-padding">Edit Instructions</h4>
<form on:submit|preventDefault={handleSubmit} >
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.name} placeholder="Name(*)" required/>
	<textarea id="instructions" class="w3-input w3-border w3-round" type="text" bind:value={body.instructions} placeholder="Instructions"></textarea>
	<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Save">
</form>