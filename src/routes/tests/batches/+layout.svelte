<script>
	// import "../app.css";
	import { Modals, closeModal } from 'svelte-modals';
  import Footer from "$lib/components/footer.svelte";
  
  import { onMount } from 'svelte';
  import LoggedInNavigation from "$lib/components/navigation_bars/students.svelte";
//   import MainNavigation from "$lib/components/main_navigation.svelte";
	let authStore;
	onMount(_initialization);
	async function _initialization(){
	  authStore = (await import('$lib/stores/authentication')).authStore;
	}
  </script>
  
  <style>
	.backdrop {
	  position: fixed;
	  top: 0;
	  z-index: 30;
	  bottom: 0;
	  right: 0;
	  left: 0;
	  background: rgba(0,0,0,0.50)
	}
	a {
		font-size: .8em;
	}
  </style>

<LoggedInNavigation />
<div class="flex " >
	<ul class="menu bg-base-100 w-56 p-2 flex-5 shadow-xl">
		<!-- <li class="menu-title">
		  <span>Main Page</span>
		</li> -->
		<li class="bordered"><a><i class="fa-solid fa-book-open-reader"></i> Study</a></li>
		<li><a><i class="fa-solid fa-person-chalkboard"></i> Batches</a></li>
		<li><a><i class="fa-solid fa-building-columns"></i> Gravity Centres</a></li>
		<li><a><i class="fa-solid fa-shapes"></i> Gravity Skills</a></li>
		<li><a><i class="fa-solid fa-book"></i> Library</a></li>
		<li><a><i class="fa-solid fa-vials"></i> Test Series</a></li>
		<!-- <li class="menu-title">
		  <span>Academics</span>
		</li> -->
		<li><a><i class="fa-solid fa-store"></i> Gravity Stores</a></li>
		<li><a><i class="fa-solid fa-trophy"></i> Champions League</a></li>
		<li><a><i class="fa-solid fa-square-poll-vertical"></i> Our Results</a></li>
		<li><a><i class="fa-solid fa-square-rss"></i> Feeds</a></li><hr>
		<li><a><i class="fa-solid fa-phone"></i> ContactUs</a></li>
		<li><a><i class="fa-solid fa-address-card"></i> About us</a></li>
	</ul>

	<div class="flex-1">
		<slot />
	</div>


</div>

  <!-- {#if $authStore && $authStore.isAuthenticated()}
	  <LoggedInNavigation />
  {/if} -->


  