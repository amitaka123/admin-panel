<script>
	export var body;
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

	
	a{
		text-decoration: none;
	}
	textarea{
		width:80%;
	}
	select{
		width:100%;
	}

	.width{
		width:100%;
		/* background: red; */
	}
	label{
		font-size: 70%;
		color:grey
	}
</style>

<svelte:head>
	<title>Sapper project certificate</title>
</svelte:head>

<h3 class="w3-black w3-round w3-padding width"><span class="w3-text-grey">Single Choice Question</span> : {body._id}</h3>
<div class="width">
	<form>
		
		<h2>Question</h2>{@html atob(body.question)}
			<!-- {#if body.image}
				<h4>Image</h4>
				<img src={body.image} />
			{/if} -->
			


		<hr>
		<h4>Marks</h4>
		{body.positive_marks}
		<br>
	
		<h4>Subejct</h4>
		{body.subject}
		<br>

		<h4>Difficulty</h4>
		{body.difficulty}
		<br>
		<h4>Topic Id</h4>{body.topic}
		<hr>

		<h4>Correct Answer</h4><h2 class="w3-text-green">{body.correct_answer}</h2><hr>
		
		{#if body.options}
		<h4>Options</h4>
		<br>
			{#each body.options as option,i}
			<p>Option {String.fromCharCode(i+65)}</p>
			{#if option.option_type == "text"}
			{@html atob(option.option_value)} 
			
			{:else if option.option_type == "image"}
				<img src={option.option_value} />
			{/if}
			<hr>
			<br>	
			{/each}
		{/if}
		<hr>
		<h4>Solutions</h4>
		
		
		
		{@html atob(body.solution)} 
		<hr>
		
			
		<!-- {#if body.solution_image}
		Solution Image
			<img src={body.solution_image} />
		{/if} -->
		
			<hr>
			</form>
</div>
