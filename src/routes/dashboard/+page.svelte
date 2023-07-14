<!-- <script context="module">
	 console.log("hello");
	 

	var user =null;
	export const preload = async function( page, session) {	
	}


	
</script> -->

<script>
	import ImageUpload from '../_utils/imageUpload.svelte';
	import StudentsList from '../../lib/components/lists/students.svelte';
	import TestsList from '../../lib/components/lists/tests.svelte';
	import QuestionsList from '../../lib/components/lists/questions.svelte';
	import {onMount} from 'svelte';
	import {Token} from '../_utils/dynamic_store.js';
	import {ApiUrl} from '../_utils/static_store.js';
	import { get } from 'svelte/store';


// import { roomId } from '../room/[slug].svelte';
	// export var roomId;
	 var loginPath=get(ApiUrl);

	 var dashboard=null;

	 var search = "";
	
	
	export var user;
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


		// console.log(loginPath+'/auth/whoami');
		const res = await fetch(loginPath+'/panel/authentication/whoami',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let data= await res.text();
					// console.log(data);
					data= await JSON.parse(data);
					user = data.user;
					await getDashboard();
					// alert(JSON.stringify(user));
					// console.log(user);
					
			}
			catch(e){
				console.log("caught");
				//this.redirect(300,"/login");
				// this.error(e,data.message);
				console.log(e);
			}
			finally{
				// return { user };
			}
			// let data = JSON.parse(text);
		}
		else{
					console.log(await res.text());
					// user.email="no logged";
					// return {user};
					// this.redirect(300,"/login");
				}
		// 
	});


	async function performSearch()
	{


		
		if(search)
		{
			search = search.trim();
			await fetchSearch();
		}
		else
		{
			await getDashboard();
		}
		
	}

	async function fetchSearch(){
		var token = localStorage.getItem("token");
			if(!token)
			{
				console.log("yes");
				location.href="/login";
			}
			let dashboardReq = await fetch(loginPath+"/panel/search/"+search,{method:"get",headers:{'Authorization':'Bearer '+token}});
			dashboard = await dashboardReq.json();
			if(dashboard.status="success")
			{
				dashboard = dashboard.data;
			}
			console.log(dashboard);

	}


	async function getDashboard()
	{
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		let dashboardReq = await fetch(loginPath+"/panel/dashboard",{method:"get",headers:{'Authorization':'Bearer '+token}});
		dashboard = await dashboardReq.json();
		if(dashboard.status="success")
		{
			dashboard = dashboard.data;
		}
		console.log(dashboard);
	}

</script>

<style>

	h1, figure, p {
		text-align: left;
		margin: 0 auto;
	}

	/* h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	} */

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
		/* text-align: center; */
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
	.flex{
		flex:1;
	}
	li{
		display:block;
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

.grid-container-wide {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  background-color: rgb(255, 255, 255);
  /* padding: 10px; */
}

.grid-container-wide > div {
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 1px solid black; */
  text-align: center;
  /* font-size: 30px; */
}
.v{
	border-radius: 20px;
	box-shadow:  5px 1px 10px #888888;
	background:rgb(250, 250, 250);
	color:grey;
	padding:5px;
	}

a{
	text-decoration: none;
}

.flex{
		margin-top: 30px;
		display:flex;
		align-items: stretch;
	}

.number{
	color:rgb(84, 172, 33);
	font-size:20px;
}

h3{
	font-size:200%;
}
/* h2{
	font-size:300%;
} */
</style>

<svelte:head>
	<title>Gravity</title>
</svelte:head>



	<div>
		<h3>Dashboard</h3>
		
		<hr>

		{#if dashboard}
		<div class="w3-center">
			<h2 class="w3-text-large" >WELCOME <span class="">{dashboard.profile.username.toUpperCase()}</span></h2>
			<h3>POST:<span class="w3-text-green">{dashboard.profile.role.toUpperCase()}</span></h3>
			<label>Search Students,Tests,Questions...</label>
			<div class="ui search" style="cursor:pointer">
				<div class="ui icon input ">
				  <input class="prompt" type="text" bind:value={search} placeholder="ID or pattern..." on:input={performSearch}>
				  <i class="search icon" ></i>
				</div>
				
			  </div>
			<!-- <div class=" w3-row w3-padding w3-center" > 
				
				<input class="w3-threequarter w3-card w3-round w3-padding w3-margin" type="text" bind:value={search} placeholder="ID or pattern..." /><br>
				<button class="w3-quarter w3-button w3-green" on:click={performSearch()}>Search</button>
			</div> -->
		</div>
		<h3>Students</h3>
		<p>Recently Added</p>
		<StudentsList students={dashboard.students} />
		<p>See All <a class="w3-margin w3-link w3-text-cyan" href="/students">Students</a></p>
		<hr>	

		<h3>Tests</h3>
		<p>Recently Added</p>
		<TestsList tests={dashboard.tests} />
		<p>See All <a class="w3-margin w3-link w3-text-cyan" href="/tests">Tests</a></p>
		<hr>

		<h3>Questions</h3>
		<p>Recently Added</p>
		<QuestionsList questions={dashboard.questions} />
		<p>See All <a class="w3-margin w3-link w3-text-cyan" href="/questions">Questions</a></p>
		<hr>
		
		
		<!-- {JSON.stringify(dashboard)} -->
		{/if}
</div>
<hr>

