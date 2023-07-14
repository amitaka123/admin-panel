

<script>
	import ImageUpload from '../_utils/imageUpload.svelte';
	import DataUpload from '../_utils/dataUpload.svelte';
	import {onMount} from 'svelte';
	import TestPicker from '../_utils/_tests/test_picker.svelte';

	import {Token} from '../_utils/dynamic_store.js';
	import {ApiUrl} from '../_utils/static_store.js';
	import { get } from 'svelte/store';


	var tests = null;
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
		const res = await fetch(loginPath+'/panel/tests',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					tests = response.data;	
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
	})
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

	.grid-container {
	display: grid;
	grid-template-columns: auto auto auto;
	grid-gap: 10px;
	background-color: rgb(255, 255, 255);
	/* padding: 10px; */
	}

	.grid-container > div {
	/* background-color: rgba(255, 255, 255, 0.8); */
	/* border: 1px solid black; */
	text-align: center;
	/* font-size: 30px; */
	}
	a{
		text-decoration: none;
	}

	h2,h3{
		font-size:300%;
	}
</style>

<svelte:head>
	<title>Tests</title>
</svelte:head>

<h3 class="W3-margin">Tests</h3>
<h4>Create a new Test</h4>
<div class="container " style="--template-color:red">
	<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/tests/create/general">Create Test</a>

		<!-- <a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/tests/create/simple">Simple Test</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/tests/create/neet">NEET Test</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/tests/create/jee_mains">JEE-MAINS Test</a> -->

</div>

<hr>
<div class="grid-container w3-round">
	<TestPicker picker={false} />
	<!-- {#if tests}
	<TestsList {tests} />
	{:else}
		<h3>No Test Present</h3>
	{/if} -->
</div>

