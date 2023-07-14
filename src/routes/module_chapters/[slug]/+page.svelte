<script>
	/** @type {import('./$types').PageData} */
	export let data;
	export let moduleChapterId = data.moduleChapterId;
	console.log("moduleChapterID from slug:" + moduleChapterId);

	// import { userInfo } from "os";
	import QuestionsList from "../../../lib/components/lists/module_chapters/questions.svelte";
	// import TestsList from '../../components/Lists/batches/tests.svelte';
	// import StudentsList from '../../components/Lists/batches/students.svelte';
	// import FilesList from '../../components/Lists/batches/files.svelte';

	import { onMount } from "svelte";
	import { Token } from "../../_utils/dynamic_store.js";
	import { ApiUrl } from "../../_utils/static_store.js";
	import { get } from "svelte/store";
	

	let tab = "level_1";
	let moduleChapter;
	let questionId;

	onMount(async () => {
		console.log("mounted");
		// localStorage.setItem("token","some value");

		var token = localStorage.getItem("token");
		if (!token) {
			console.log("yes");
			location.href = "/login";
		}
		Token.set(token);
		var loginPath = get(ApiUrl);
		const res = await fetch(
			loginPath + "/panel/modules/module_chapter/" + moduleChapterId,
			{
				mode: "cors",
				method: "get",
				headers: { Authorization: "Bearer " + token },
			}
		);
		if (res.status == 200) {
			try {
				let response = await res.text();
				console.log(response);
				response = await JSON.parse(response);
				if (response.status == "success") {
					// console.log("successfully grabbed student");
					moduleChapter = response.data;
					if (!moduleChapter.level_1) {
						moduleChapter.level_1 = [];
					}
					if (!moduleChapter.level_2) {
						moduleChapter.level_2 = [];
					}
					if (!moduleChapter.level_3) {
						moduleChapter.level_3 = [];
					}
				}
			} catch (e) {
				console.log("caught");

				console.log(e);
			} finally {
			}
		} else {
			console.log(await res.text());
		}
	});

	async function handleDelete() {
		var token = localStorage.getItem("token");
		var loginPath = get(ApiUrl);
		let res;
		res = await fetch(
			loginPath +
				"/panel/modules/module_chapter_delete/" +
				moduleChapterId,
			{
				mode: "cors",
				method: "post",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			}
		);

		if (res.status == 200) {
			try {
				let response = await res.text();
				response = await JSON.parse(response);
				if (response.status == "success") {
					location.reload();
				} else {
					console.log(response.message);
					alert(response.message);
				}
			} catch (e) {
				console.log("caught");

				console.log(e);
			} finally {
			}
		} else {
			console.log(await res.text());
		}
	}

	async function addQuestionToLevel() {
		var token = localStorage.getItem("token");
		console.log("inside batch delete");
		var loginPath = get(ApiUrl);
		let res;
		if (!questionId || questionId == "" || questionId.length != 24) {
			alert("please enter a valid Question Id");
			return;
		}
		res = await fetch(
			loginPath +
				"/panel/modules/module_chapter_add_question/" +
				moduleChapterId +
				"/" +
				questionId,
			{
				mode: "cors",
				method: "post",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ level: tab }),
			}
		);

		if (res.status == 200) {
			try {
				let response = await res.text();
				response = await JSON.parse(response);
				if (response.status == "success") {
					location.reload();
				} else {
					console.log(response.message);
					alert(response.message);
				}
			} catch (e) {
				console.log("caught");

				console.log(e);
			} finally {
			}
		} else {
			console.log(await res.text());
		}
	}

	function switchTab(tabName) {
		tab = tabName;
	}
</script>

<svelte:head>
	<title>Module-Chapter</title>
</svelte:head>

