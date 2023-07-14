<script>
	import ImageUpload from '../_utils/imageUpload.svelte';
	import DataUpload from '../_utils/dataUpload.svelte';
	import {onMount} from 'svelte';
	import {Token} from '../_utils/dynamic_store.js';
	import {ApiUrl} from '../_utils/static_store.js';
	import { get } from 'svelte/store';

	var username=null;
	var phone=null;
	var email=null;
	var password=null;
	var confirmPassword=null;
	var role="staff";
	var permissions = ["question_read", "staff_read", "academic_desk_read", "student_read", "test_read"];
	// var topic = null;
// import { roomId } from '../room/[slug].svelte';
	// export var roomId;

	// var topics = null;
	 var loginPath=get(ApiUrl);
	 onMount(async ()=>{
		var loginPath=get(ApiUrl);
		
		console.log("mounted");
		// localStorage.setItem("token","some value");
		
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);
	});

	async function handleSubmit(){
		var body = new Object;
		body.username=username;
		body.email=email;
		body.role=role;
		body.phone = phone;
		if(role=="staff")
		{
			body.permissions = permissions;
		}
		
		// body.sequence=sequence;
		if(password == confirmPassword)
		{
			body.password = password;
		}
		else
		{
			alert("passwords do not match!");
		}
		console.log(body);
		var token = localStorage.getItem("token");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		const res = await fetch(loginPath+'/panel/staff_create',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});
		if(res.status==200){
			try{
					let response= await res.text();
					//console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						location.href="/staff";
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
			
			// let data = JSON.parse(text);
			
		}
		else{
					console.log(await res.text());
					user.email="no logged";
					
				}
	}
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

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
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	input[type=checkbox]{
		display:inline;
		width:50px;
	}
</style>

<svelte:head>
	<title>Gravity</title>
</svelte:head>


<h4 class="w3-black w3-round w3-card w3-padding"> Add a staff member! </h4>
<form on:submit|preventDefault={handleSubmit} >
	<input class="w3-input w3-border w3-round" type="text" bind:value={username} placeholder="User Name(*)" required/>
	<input class="w3-input w3-border w3-round" type="email" bind:value={email} placeholder="Email of the staff member(*)" required/>
	<input class="w3-input w3-border w3-round" type="phone" bind:value={phone} placeholder="Phone(*)" required/>
	
	<input class="w3-input w3-border w3-round" type="password" bind:value={password} placeholder="Password of the staff member(*)" required/>
	<input class="w3-input w3-border w3-round" type="password" bind:value={confirmPassword} placeholder="Confirm Password(*)" required/>
	<select class="w3-input w3-border w3-round w3-margin" bind:value={role}>
		<option  value="">Role(*)</option>
		<option  value="admin">Administrator</option>
		<option value="staff">Staff Member</option>
	</select>

	{#if role == "staff"}
	<h4>Permissions</h4>
	<label>Question Read</label>
	<input type="checkbox" bind:group={permissions} value="question_read"><br>
	<label>Question create</label>
	<input type="checkbox" bind:group={permissions} value="question_create"><br>

	<label>Test Read</label>
	<input type="checkbox" bind:group={permissions} value="test_read"><br>
	<label>Test create</label>
	<input type="checkbox" bind:group={permissions} value="test_create"><br>

	<label>Staff Read</label>
	<input type="checkbox" bind:group={permissions} value="staff_read"><br>
	<label>Staff create</label>
	<input type="checkbox" bind:group={permissions} value="staff_create" disabled><br>

	<label>Students Read</label>
	<input type="checkbox" bind:group={permissions} value="student_read"><br>
	<label>Students create</label>
	<input type="checkbox" bind:group={permissions} value="student_create"><br>


	<label>Academic Material Read</label>
	<input type="checkbox" bind:group={permissions} value="academic_desk_read"><br>
	<label>Academic Material create</label>
	<input type="checkbox" bind:group={permissions} value="academic_desk_create"><br>

	{/if}
	<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Done">

</form>

<!-- <p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.{username} {password}</strong></p> -->
<!-- <p>saasdad</p> -->