<script context="module">
	export async function preload(p,session) {
		
		let params = p.params;
		return {studentId:params.slug};
		// const res = await this.fetch(`/certificate/${params.slug}.json`);
		// const data = await res.json();

		// if (res.status === 200) {
		// 	// console.log(data.certificate)
			
		// 	return { certificate: data.certificate };
		// } else {
		// 	this.error(res.status, data.message);
		// }
	}
</script>
<script>
// import { userInfo } from "os";
	import {onMount} from 'svelte';
	import {Token} from '../_utils/dynamic_store.js';
	import {ApiUrl} from '../_utils/static_store.js';

	import ResultsList from '../../lib/components/lists/results.svelte';
    import { get } from 'svelte/store';
	import StudentsList from '../../lib/components/lists/students.svelte';

	export let studentId;
	
	let student;
	let results=[];
	// let date= new Date(certificate.timestamp);
	// let d= new Date(date).toLocaleDateString('en-US', {
	// 	day: '2-digit',
	// 	month: '2-digit',
	// 	year: 'numeric',
	// 	});


	// let day= date.getDay();
	
	onMount(async ()=>{
		console.log(studentId);
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

		// console.log(loginPath+'/auth/whoami');
		const res = await fetch(loginPath+'/panel/student/'+studentId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("successfully grabbed student");
						student = response.data;
						results = response.results?response.results:[];
						console.log(results);
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
		// 
	});

	async function deleteResult(resultId){
		var confirmed= confirm("Really want to delete the Result?");
		if(!confirmed)
		{
			return;
		}
		var loginPath=get(ApiUrl);
		var token = localStorage.getItem("token");
		// var token = localStorage.getItem("token");
		const res = await fetch(loginPath+'/panel/result_delete/'+resultId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response = await JSON.parse(response);
					if(response.status =="success")
					{
						location.reload();
					}
					else
					{
						alert(response.message);
					}
				}
			catch(e){
				console.log("caught");
				alert("some problem has occured");
				console.log(e);
			}
			finally{
				
			}
		}
		else{
					console.log(await res.text());
					alert("some problem has occured");
				}
	}
</script>

<style>
	*{
		color:rgb(51, 51, 51);
	}
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
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
	h2,h3{
		font-size:300%;
	}
</style>

<svelte:head>
	<title>Question</title>
</svelte:head>


<div class="container " style="--template-color:red">
	<h2 class="w3-margin w3-padding">Student's Information</h2>
	
	{#if student}
		<StudentsList students={[student]} />
		<a class="w3-button w3-padding w3-margin w3-card w3-blue" style="max-width:300px" href="/students/edit/{studentId}"> Edit</a>
		<!-- <button class="w3-button w3-border w3-round w3-margin w3-padding" on:click={handleDelete}>Delete <i class="w3-text-grey fas fa-edit"></i></button> -->
		<hr>
		<h2 class="w3-margin w3-padding">Tests Given</h2>
			{#if results.length > 0}
				<ResultsList {results} />

			{:else}
				<h4>No Tests attempted by the student!</h4>
			{/if}
	{/if}
	
	
	
	
</div>