<div class="container w3-card" style="--template-color:red">
	{#if moduleChapter}
		<h1 class="w3-xxlarge w3-round w3-padding w3-margin">
			Module-Chapter: {moduleChapter.name}
		</h1>

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
		<table class="w3-table-all w3-hoverable" width="100%">
			<thead>
				<tr class="w3-light-grey">
					<th>Id</th>
					<th>Name</th>
					<th>Chapter</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<!-- {#each batches as batch,ind} -->
			<tr class="w3-hover-shadow">
				<td>{moduleChapter._id}</td>
				<td>{moduleChapter.name}</td>
				<td>{moduleChapter.chapter.name}</td>
				<td
					><a
						class="w3-text-blue"
						href="/module_chapters/edit/{moduleChapter._id}">Edit</a
					></td
				>
				<!-- <td><a href="/batches/edit/{batch._id}"><button class="w3-button w3-card w3-round"><i class="w3-text-grey fas fa-edit"></i> Edit</button></a></td> -->
				<!-- <td><button class="w3-text-blue w3-center" on:click={()=>{handleDelete(batch._id)}} >Edit</button></td> -->
				<td>
					<button
						on:click={() => {
							handleDelete(moduleChapter._id);
						}}
						class="w3-button w3-red w3-card w3-round"
						><i class="w3-text-white fas fa-trash" /> Delete</button
					></td
				>
			</tr>
			<!-- {/each} -->
		</table>
		<div>
			<button
				on:click={() => {
					switchTab("level_1");
				}}
				class="w3-left {tab == 'level_1'
					? 'w3-green'
					: ''} w3-inline w3-margin w3-card w3-padding w3-show-inline-block w3-round"
				>Level 1</button
			>
			<button
				on:click={() => {
					switchTab("level_2");
				}}
				class="w3-left {tab == 'level_2'
					? 'w3-green'
					: ''} w3-inline w3-margin w3-card w3-padding w3-show-inline-block w3-round"
				>Level 2</button
			>
			<button
				on:click={() => {
					switchTab("level_3");
				}}
				class="w3-left {tab == 'level_3'
					? 'w3-green'
					: ''} w3-inline w3-margin w3-card w3-padding w3-show-inline-block w3-round"
				>Level 3</button
			>
		</div>
		{#if tab == "level_1"}
			<div>
				<h1 class="w3-xlarge w3-round w3-padding w3-margin">
					# Level 1 Questions: {moduleChapter.level_1.length}
				</h1>
				<input
					type="text"
					class="w3-border w3-round w3-padding"
					bind:value={questionId}
					placeholder="Question Id"
				/>
				<button
					class="w3-green w3-padding w3-margin w3-card w3-round"
					on:click={addQuestionToLevel}>Add</button
				><br />
				<!-- <a href="/lectures/create"><button class=" w3-card w3-margin w3-text-green w3-padding w3-rounded"><i class="fa-solid fa-plus w3-text-green"></i>Create New</button></a> -->
				<QuestionsList
					questions={moduleChapter.level_1}
					{moduleChapterId}
					{tab}
				/>
			</div>
		{/if}

		{#if tab == "level_2"}
			<div>
				<h1 class="w3-xlarge w3-round w3-padding w3-margin">
					# Level 2 Questions: {moduleChapter.level_2.length}
				</h1>
				<input
					type="text"
					class="w3-border w3-round w3-padding"
					bind:value={questionId}
					placeholder="Question Id"
				/>
				<button
					class="w3-green w3-padding w3-margin w3-card w3-round"
					on:click={addQuestionToLevel}>Add</button
				><br />
				<!-- <a href="/lectures/create"><button class=" w3-card w3-margin w3-text-green w3-padding w3-rounded"><i class="fa-solid fa-plus w3-text-green"></i>Create New</button></a> -->
				<QuestionsList
					questions={moduleChapter.level_2}
					{moduleChapterId}
					{tab}
				/>
			</div>
		{/if}

		{#if tab == "level_3"}
			<div>
				<h1 class="w3-xlarge w3-round w3-padding w3-margin">
					# Level 3 Questions: {moduleChapter.level_3.length}
				</h1>
				<input
					type="text"
					class="w3-border w3-round w3-padding"
					bind:value={questionId}
					placeholder="Question Id"
				/>
				<button
					class="w3-green w3-padding w3-margin w3-card w3-round"
					on:click={addQuestionToLevel}>Add</button
				><br />
				<!-- <a href="/lectures/create"><button class=" w3-card w3-margin w3-text-green w3-padding w3-rounded"><i class="fa-solid fa-plus w3-text-green"></i>Create New</button></a> -->
				<QuestionsList
					questions={moduleChapter.level_3}
					{moduleChapterId}
					{tab}
				/>
			</div>
		{/if}
	{:else}
		<p class="w3-center">Loading</p>
	{/if}
</div>

<style>
	* {
		color: rgb(51, 51, 51);
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

	.container {
		width: 100%;
		/* border:1px solid rgb(140, 140, 140); */
		border-radius: 5px;
		margin: 10px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: left;

		/* background: linear-gradient(45deg,rgb(134, 60, 253),var(--template-color)); */
	}
	img {
		display: block;
		width: 150px;
	}
	.certificate {
		font-size: 120px;
		font-family: "MonteCarlo", cursive;
	}
	.organization {
		color: black;
		font-size: 80px;
		font-family: "MonteCarlo", cursive;
	}
	.cont {
		font-family: "MonteCarlo", cursive;
		font-size: 30px;
	}
	.straight {
		font-family: "Merriweather", serif;

		/* font-family: 'MonteCarlo', cursive; */
	}
	.flex {
		margin-top: 30px;
		display: flex;
		align-items: stretch;
	}
	.flexit {
		flex: 1;
		padding: 20px;
	}
	p {
		/* width:100%; */
		margin: 0;
		text-align: left;
	}
	h1 {
		margin: 00px;
	}
	div {
		align-self: left;
		justify-self: left;
	}
	.abs {
		position: absolute;
		top: 120px;
		right: 130px;
	}
	a {
		text-decoration: none;
	}
	label {
		color: #777777;
	}
</style>
