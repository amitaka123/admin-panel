<script>

	/** @type {import('./$types').PageData} */
export let data;
export let examId = data.examId;
console.log("examID from slug:" + examId);	


	import {onMount} from 'svelte';
	import {Token} from '../../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../../_utils/static_store.js';
	import { get } from 'svelte/store';
	import PickUpFiles from '../../../../lib/components/file_picker.svelte';
	import FilesList from '../../../../lib/components/lists/files.svelte';


	

	export var edit = true;
	export var body = null;

	let date;

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
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		
			
			res = await fetch(loginPath+'/panel/exams/single/'+examId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		
		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						body = response.data;
						console.log(body);
						date = new Date(body.exam_date);
						// date= date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
						// date= date.replace("/","-");
						date = body.exam_date.split("T")[0];
						console.log(date);
						// date = "2022-03-02";
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

	async function handleSubmit(){
		// body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		body.exam_date = new Date(date).toISOString();
		console.log(body);
		res = await fetch(loginPath+'/panel/exams/update/'+examId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

		if(res.status==200){
			try{
					let response= await res.text();
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

<svelte:head>
	<title>Exams</title>
</svelte:head>


<h4 class="w3-black w3-round w3-card w3-padding">Edit Exam</h4>
{#if body}
<form on:submit|preventDefault={handleSubmit} >
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.name} placeholder="Name(*)" required/>
	<input class="w3-input w3-border w3-round" type="date" bind:value={date} placeholder="Exam Date" required/>
	<!-- <input class="w3-input w3-border w3-round" type="text" bind:value={body.contact} placeholder="Contact us" required/> -->
	<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Save">
</form>
{/if}