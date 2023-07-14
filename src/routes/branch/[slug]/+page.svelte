<script>

/** @type {import('./$types').PageData} */
export let data;
export let branchId = data.branchId;
console.log("branchID from slug:" + branchId);

// import { userInfo } from "os";
	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	
	
	let branch;
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
		const res = await fetch(loginPath+'/panel/branch_get/'+branchId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("successfully grabbed student");
						branch = response.data;
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
		res = await fetch(loginPath+'/panel/branch_delete/'+branchId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
	<title>Branch</title>
</svelte:head>


<div class="container w3-card " style="--template-color:red">
	{#if branch}
	<h1 class="w3-large w3-round w3-padding w3-margin ">Branch</h1>
	<a href="/branch/edit/{branch._id}">
		<button class="w3-button w3-border w3-round w3-margin w3-padding">Edit <i class="w3-text-grey fas fa-edit"></i></button>
	</a>
	<button class="w3-button w3-border w3-round w3-margin w3-padding" on:click={handleDelete}>Delete <i class="w3-text-grey fas fa-edit"></i></button>
	<div class=" w3-padding w3-round">
		<div class="item">
			<label>Name</label>
			<p class="w3-large w3-text-blue">{branch.name}</p>
			<label>Address</label>
			<p class="w3-large w3-text-blue">{branch.address}</p>
			<label>Contact</label>
			<p class="w3-large w3-text-blue">{branch.contact}</p>
		</div>
		
	</div>
	<hr>
	{:else}
		<p>Branch not Found</p>
	{/if}

</div>

