<script>

/** @type {import('./$types').PageData} */
export let data;
export let batchId = data.batchId;
console.log("batchID from slug:" + batchId);

// import { userInfo } from "os";
import LecturesList from '../../../lib/components/lists/batches/lectures.svelte';
import TestsList from '../../../lib/components/lists/batches/tests.svelte';
import StudentsList from '../../../lib/components/lists/batches/students.svelte';
import FilesList from '../../../lib/components/lists/batches/files.svelte';
import ModulesList from '../../../lib/components/lists/batches/modules.svelte';




	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	

	let tab = "lectures";
	let batch;
	let lectureId,testId,studentId,fileId,moduleId;
	
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
		const res = await fetch(loginPath+'/panel/batches/batch_get/'+batchId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("successfully grabbed student");
						batch = response.data;
						if(!batch.lectures){
							batch.lectures = [];
						}
						if(!batch.students){
							batch.students = [];
						}
						if(!batch.tests){
							batch.tests = [];
						}
						if(!batch.files){
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
		res = await fetch(loginPath+'/panel/batch_delete/'+batchId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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

	async function addLectureToBatch(){
		// body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		console.log("inside batch delete");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		if(!lectureId || lectureId=="" || lectureId.length != 24){
			alert("please enter a valid Lecture Id");
			return;
		}
		res = await fetch(loginPath+'/panel/batches/batch_add_lecture/'+batchId+"/"+lectureId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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

	async function addStudentToBatch(){
		// body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		console.log("inside batch delete");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		if(!studentId || studentId=="" || studentId.length != 24){
			alert("please enter a valid Lecture Id");
			return;
		}
		res = await fetch(loginPath+'/panel/batches/batch_add_student/'+batchId+"/"+studentId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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

	async function addTestToBatch(){
		// body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		// console.log("inside testId delete");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		if(!testId || testId=="" || testId.length != 24){
			alert("please enter a valid Lecture Id");
			return;
		}
		res = await fetch(loginPath+'/panel/batches/batch_add_test/'+batchId+"/"+testId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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

	async function addFileToBatch(){
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
		res = await fetch(loginPath+'/panel/batches/batch_add_file/'+batchId+"/"+fileId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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

	async function addModuleToBatch(){
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		if(!moduleId || moduleId=="" || moduleId.length != 24){
			alert("please enter a valid Module Id");
			return;
		}
		res = await fetch(loginPath+'/panel/batches/batch_add_module/'+batchId+"/"+moduleId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

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
	<title>Batch</title>
</svelte:head>


<div class="container w3-card " style="--template-color:red">
	{#if batch}
	<h1 class="w3-xxlarge w3-round w3-padding w3-margin ">Batch: {batch.name}</h1>
	
		
	
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
			<th>Stream</th>
			<th>Branch</th>
			<th>Class</th>
			<th>Batch Id</th>
			<th>Edit</th>
			<th>Delete</th>
			
			
		  </tr>
		</thead>
		<!-- {#each batches as batch,ind} -->
		<tr class="w3-hover-shadow">
			<!-- <td>{ind+1}</td> -->
			<td>{batch.name}</td>
			<td>{batch.stream.name}</td>
			<td>{batch.branch.name}</td>
			<td>{batch.class_number.toString()}</td>
			<td><a class="w3-text-blue" href="/batches/{batch._id}">{batch._id}</a></td>
			<td><a href="/batches/edit/{batch._id}"><button class="w3-button w3-card w3-round"><i class="w3-text-grey fas fa-edit"></i> Edit</button></a></td>
			<!-- <td><button class="w3-text-blue w3-center" on:click={()=>{handleDelete(batch._id)}} >Edit</button></td> -->
			<td> <button on:click={()=>{handleDelete(batch._id)}} class="w3-button w3-red w3-card w3-round"><i class="w3-text-white fas fa-trash"></i> Delete</button></td>

		</tr>
		<!-- {/each} -->
	  </table>
	  <div >
	  <button on:click={()=>{switchTab("lectures");}} class="w3-left {tab=="lectures"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block w3-round">Lectures</button>
	  <button on:click={()=>{switchTab("tests");}}  class="w3-left {tab=="tests"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block w3-round">Tests</button>
	  <button on:click={()=>{switchTab("students");}}  class="w3-left {tab=="students"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block w3-round">Students</button>
	  <button on:click={()=>{switchTab("files");}}  class="w3-left {tab=="files"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block w3-round">Files</button>
	  <button on:click={()=>{switchTab("modules");}}  class="w3-left {tab=="modules"?"w3-green":""} w3-inline w3-margin w3-card w3-padding w3-show-inline-block w3-round">Modules</button>

	</div>
		{#if tab=="lectures"}
		<div>
			<h1 class="w3-xlarge w3-round w3-padding w3-margin "># Lectures: {batch.lectures.length}</h1>
			<input type="text" class="w3-border w3-round w3-padding" bind:value={lectureId} placeholder="Lecture Id" />
			<button class="w3-green w3-padding w3-margin w3-card w3-round" on:click={addLectureToBatch} >Add</button><br/>
			<!-- <a href="/lectures/create"><button class=" w3-card w3-margin w3-text-green w3-padding w3-rounded"><i class="fa-solid fa-plus w3-text-green"></i>Create New</button></a> -->
			<LecturesList lectures={batch.lectures} {batchId} />
		</div>
		{/if}

		{#if tab=="students"}
		<div>
			<h1 class="w3-xlarge w3-round w3-padding w3-margin "># Students: {batch.students.length}</h1>
			<input type="text" class="w3-border w3-round w3-padding" bind:value={studentId} placeholder="Student Id" />
			<button class="w3-green w3-padding w3-margin w3-card w3-round" on:click={addStudentToBatch} >Add</button><br/>
			<!-- <a href="/students/create"><button class=" w3-card w3-margin w3-text-green w3-padding w3-rounded"><i class="fa-solid fa-plus w3-text-green"></i>Create New</button></a> -->
			<StudentsList students={batch.students} {batchId}/>

		</div>
		{/if}

		{#if tab=="tests"}
		<div>
			<h1 class="w3-xlarge w3-round w3-padding w3-margin "># Tests: {batch.tests.length}</h1>
			<input type="text" class="w3-border w3-round w3-padding" bind:value={testId} placeholder="Test Id" />
			<button class="w3-green w3-padding w3-margin w3-card w3-round" on:click={addTestToBatch} >Add</button><br/>
			<!-- <a href="/tests/create"><button class=" w3-card w3-margin w3-text-green w3-padding w3-rounded"><i class="fa-solid fa-plus w3-text-green"></i>Create New</button></a> -->
			<TestsList tests={batch.tests} {batchId} />
		</div>
		{/if}

		{#if tab=="files"}
		<div>
			<h1 class="w3-xlarge w3-round w3-padding w3-margin "># Files: {batch.files.length}</h1>
			<input type="text" class="w3-border w3-round w3-padding" bind:value={fileId} placeholder="File Id" />
			<button class="w3-green w3-padding w3-margin w3-card w3-round" on:click={addFileToBatch} >Add</button><br/>
			<!-- <a href="/files/create"><button class=" w3-card w3-margin w3-text-green w3-padding w3-rounded"><i class="fa-solid fa-plus w3-text-green"></i>Create New</button></a> -->
			<FilesList files={batch.files} {batchId} />

		</div>
		{/if}

		{#if tab=="modules"}
		<div>
			<h1 class="w3-xlarge w3-round w3-padding w3-margin "># Modules: {batch.modules.length}</h1>
			<input type="text" class="w3-border w3-round w3-padding" bind:value={moduleId} placeholder="Module Id" />
			<button class="w3-green w3-padding w3-margin w3-card w3-round" on:click={addModuleToBatch} >Add</button><br/>
			<!-- <a href="/files/create"><button class=" w3-card w3-margin w3-text-green w3-padding w3-rounded"><i class="fa-solid fa-plus w3-text-green"></i>Create New</button></a> -->
			<ModulesList modules={batch.modules} {batchId} />

		</div>
		{/if}

	{:else}
	<p class="w3-center">Loading</p>
	{/if}



</div>

