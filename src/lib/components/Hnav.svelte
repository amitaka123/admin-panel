<script context="module">
	export const preload = async function( page, session) {
		// var { user } = session;
		// console.log(user);
		return { user };
	}
</script>
<script>
	// export let user;
	export let segment;
	import {ApiUrl} from '../../routes/_utils/static_store.js';
	import {Token} from '../../routes/_utils/dynamic_store.js';
	import { get } from 'svelte/store';

	var token=null;
	Token.subscribe(a => token=a);

	//  var logoutPath=get(ApiUrl);

	async function logout(){
		localStorage.removeItem("token");
		location.href='/login';
	}
	// }
</script>

<style>
	[aria-current] {
		/* background:green; */
		color:black;
		
		border:0px solid gray;
		box-shadow: 0 0 2px;
		/* background:rgb(0,0,0); */

	}
	li{
		
		color:gray;
	}

	.sticky{
		position: -webkit-sticky;
		position: sticky;
		top: 0;
	}
</style>

<nav class="nav w3-padding sticky border-r-2 ">
	<img class="w3-padding" src="/images/glogoG.png" />
	<!-- <p class="w3-heading w3-text-teal" style="font-size:400%">Gravity</p> -->
	<hr>
	<div class="lft">
		
		<ul>
			<a class="  w3-round"  href="/dashboard"><li class="w3-hover-blue w3-padding w3-round" aria-current="{segment === "dashboard" ? 'page' : undefined}"><i class="fa-solid fa-gauge-high"></i>  Dashboard</li></a><hr>
			<a class="  w3-round"  href="/students"><li class="w3-hover-blue w3-padding w3-round" aria-current="{segment === "dashboard" ? 'page' : undefined}"><i class="fa-solid fa-user"></i> Students </li></a><hr>

			<!-- <a class="  w3-round"  href="/students/">  <li class="w3-padding w3-hover-blue w3-round" aria-current="{segment === "students" ? 'page' : undefined}"><i class="fa-solid fa-user"></i>  Students</li></a><hr> -->
			<a class=" " href="/tests/"> <li class="w3-padding w3-hover-blue w3-round w3-padding"  aria-current="{segment === "tests" ? 'page' : undefined}" ><i class="fa-solid fa-vials"></i>  Tests</li></a><hr>
			<a class="" href="/questions/"><li  class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "questions" ? 'page' : undefined}" ><i class="fa-solid fa-book-open"></i>  Questions</li></a><hr>
			<a class=" " href="/chapters/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "chapters" ? 'page' : undefined}" ><i class="fa-solid fa-book-open-reader"></i>  Chapters,Topics & Subtopics</li></a><hr>
			<a class=" " href="/staff/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "staff" ? 'page' : undefined}" ><i class="fa-solid fa-users"></i>  Staff</li></a><hr>
			<a  href="/packages/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "packages" ? 'page' : undefined}" ><i class="fa-regular fa-paste"></i>  Packages</li></a><hr>
			<a  href="/exams/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "exams" ? 'page' : undefined}" ><i class="fa-solid fa-passport"></i>  Exams</li></a><hr>			
			<a  href="/comprehensions/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "comprehensions" ? 'page' : undefined}" ><i class="fa fa-book"></i>  Comprehensions</li></a><hr>
			<a  href="/instructions/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "comprehensions" ? 'page' : undefined}" ><i class="fa fa-book"></i>  Instructions</li></a><hr>
			<a  href="/stream/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "stream" ? 'page' : undefined}" ><i class="fa-solid fa-bars-staggered"></i>  Streams</li></a><hr>
			<a  href="/subjects/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "subjects" ? 'page' : undefined}" ><i class="fa-solid fa-shapes"></i>  Subjects</li></a><hr>
			<a  href="/batches/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "batches" ? 'page' : undefined}" ><i class="fa-solid fa-laptop-file"></i>  Batches</li></a><hr>
			<a  href="/lectures/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "lectures" ? 'page' : undefined}" ><i class="fa-solid fa-chalkboard-user"></i>  Lectures</li></a><hr>
			<a  href="/modules/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "modules" ? 'page' : undefined}" ><i class="fa-solid fa-laptop-file"></i>  Modules</li></a><hr>
			<a  href="/module_chapters/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "module_chapters" ? 'page' : undefined}" ><i class="fa-solid fa-laptop-file"></i>  Module-Chapters</li></a><hr>
			

			<a  href="/branch/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "branch" ? 'page' : undefined}" ><i class="fa-solid fa-graduation-cap"></i>  Branches</li></a><hr>
			<a  href="/marking_schemes/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "marking_scheme" ? 'page' : undefined}" ><i class="fa-solid fa-marker"></i>  Marking Schemes</li></a><hr>
			<a class=" " href="/files/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "files" ? 'page' : undefined}" ><i class="fa-solid fa-file"></i>  Files</li></a><hr>

			<a class=" " href="/academic_files/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "academic_files" ? 'page' : undefined}" ><i class="fa-solid fa-file"></i>  -- Academic Files</li></a><hr>
			<!-- <a class="  w3-round"  href="/students/batches">  <li class="w3-padding w3-hover-blue w3-round" aria-current="{segment === "students" ? 'page' : undefined}"><i class="fa-solid fa-user"></i>  Batches</li></a><hr> -->
			<!-- <a class=" " href="/tests/"> <li class="w3-padding w3-hover-blue w3-round w3-padding"  aria-current="{segment === "tests" ? 'page' : undefined}" ><i class="fa-solid fa-vials"></i>  Tests</li></a><hr>
			<a class="" href="/questions/"><li  class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "questions" ? 'page' : undefined}" ><i class="fa-solid fa-book-open"></i>  Questions</li></a><hr>
			<a class=" " href="/chapters/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "chapters" ? 'page' : undefined}" ><i class="fa-solid fa-book-open-reader"></i>  Chapters,Topics & Subtopics</li></a><hr>
			<a class=" " href="/staff/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "staff" ? 'page' : undefined}" ><i class="fa-solid fa-users"></i>  Staff</li></a><hr>
			<a  href="/packages/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "packages" ? 'page' : undefined}" ><i class="fa-regular fa-paste"></i>  Packages</li></a><hr>
			<a  href="/exams/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "exams" ? 'page' : undefined}" ><i class="fa-solid fa-passport"></i>  Exams</li></a><hr>			
			<a  href="/comprehensions/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "comprehensions" ? 'page' : undefined}" ><i class="fa fa-book"></i>  Comprehensions</li></a><hr>
			<a  href="/stream/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "stream" ? 'page' : undefined}" ><i class="fa-solid fa-bars-staggered"></i>  Streams</li></a><hr>
			<a  href="/subjects/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "subjects" ? 'page' : undefined}" ><i class="fa-solid fa-shapes"></i>  Subjects</li></a><hr>
			<a  href="/batches/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "batches" ? 'page' : undefined}" ><i class="fa-solid fa-laptop-file"></i>  Batches</li></a><hr>
			<a  href="/lectures/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "lectures" ? 'page' : undefined}" ><i class="fa-solid fa-chalkboard-user"></i>  Lectures</li></a><hr>

			<a  href="/branch/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "branch" ? 'page' : undefined}" ><i class="fa-solid fa-graduation-cap"></i>  Branches</li></a><hr>
			<a  href="/marking_schemes/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "marking_scheme" ? 'page' : undefined}" ><i class="fa-solid fa-marker"></i>  Marking Schemes</li></a><hr>
			<a class=" " href="/files/"><li class="w3-hover-blue w3-round w3-padding" aria-current="{segment === "files" ? 'page' : undefined}" ><i class="fa-solid fa-file"></i>  Files</li></a><hr> -->
		</ul>
	</div>
	
	<div class="rgt">
		<hr>
		<ul>
			<a class="w3-padding  w3-round w3-hover-text-white"  href="." on:click={logout}><li class="w3-hover-red  w3-margin w3-text-white w3-grey w3-round w3-padding w3-hover-shadow "><i class="fa-solid fa-arrow-right-from-bracket"></i>  Logout</li></a>
		</ul>
	</div>
</nav>
