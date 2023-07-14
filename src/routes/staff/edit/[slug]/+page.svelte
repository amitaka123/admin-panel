<script>

	/** @type {import('./$types').PageData} */
export let data;
export let staffId = data.staffId;
console.log("staffID from slug:" + staffId);
	

	

	import {onMount} from 'svelte';
	import {Token} from '../../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../../_utils/static_store.js';
	import { get } from 'svelte/store';
	import { bubble } from 'svelte/internal';
	// import SCQ from '../../_utils/_questions/_scq.svelte';
	
	let staff;
	// let date= new Date(certificate.timestamp);
	// let d= new Date(date).toLocaleDateString('en-US', {
	// 	day: '2-digit',
	// 	month: '2-digit',
	// 	year: 'numeric',
	// 	});
	var token;
	var loginPath;
	var jsonQuestion;


	// let day= date.getDay();
	
	onMount(async ()=>{
		console.log(staffId);
		console.log("mounted");
		// localStorage.setItem("token","some value");
		
		 token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);
		 loginPath=get(ApiUrl);

		// console.log(loginPath+'/auth/whoami');
		const res = await fetch(loginPath+'/panel/staff_get/'+staffId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					jsonQuestion = response;
					
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("got questions")
						staff = response.data;
						console.log(staff);
					}
					else
					{
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
			
			// let data = JSON.parse(text);
			
		}
		else{
					console.log(await res.text());
					// user.email="no logged";
					
				}
		// 
	});


	async function handleSubmit(){
		
		// console.log(body);
		var token = localStorage.getItem("token");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		console.log(staff);
		const res = await fetch(loginPath+'/panel/staff_edit',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(staff)});
		if(res.status==200){
			try{
					let response= await res.text();
					//console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						alert("Saved Successfully");
						// location.href="/staff";
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
		
			
			// let data = JSON.parse(text);
			
		}
		else{
					console.log(await res.text());
					// user.email="no logged";
					
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
		align-items: center;

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
		width:100%;
		margin:0;
		text-align: center;
	}
	h1{
		margin:300px;
	}
	h2,h3{
		font-size:300%;
	}
</style>

<div class="w3-card " style="--template-color:red">
		{#if staff}
		<h4 class="w3-black w3-round w3-card w3-padding"> Edit a staff member! </h4>
		<form on:submit|preventDefault={handleSubmit} >
			<input class="w3-input w3-border w3-round" type="text" bind:value={staff.username} placeholder="User Name(*)"/>
			<input class="w3-input w3-border w3-round" type="email" bind:value={staff.email} placeholder="Email of the staff member(*)" disabled/>
			<input class="w3-input w3-border w3-round" type="password" bind:value={staff.password} placeholder="New Password(*)"/>
			<select class="w3-input w3-border w3-round w3-margin" bind:value={staff.role}>
				<option  value="">Role(*)</option>
				<option  value="admin">Administrator</option>
				<option value="staff">Staff Member</option>
			</select>
		
			{#if staff.role == "staff"}
			<h4>Permissions</h4>
			<label>Question Read</label>
			<input type="checkbox" bind:group={staff.permissions} value="question_read"><br>
			<label>Question create</label>
			<input type="checkbox" bind:group={staff.permissions} value="question_create"><br>
		
			<label>Test Read</label>
			<input type="checkbox" bind:group={staff.permissions} value="test_read"><br>
			<label>Test create</label>
			<input type="checkbox" bind:group={staff.permissions} value="test_create"><br>
		
			<label>Staff Read</label>
			<input type="checkbox" bind:group={staff.permissions} value="staff_read"><br>
			<label>Staff create</label>
			<input type="checkbox" bind:group={staff.permissions} value="staff_create" disabled><br>
		
			<label>Students Read</label>
			<input type="checkbox" bind:group={staff.permissions} value="student_read"><br>
			<label>Students create</label>
			<input type="checkbox" bind:group={staff.permissions} value="student_create"><br>
		
		
			<label>Academic Material Read</label>
			<input type="checkbox" bind:group={staff.permissions} value="academic_desk_read"><br>
			<label>Academic Material create</label>
			<input type="checkbox" bind:group={staff.permissions} value="academic_desk_create"><br>
		
			{/if}
			<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Save">
		
		</form>
		
		{/if}
</div>
