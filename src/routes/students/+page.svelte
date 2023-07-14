<script>
	// import ImageUpload from '../_utils/imageUpload.svelte';
	// import DataUpload from '../_utils/dataUpload.svelte';

	// import StudentsList from "../../lib/components/lists/students.svelte";
    import StudentPicker from "../_utils/_students/student_picker.svelte";
	import { onMount } from "svelte";
	import { Token } from "../_utils/dynamic_store.js";

	import { ApiUrl } from "../_utils/static_store.js";
	import { get } from "svelte/store";
	// import { roomId } from '../room/[slug].svelte';
	// export var roomId;

	var students = null;
	var loginPath = get(ApiUrl);
	onMount(async () => {
		console.log("mounted");
		// localStorage.setItem("token","some value");

		var token = localStorage.getItem("token");
		// if(!token)
		// {
		// 	console.log("yes");
		// 	location.href="/login";
		// }
		// Token.set(token);

		// console.log(loginPath+'/auth/whoami');
		const res = await fetch(loginPath + "/panel/students", {
			mode: "cors",
			method: "get",
			headers: { Authorization: "Bearer " + token },
		});
		if (res.status == 200) {
			try {
				let response = await res.text();
				console.log(response);
				response = await JSON.parse(response);
				students = response.data;
			} catch (e) {
				console.log("caught");

				console.log(e);
			}

			// let data = JSON.parse(text);
		} else {
			console.log(await res.text());
			user.email = "no logged";
		}
		//
	});
</script>

<!-- <style>
	h1, figure, p {
		text-align: center;
		margin: 0;
	}

	h1 {
		/* font-size: 2.8em; */
		text-transform: uppercase;
		font-weight: 700;
		margin:5px;
		/* font-family: 'MonteCarlo', cursive; */
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	
	p{
		text-align: left;
		/* font-family: 'Merriweather', serif; */
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
	a{
		text-decoration: none;
	}

	img{
		width:100px;
	}

	.item{
	overflow:scroll;
	}
	h1{
		font-size:300%;
	}
	h2,h3{
		font-size:300%;
	}
</style> -->

<svelte:head>
	<title>Gravity</title>
</svelte:head>


	<h3 class=" text-5xl">Students</h3>
	<div class="grid-container w3-round" style="--template-color:red">
		<a
			class="w3-button w3-round w3-card w3-hover-green w3-margin"
			href="/students/create">Create a Student</a
		>
		<a
			class="w3-button w3-round w3-card w3-hover-green w3-margin"
			href="/students/bulk_upload">Bulk Upload</a
		>
	</div>

	<!-- <a href="/create_staff">
	<button class="w3-button w3-border w3-round">Add new <i class="w3-text-grey fas fa-plus"></i></button>
</a> -->

	<hr />
	<div class="grid-container w3-round">
		<!-- {#if students && students.length >0}
	<StudentsList {students} />
	{/if} -->

		<StudentPicker picker={false} />
	</div>

