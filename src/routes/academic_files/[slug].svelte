<script context="module">
	export async function preload(p,session) {
		
		let params = p.params;
		return {fileId:params.slug};
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
	import { get } from 'svelte/store';
	export let fileId;
	// import * as moment from 'moment.js';
	
	
	let file;
	// let date= new Date(certificate.timestamp);
	// let d= new Date(date).toLocaleDateString('en-US', {
	// 	day: '2-digit',
	// 	month: '2-digit',
	// 	year: 'numeric',
	// 	});


	// let day= date.getDay();
	
	onMount(async ()=>{
		console.log(staffId);
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
		const res = await fetch(loginPath+'/files/?_id='+fileId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					file = response.data;
					
					
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
</style>

<svelte:head>
	<title>Question</title>
</svelte:head>


<div class="container w3-card " style="--template-color:red">
	{#if staff}
		<h1 class="straight w3-black w3-card w3-round w3-padding w3-margin"> Staff Member: {staff.username }</h1>
		<!-- <p class="straight"></p> -->
		<!-- <p class="straight">:</p> -->

			<h4>Role</h4>
		<p class="straight">{staff.role}</p>
		<h4>Email</h4>
		<p class="straight"> {staff.email}</p>
		<h4>User Id</h4>
		<p class="straight"> {staff._id }</p>
			<!-- <p>Permissions:{staff.permissions}</p> -->

			<div class="abs"><button on:click={deleteStaff} class="w3-red w3-round w3-card w3-button w3-margin " >Delete Staff Member?</button></div>

	{/if}
	
	<!-- <img src={certificate.issuer.logo} alt="logo" />
	
	<h2 class="organization">{certificate.issuer.organization}</h2>
	
	<span class="cont" >This is to certify that</span>
	<h2 class="straight" >{certificate.name}</h2>
	<h4 class="cont" >has completed</h4>
	<h1 class="straight" >{certificate.template.name}</h1>
	<h4 class="cont" >with flying colors!!</h4>
	
	<div class="flex">
		<div class="flexit"> </div>
		<div class="flexit">
			<img src={certificate.issuer.signature} alt="logo" />
			<hr style="color:black">
			<p class="cont">{certificate.issuer.name}</p>
			
			<p class="straight">{certificate.issuer.post}</p>
			<p class="straight">{certificate.issuer.organization}</p>
			
		</div>
	</div> -->
	<!-- <h1>{certificate.template.name}</h1> -->
	
	
</div>
