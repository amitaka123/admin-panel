<script context="module">
	// var user={};
	import { ApiUrl } from "../_utils/static_store.js";
	var loginPath = get(ApiUrl);
	import { Token } from "../_utils/dynamic_store.js";
	console.log("hello");
	import { get } from "svelte/store";
	export const preload = async function (page, session) {};
</script>

<script>
	export let email, password;
	import { onMount } from "svelte";

	onMount(async () => {
		var token = localStorage.getItem("token");
		if (token && token != "null") {
			location.href = "/dashboard";
		}
	});
	export async function handleSubmit() {
		if (email && password) {
			// const res= await fetch('login.json',{method:'get'});
			const res = await fetch(loginPath + "/panel/authentication/login", {
				mode: "cors",
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (res.status == 200) {
				var response = await res.text();
				let data = await JSON.parse(response);
				if (data.status == "success") {
					let user = data.user;
					let token = user.token;
					console.log(token);
					localStorage.setItem("token", token);
					location.href = "/dashboard";
				} else {
					console.log(data.message);
					alert(data.message);
				}
			} else {
				alert("Login Failed");
				console.log(res.text());
			}
		}
	}
</script>

<svelte:head>
	<title>Gravity Admin Panel</title>
</svelte:head>

<body>
	<section class="flex flex-col md:flex-row h-screen items-center">
		<div
			class="bg-gray-50 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen p-32 mt-60 "
		>
			<img
				src="/images/glogoG.png"
				alt="abcd"
				class="w-fit h-fit object-cover"
			/>
		</div>

		<div
			class="bg-gray-50 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
			flex items-center justify-center border-l-2 border-gray-300"
		>
			<div class="w-full h-100">
				<h1 class="text-xl font-bold">Welcome to Gravity</h1>
				<h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
					Log in to your account
				</h1>

				<form
					class="flex flex-col"
					on:submit|preventDefault={handleSubmit}
				>
					<div>
						<label class="block text-gray-700">Email Address</label>
						<input
							type="email"
							name=""
							id=""
							placeholder="Enter Email Address"
							class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
							autofocus
							autocomplete
							bind:value={email}
							required
						/>
					</div>

					<div class="mt-4">
						<label class="block text-gray-700">Password</label>
						<input
							type="password"
							name=""
							id=""
							placeholder="Enter Password"
							minlength="6"
							class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
					focus:bg-white focus:outline-none"
							bind:value={password}
							required
						/>
					</div>

					<!-- <div class="text-right mt-2">
						<a
							href="/forgot_password"
							class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
							>Forgot Password?</a
						>
					</div> -->

					<button
						type="submit"
						class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
				  px-4 py-3 mt-6">Log In</button
					>
				</form>

				<hr class="my-6 border-gray-300 w-full" />

				<!-- <button
					type="button"
					class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
				>
					<div class="flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							class="w-6 h-6"
							viewBox="0 0 48 48"
							><defs
								><path
									id="a"
									d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
								/></defs
							><clipPath id="b"
								><use
									xlink:href="#a"
									overflow="visible"
								/></clipPath
							><path
								clip-path="url(#b)"
								fill="#FBBC05"
								d="M0 37V11l17 13z"
							/><path
								clip-path="url(#b)"
								fill="#EA4335"
								d="M0 11l17 13 7-6.1L48 14V0H0z"
							/><path
								clip-path="url(#b)"
								fill="#34A853"
								d="M0 37l30-23 7.9 1L48 0v48H0z"
							/><path
								clip-path="url(#b)"
								fill="#4285F4"
								d="M48 48L17 24l-4-3 35-10z"
							/></svg
						>
						<span class="ml-4"> Log in with Google </span>
					</div>
				</button> -->

				<!-- <p class="mt-8">
					Need an account?
					<a
						href="#"
						class="text-blue-500 hover:text-blue-700 font-semibold"
					>
						Create an account
					</a>
				</p> -->

				<p class="text-sm text-gray-500 mt-12 justify-between">
					&copy; Gravity - All Rights Reserved.
				</p>
			</div>
		</div>
	</section>
</body>

<!-- <div class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
	<main
		class="bg-gray-50 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
	>
		
		<section class="mt-10">
			<form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
				<div class="mb-6 pt-3 rounded bg-gray-200">
					
					<input
						type="text"
						id="email"
						class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
						name="email"
						bind:value={email}
					/>
				</div>

				<div class="mb-6 pt-3 rounded bg-gray-200">
					
					<input
						type="password"
						id="password"
						class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
						name="password"
						bind:value={password}
					/>
				</div>

				

				<div class="flex justify-end">
					<a
						href="#"
						class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6"
						>Forgot your password?</a
					>
				</div>
				<button
					class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
					type="submit">Sign In</button
				>
			</form>
		</section>
	</main>
	

	
</div> -->

<p>created by: <a href="https://neoned71.com">neoned71</a></p>

<style>
	/* h1,
	figure,
	p {
		text-align: left;
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
		margin: 0em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	input {
		width: 50%;
	} */

	/* .main {
		background: white;
		padding: 20;
	}

	.body-bg {
		background-color: #9921e8;
		background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
		
	} */
</style>
