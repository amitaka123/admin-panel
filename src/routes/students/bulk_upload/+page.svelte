<script context="module">
	// import * as timeago from 'timeago.js';
	export async function preload(p,session) {
		// return {timeago:timeago};
		
	}
	
	
</script>
<script>
	import {onMount} from 'svelte';
	// import {Token} from '../../_utils/dynamic_store.js';
	// import {ApiUrl} from '../../_utils/static_store.js';
	// import { get } from 'svelte/store';
	import XCLUpload from '../../_utils/xcl_upload.svelte';
	import StatusList from '../../../lib/components/lists/status_report_bulk_upload.svelte';

	var returnData = null;
	
	//  var loginPath=get(ApiUrl);
	 onMount(async ()=>{
		
	 });
</script>

<style>
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

	.item{
		padding:10px;
		display:block;
		width:100%;
		text-decoration: none;
		margin:1px;
		background-color: rgb(255, 255, 255);
	}
	.item:hover{
		/* background-color: rgb(191, 201, 255); */
		cursor:pointer;
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
		display:block
	}

	h3{
		font-size:300%;
	}
</style>

<h3>Student Data Bulk Upload</h3>
<a href="/content/files/1664023160691.vnd.ms-excel" class="w3-button w3-padding w3-card w3-margin w3-inline">Download Sample Excel </a>

<XCLUpload bind:returnData={returnData}></XCLUpload>

<hr>
<div class=" w3-round">
	<h2 class="w3-blue w3-card w3-round w3-padding">Return Data</h2>
	{#if returnData}
		<StatusList {returnData} />
	{/if}
	<hr>
	
</div>