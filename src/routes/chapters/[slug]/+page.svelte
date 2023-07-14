
<script>

/** @type {import('./$types').PageData} */
export let data;
export let chapterId = data.chapterId;
console.log("studentID from slug:" + chapterId);

// import { userInfo } from "os";
	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	
	
	let chapter;
	let topics;
	// let date= new Date(certificate.timestamp);
	// let d= new Date(date).toLocaleDateString('en-US', {
	// 	day: '2-digit',
	// 	month: '2-digit',
	// 	year: 'numeric',
	// 	});


	// let day= date.getDay();
	
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

		// console.log(loginPath+'/auth/whoami');
		const res = await fetch(loginPath+'/panel/chapter_get/'+chapterId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("successfully grabbed student");
						chapter = response.data;
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
		// 
	});

	async function getTopics(chapterId){
		// var confirmed= confirm("Really want to delete the topic?");
		// if(!confirmed)
		// {
		// 	return;
		// }
		var loginPath=get(ApiUrl);
		var token = localStorage.getItem("token");
		// var token = localStorage.getItem("token");
		const res = await fetch(loginPath+'/panel/topics/'+chapterId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response = await JSON.parse(response);
					if(response.status =="success")
					{
						topics = response.data;
					}
					else
					{
						// alert(response.message);
						console.log(response.message);
					}
					
					
			}
			catch(e){
				console.log("caught");
				alert("some problem has occured");
				console.log(e);
			}
			finally{
				// return topics;
			}
			
			// let data = JSON.parse(text);
			
		}
		else{
					console.log(await res.text());
					// alert("some problem has occured");
					
				}
	}
	
	
	// console.log(t);
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
	a{
		text-decoration: none;;
	}
</style>

<svelte:head>
	<title>Chapter</title>
</svelte:head>


<div class="container w3-card " style="--template-color:red">
	{#if chapter}
	<h1 class="w3-blue w3-round w3-padding w3-margin ">Chapter</h1>
	<a href="/chapters/edit/{chapter._id}">
		<button class="w3-button w3-border w3-round w3-margin w3-padding">Edit <i class="w3-text-grey fas fa-edit"></i></button>
	</a>
	<div class=" w3-padding w3-round">
		
	
		<div class="item">
			<p>Name:{chapter.name}</p>
			<p>Subject:{chapter.subject}</p>
			<p>Sequence# :{chapter.sequence}</p>
			{#if chapter.content}
				<div>{@html atob(chapter.content)}</div>
			{/if}
			{#if chapter.file}
				<div>{chapter.file}</div>
			{/if}
		</div>
		
	</div>
	<hr>
	<h2 id={getTopics(chapter._id)} class="w3-green w3-round w3-padding w3-margin ">Topics</h2>
	<a href="/chapters/topics/create/{chapter._id}">
		<button class="w3-button w3-border w3-round">Add new <i class="w3-text-grey fas fa-plus"></i></button>
	</a>

	{#if topics && topics.length>0}
		<div class="w3-padding w3-margin">
			{#each topics as topic,index}
			<a href="/chapters/topics/{topic._id}" class="w3-hover-blue w3-padding w3-margin w3-round">
				{index+1} | {topic.name}
			</a>
			<hr>
		{/each}

		</div>
	{:else}

	<p>There are currently no topics added in this chapter!</p>
	{/if}

	{/if}

</div>

