

<script>
	import ImageUpload from '../_utils/imageUpload.svelte';
	import DataUpload from '../_utils/dataUpload.svelte';
	import PickUpQuestions from '../_utils/_questions/question_picker.svelte';
	import {onMount} from 'svelte';
	import QuestionsList from '../../lib/components/lists/questions.svelte';
	import {Token} from '../_utils/dynamic_store.js';
	import {ApiUrl} from '../_utils/static_store.js';
	import { get } from 'svelte/store';
// import { roomId } from '../room/[slug].svelte';
	// export var roomId;

	var questions = null;
	let skip=0,limit=50;
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
		getQuestions();
		// console.log(loginPath+'/auth/whoami');
		

				
		// 
	});

	 async function getQuestions(){
	 	var token = localStorage.getItem("token");
	 	const res = await fetch(loginPath+'/panel/questions?limit='+limit+'&skip='+skip,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					questions = response.data;
					
					
					
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


	function changeTypeSet(){
		
		console.log("changin type set for mathjax");
		setTimeout(() => {
			window.MathJax.typeset();
			console.log("changed type set for mathjax");
		}, 0);
		return "";
	}


	function next(){
		skip+=limit;
		getQuestions();

	}

	function previous(){
		skip-=limit;
		if(skip<0)
				skip=0;
		getQuestions();

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

	.grid-container {
	display: grid;
	grid-template-columns:1fr 1fr 1fr;
	grid-gap: 10px;
	background-color: rgb(255, 255, 255);
	/* padding: 10px; */
	}

	.grid-container > a {
	/* background-color: rgba(255, 255, 255, 0.8); */
	/* border: 1px solid black; */
	text-align: center;
	height:100px;
	overflow: scroll;
	/* font-size: 30px; */
	}
	a{
		text-decoration: none;
		/* overflow: scroll; */
	}
	h3{
		font-size:300%;
	}
	
</style>

<svelte:head>
	<title>Gravity</title>
</svelte:head>

<h3>Questions!</h3>
<!-- <button class="w3-button w3-border w3-round w3-margin" on:click={previous}>Previous</button>
<button class="w3-button w3-border w3-round w3-margin" on:click={next}>Next</button> -->

<h4>Create a new Question</h4>
<div class="container " style="--template-color:red">
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/scq">Single Choice Question</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/mcq">Multiple Choice Question</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/int">Integer Question</a>
		<!-- <a href="/questions/create/fib">Fill In the blanks</a> -->
		<!-- <a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/int_range">Integer - Range Based Question</a> -->

		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/fib">Fill in the blanks</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/fib_range">Fill in the blanks - Range</a>
</div>


<hr>
<div class=" w3-round w3-padding w3-margin">
	<PickUpQuestions picker={false} />
</div>