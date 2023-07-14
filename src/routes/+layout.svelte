<script>
	import "../app.css";
	import { Modals, closeModal } from "svelte-modals";
	import Hnav from "../lib/components/Hnav.svelte";
	import Footer from "$lib/components/footer.svelte";
	import { page } from "$app/stores";

	import { onMount } from "svelte";
	import LoggedInNavigation from "$lib/components/logged_in_navigation.svelte";
	import MainNavigation from "$lib/components/main_navigation.svelte";
	let authStore;

	onMount(_initialization);
	async function _initialization() {
		authStore = (await import("$lib/stores/authentication")).authStore;
		console.log($page.url.pathname);
	}
</script>

<Modals>
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<!-- <MainNavigation /> -->
<!-- {#if $authStore && $authStore.isAuthenticated()}
	  <LoggedInNavigation />
	{/if} -->

<main class=" flex flex-row">
	{#if $page.url.pathname != "/login" && $page.url.pathname != "/" && $page.url.pathname != "/forgot_password" && $page.url.pathname != "/reset_password"}
		<div class="w-1/4 p-2">
			<Hnav segment={$page.url.pathname} />
		</div>
	{/if}

	<div class="w-3/4">
		<slot />
	</div>
</main>

<!-- <div class="w3-rest" data-theme="emerald"> <slot /></div> -->

<!-- <Footer />  -->

<!-- <script> -->
<!-- // import Nav from '../components/Nav.svelte';
	import Hnav from '../lib/components/Hnav.svelte';
	
//	import "../tailwind_i.css";
	export let segment;
	// console.log(segment.indexOf("certificate")); -->
<!-- </script> -->

<!-- <style>
	main {
		position: relative;
		width: 100%;
		background-color: white;
		padding: 0em;
		margin: 0 auto;
		/* box-sizing: border-box; */
	}
	.nav{
		max-width:300px;
		position:sticky;
		top:0;
	}

	h1{
		font-size:300%;
	}
	h2{
		font-size:200%;
	}
	h3{
		font-size:150%;
	}

	.slot{
		padding:0em;
		/* height:100; */
		overflow:scroll;

	}
</style> -->
<!-- <link rel="stylesheet" href="index.css" /> -->

<!-- {#if (segment != "login" && segment != "register" && !(segment.indexOf("certificate")== 0 && segment.indexOf("certificates")<0 ))} -->
<!-- {#if segment != "login"}
<Nav {segment}/>
{/if} -->

<!-- {/if} -->
<!-- <main class="w3-row">
	{#if segment != "login"}
	<div class="w3-col nav"> 
	<Hnav  {segment} />
	</div>
	{/if}

	<div class="w3-rest slot w3-padding">
	<slot></slot>
	</div>
</main> -->

<style>
	.backdrop {
		position: fixed;
		top: 0;
		z-index: 30;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
