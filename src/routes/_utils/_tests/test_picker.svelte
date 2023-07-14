
<script>
// import { userInfo } from "os";
	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	import Questions from '../../../lib/components/lists/questions.svelte';
	import TestsList from '../../../lib/components/lists/tests.svelte';
    var tests = null;

	var streams=[],branches=[],batches=[],subjects;

	export let picker=false;

	let fresh=true;
    let body = {};
    var loginPath=get(ApiUrl);

	function next(){
		body.skip+=body.limit;
		getTests();
	}

	function previous(){
		body.skip-=body.limit;
		if(body.skip<0)
			body.skip=0;
			getTests();
	}
	
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

		body.batch="-";
		body.branch="-";
        body.stream="-";
		body.skip=0;
		body.limit=50;

		await getStreams();
		await getBatches();
		await getSubjects();

		await getTests();
		
		
	});

	const forceUpdate = async (_) => {};

    async function getTests(fresh=false)
    {
        var res;
        var token = localStorage.getItem("token");
		
		console.log("fresh: "+fresh);
		if(fresh)
		{
			body.skip=0;
		}
		res = await fetch(loginPath+'/panel/tests?'+serialize(body),{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
	
         
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("successfully grabbed tests");
						tests = response.data;
						tests = tests;
						console.log(tests);
						// students=questions;
					}	
			}
			catch(e){
				console.log("caught");
				
				console.log(e);
			}
		}
		else
		{
			console.log(await res.text());	
		}
    }

    function serialize(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                if(obj[p]!="-"){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
        return str.join("&");
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
					user.email="no logged";
					
				}
	}

	async function getBatches(){
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/batches/',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						batches=response.data;
						console.log(batches);
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
		res = await fetch(loginPath+'/panel/subjects/',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						subjects=response.data;
						console.log(subjects);
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
</script>

<style>
	*{
		color:rgb(51, 51, 51);
	}
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #dfc502;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	.container{
		
		width:100%;
		/* border:1px solid rgb(140, 140, 140); */
		border-radius: 5px;
		margin:10px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: left;

		/* background: linear-gradient(45deg,rgb(134, 60, 253),var(--template-color)); */

	}
	img{
		display:block;
		width:150px;
	}
	.certificate{
		font-size: 120px;
		font-family: 'MonteCarlo', cursive;
	}
	.organization{
		color:black;
		font-size: 80px;
		font-family: 'MonteCarlo', cursive;
	}
	.cont{
		font-family: 'MonteCarlo', cursive;
		font-size: 30px;
	}
	.straight{
		font-family: 'Merriweather', serif;

		/* font-family: 'MonteCarlo', cursive; */
	}
	.flex{
		margin-top: 30px;
		display:flex;
		align-items: stretch;
	}
	.flexit{
		flex:1;
		padding:20px;
	}
	p{
		/* width:100%; */
		margin:0;
		text-align: left;
	}
	h1{
		margin:00px;
	}
	div{
		align-self: left;
		justify-self: left;
	}
	.abs{
		position:absolute;
		top:120px;
		right:130px;
	}
	a{
		text-decoration: none;;
	}

	h2,h3{
		font-size:250%;
	}

	button{
		display:inline;
		width:200px;
	}
</style>

<svelte:head>
	<title>Chapter</title>
</svelte:head>


<div class="container w3-border w3-padding" style="--template-color:red">
	{#if picker}
		Picker
	{/if}
    <h4>Filters</h4>
   <form  on:submit|preventDefault={getTests}>
	{#if streams}
	<p>Select Stream</p><br>
	<select class="w3-input w3-border w3-round w3-margin" bind:value={body.stream}>
		<option value="-">Select Stream</option>
		{#each streams as stream}
		<!-- <label>{}</label> -->
			<option value={stream._id}>{stream.name.toUpperCase()}</option>
			<!-- <input class="w3-checkbox w3-input" type="checkbox"  bind:group={body.streams} /> -->
		{/each}

	</select>
	{/if}

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

	{#if batches}
	<p>Select Batches</p><br>
	<select class="w3-input w3-border w3-round w3-margin" bind:value={body.batch}>
		<option value="-">Select Batch</option>
		{#each batches as batch}
		<!-- <label>{}</label> -->
			<option value={batch._id}>{batch.name.toUpperCase()}</option>
			<!-- <input class="w3-checkbox w3-input" type="checkbox"  bind:group={body.streams} /> -->
		{/each}

	</select>
	{/if}

    <input class="w3-button w3-round w3-border" type="submit" value="Apply filters" >

   </form>
   
	{#if tests}
		<h3>Tests({body.skip}-{body.skip+body.limit})</h3>
		<div class="flex">
			<p class="w3-button w3-border w3-round w3-margin" on:click={previous}>Previous</p>
			<p class="w3-button w3-border w3-round w3-margin" on:click={next}>Next</p>
			
		</div>

		<div class="w3-padding w3-margin">
			<TestsList tests={tests} />
		</div>
	{:else}
		<p>No tests found!</p>
	{/if}
</div>

