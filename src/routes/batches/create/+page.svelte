<script>
	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	var body = {subjects:[]};

	// let stream="";

	let streams=[];
	let branches=[];
	let subjects;

	 var loginPath=get(ApiUrl);
	 onMount(async ()=>{
		
		
		console.log("mounted");
		// localStorage.setItem("token","some value");
		
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);
		getStreamsAndBranches();
		getSubjects();
		
	});

	

	async function handleSubmit(){
		console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/batches/batch_create',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

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
					// user.email="no logged";
					
				}
	}


	async function getStreamsAndBranches(){
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/streams_and_branches',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						streams=response.data.streams;
						branches=response.data.branches;
						console.log(streams);
						console.log(branches);
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
					// user.email="no logged";
					
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
	<title>Branch</title>
</svelte:head>


<h4 class="w3-black w3-round w3-card w3-padding"> Add A Batch </h4>
<form on:submit|preventDefault={handleSubmit} >
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.name} placeholder="Name(*)" required/>
	<!-- <input class="w3-input w3-border w3-round" type="text" bind:value={body.s} placeholder="Address" required/>
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.contact} placeholder="Contact us" required/> -->
	<label>Description</label>
	<textarea class="w3-ipnut w3-block w3-card w3-margin w3-padding w3-rounded" bind:value={body.description} placeholder="description" ></textarea><br>
	
	<label>Select a stream</label>
	<select class="w3-input" bind:value={body.stream} >
		<option value="">Select a Stream</option>
		{#each streams as stream}
			<option value={stream._id}>
				{stream.name}
			</option>
		{/each}
	</select>


	<label>Select a Class</label>
	<select class="w3-input" bind:value={body.class_number} >
		<option value="" >Select a Class</option>
		<option value="7">7th Class</option>
		<option  value="8">8th Class</option>
		<option value="9">9th Class</option>
		<option value="10">10th Class</option>
		<option  value="11">11th Class</option>
		<option value="12">12th Class</option>
		<option value="13">Passout</option>
	</select>

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

	<label>Select a Branch</label>
	<select class="w3-input" bind:value={body.branch} >
		<option value="" >Select a Branch</option>
		{#each branches as branch}
			<option value={branch._id}>
				{branch.name}
			</option>
		{/each}
	</select>

	<br>
	<label>Enabled For Online Selling?</label>
	<input type="checkbox" bind:checked={body.enabled_online} />

	{#if body.enabled_online }
	<label>Price (including Taxes)</label>
	<input class="w3-input w3-border w3-round w3-margin w3-padding" type="text" bind:value={body.price} placeholder="Price" required/>

	{/if}

	<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Create">
</form>
