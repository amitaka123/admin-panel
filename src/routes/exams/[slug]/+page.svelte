<script>

/** @type {import('./$types').PageData} */
export let data;
export let examId = data.examId;
console.log("examID from slug:" + examId);

// import { userInfo } from "os";
import QuestionsList from '../../../lib/components/lists/questions.svelte';

	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	
	
	let exam;
	let questions = [];
	// let topics;

	
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
		var loginPath=get(ApiUrl);
		const res = await fetch(loginPath+'/panel/exams/single/'+examId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("successfully grabbed student");
						exam = response.data;

						questions = exam.questions;
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
	});

	async function handleDelete(){
		// body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/exams/delete/'+examId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("Deleted")
						windows.history.back();
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
	label{
		color:#777777;
	}
</style>

<svelte:head>
	<title>Exam</title>
</svelte:head>


<div class="container w3-card " style="--template-color:red">
	{#if exam}
	<h1 class="w3-large w3-round w3-padding w3-margin ">Exam</h1>
	<!-- <a href="/exam/edit/{exam._id}">
		<button class="w3-button w3-border w3-round w3-margin w3-padding">Edit <i class="w3-text-grey fas fa-edit"></i></button>
	</a> -->
	<!-- <button class="w3-button w3-border w3-round w3-margin w3-padding" on:click={handleDelete}>Delete <i class="w3-text-grey fas fa-edit"></i></button>
	<div class=" w3-padding w3-round">
		
	
		<div class="item">
			<label>Name</label>
			<p class="w3-large w3-text-blue">{exam.name}</p>
			<label>Date</label>
			<p class="w3-large w3-text-blue">{exam.exam_date}</p>
		</div>
		
	</div>
	<hr> -->

	<table class="w3-table-all w3-hoverable"  width="100%">
		<thead>
		  <tr class="w3-light-grey">
			<th>Name</th>
			<th>Date</th>
			<th>Exam ID</th>
			<th>Edit</th>
			<th>Delete</th>
			
		  </tr>
		</thead>
		<!-- {#each exams as exam} -->
		<tr class="w3-hover-shadow">
			<td>{exam.name}</td>
			<td>{exam.exam_date}</td>
			
			<td><a class="w3-text-blue" href="/exams/{exam._id}">{exam._id}</a></td>
			<td><a class="w3-border w3-padding w3-round w3-hover-shadow w3-text-red w3-center" href="/exams/edit/{exam._id}">Edit</a></td>
			<td><a class="w3-border w3-padding w3-round w3-hover-shadow w3-text-red w3-center w3-cursor-pointer" on:click={()=>{handleDelete()}} >Delete</a></td>
		</tr>
		<!-- {/each} -->
	  </table>
	  <hr class="w3-margin" />
	  <QuestionsList {questions} />
	{:else}
	<p>Loading</p>

	

	{/if}

</div>

