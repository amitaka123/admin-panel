<script>
	
    /** @type {import('./$types').PageData} */
    export let data;
  export let questionId = data.questionId;
  console.log("studentID from slug:" + questionId);

	

	import {onMount} from 'svelte';
	import {Token} from '../../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../../_utils/static_store.js';
	import { get } from 'svelte/store';
	import { bubble } from 'svelte/internal';
	import SCQ from '../../../_utils/_questions/_scq.svelte';
	import MCQ from '../../../_utils/_questions/_mcq.svelte';
	import INT from '../../../_utils/_questions/_int.svelte';
	import INTR from '../../../_utils/_questions/_int_range.svelte';
	import FIB from '../../../_utils/_questions/_fib.svelte';
	import FIBR from '../../../_utils/_questions/_fib_range.svelte';


	
	let question;
	var token;
	var loginPath;
	var jsonQuestion;


	// let day= date.getDay();
	
	onMount(async ()=>{
		console.log(questionId);
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
		const res = await fetch(loginPath+'/panel/question_get/'+questionId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					jsonQuestion = response;
					
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("got questions")
						question = response.data;
						console.log(question);
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
</style>

<div class="container w3-card " style="--template-color:red">
		{#if question}
			{#if question.question_type=="scq"}
				<SCQ edit={true} body={question} ></SCQ>	
			{/if}
			{#if question.question_type=="mcq"}
				<MCQ edit={true} body={question} ></MCQ>	
			{/if}
			{#if question.question_type=="fill_in_blanks" && question.question_subtype=="simple"}
				<FIB edit={true} body={question} ></FIB>	
			{/if}
			{#if question.question_type=="fill_in_blanks" && question.question_subtype=="range"}
				<FIBR edit={true} body={question} ></FIBR>	
			{/if}
			{#if question.question_type=="integer" && question.question_subtype=="simple"}
				<INT edit={true} body={question} ></INT>	
			{/if}
			{#if question.question_type=="integer" && question.question_subtype=="range"}
				<INTR edit={true} body={question} ></INTR>	
			{/if}
		{/if}
</div>
