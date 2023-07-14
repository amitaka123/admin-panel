<script>

/** @type {import('./$types').PageData} */
export let data;
export let lectureId = data.lectureId;
console.log("lectureID from slug:" + lectureId);

// import { userInfo } from "os";
import LecturesList from '../../../lib/components/lists/lectures.svelte';
import TestsList from '../../../lib/components/lists/tests.svelte';
import StudentsList from '../../../lib/components/lists/students.svelte';
import FilesList from '../../../lib/components/lists/lectures/files.svelte';



	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	

	let fileId;


	let tab = "files";
	
	let lecture;
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
		const res = await fetch(loginPath+'/panel/batches/lecture_get/'+lectureId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("successfully grabbed student");
						lecture = response.data;
						player1 = YouTubePlayer('player', {
							videoId: lecture.media,
							// autoplay:0,
							// controls: 0,
							// fs: 0
						});
						// if(!batch.lectures){
						// 	batch.lectures = [];
						// }
						// if(!batch.students){
						// 	batch.students = [];
						// }
						// if(!batch.tests){
						// 	batch.tests = [];
						// }
						if(!lecture.files){
							batch.files = [];
						}

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
		console.log("inside batch delete");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/batches/lecture_delete/'+lectureId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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



	function switchTab(tabName){
		tab = tabName;
	}

	async function addFileToLecture(){
		// body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		console.log("inside batch delete");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		if(!fileId || fileId=="" || fileId.length != 24){
			alert("please enter a valid Lecture Id");
			return;
		}
		res = await fetch(loginPath+'/panel/batches/lecture_add_file/'+lectureId+"/"+fileId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
	<title>Lectures</title>
</svelte:head>


<div class="container w3-card " style="--template-color:red">
	{#if lecture}
	<h1 class="w3-xxlarge w3-round w3-padding w3-margin ">Lecture: {lecture.name}</h1>
	
		
	
	<!-- <button class="w3-button w3-border w3-round w3-margin w3-padding" on:click={handleDelete}>Delete <i class="w3-text-grey fas fa-delete"></i></button>
	<div class=" w3-padding w3-round">
		<div class="item">
			<label>Name</label>
			<p class="w3-large w3-text-blue">{batch.name}</p>
			<label>Stream Name</label>
			<p class="w3-large w3-text-blue">{batch.stream.name}</p>
			<label>Branch Name</label>
			<p class="w3-large w3-text-blue">{batch.branch.name}</p>
			<label>Class</label>
			<p class="w3-large w3-text-blue">{batch.class_number.toString()}</p>
		</div>
		
	</div>
	<hr> -->
	<table class="w3-table-all w3-hoverable"  width="100%">
		<thead>
		  <tr class="w3-light-grey">
			<!-- <th>#</th> -->
			<th>Name</th>
			<th>Lecture Id</th>
			<th>Description</th>
			<th>Media URL</th>
			<th>Subject Id</th>
			
			<th>Edit</th>
			<th>Delete</th>
			
			
		  </tr>
		</thead>
		<!-- {#each batches as batch,ind} -->
		<tr class="w3-hover-shadow">
			<!-- <td>{ind+1}</td> -->
			<td>{lecture.name}</td>
			<td><a class="w3-text-blue">{lecture._id}</a></td>

			<td>{lecture.description}</td>
			<td>{lecture.media}</td>
			<td>{lecture.subject}</td>
			<td><a href="/lectures/edit/{lecture._id}"><button class="w3-button w3-card w3-round"><i class="w3-text-grey fas fa-edit"></i> Edit</button></a></td>
			<!-- <td><button class="w3-text-blue w3-center" on:click={()=>{handleDelete(batch._id)}} >Edit</button></td> -->
			<td> <button on:click={()=>{handleDelete(lecture._id)}} class="w3-button w3-red w3-card w3-round"><i class="w3-text-white fas fa-trash"></i> Delete</button></td>

		</tr>
		<!-- {/each} -->
	  </table>

	  <div id='player'></div>
	  <div >
	  <!-- <button on:click={()=>{switchTab("lectures");}} class="w3-left {tab=="lectures"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block">Lectures</button>
	  <button on:click={()=>{switchTab("tests");}}  class="w3-left {tab=="tests"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block">Tests</button>
	  <button on:click={()=>{switchTab("students");}}  class="w3-left {tab=="students"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block">Stuents</button> -->
	  <button on:click={()=>{switchTab("files");}}  class="w3-left {tab=="files"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block">Files</button>
	</div>
		

		{#if tab=="files"}
		<div>
			<h1 class="w3-xlarge w3-round w3-padding w3-margin "># Files: {lecture.files.length}</h1>
			<input type="text" class="w3-border w3-round w3-padding" bind:value={fileId} placeholder="File Id" />
			<button class="w3-green w3-padding w3-margin w3-card w3-round" on:click={addFileToLecture} >Add</button><br/>
			<FilesList files={lecture.files} />
		</div>
		{/if}

	{:else}
	<p class="w3-center">Loading</p>
	{/if}



</div>

