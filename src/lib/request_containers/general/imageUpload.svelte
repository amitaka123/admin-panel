<script>
	export var avatar,url,uploadedPath,edit=true;
	console.log("avatar"+avatar);
	// get
	let fileinput;
	import FormData from 'form-data';
	import { get } from 'svelte/store';

	let authStore;
	
	
	const onFileSelected = async (e) => {
	authStore = (await import('$lib/stores/authentication')).authStore;
	console.log(get(authStore).role);
	if(!get(authStore).isAuthenticated())
	{
		console.log("unauthenticated")
		location.href="/";
	}
	var formData = new FormData();
	let image = e.target.files[0];
	console.log(e);
	if(!image)
	{
		console.log("skipping no image chage");
		return;
	}
	let token = get(authStore).token;
	//fetch upload of the image as the logo of the company!
	formData.append("image", image);

	let options = {
		method: 'POST',
		body: formData,
		mode:'cors',
		headers:{'Authorization':'Bearer '+token}
		// If you add this, upload won't work
		// headers: {
		//   'Content-Type': 'multipart/form-data',
		// }
		};
    
    var res = await fetch(url, options );
	if(res.status==200)
	{
		let reader = new FileReader();
		// console.log(image);
            reader.readAsDataURL(image);
            reader.onload = e => {
                avatar = e.target.result
            };
			// console.log(res);
			let response = await res.text();
			try{
				let data = await JSON.parse(response);
				if(data.status == "success")
				{
					// url = data.data;
					uploadedPath = data.data;
					avatar = uploadedPath;
					console.log("uploaded at: "+uploadedPath);
				}
				else{
					alert("Some error has occured, see console for more information.");
					console.log(data);
				}
			}
			catch(e){
				alert("Some error has occured, see console for more information.")
				console.log(e);
			}
	}
	else{
		let text = await res.text();
		try{
			
			text = JSON.parse(text);
			alert(text);
		}
		catch(e){
			alert("some error occured");
			console.log(e);
		}
	}


            
}
	
</script>
<div id="app">
        {#if avatar}
        <img class="avatar" src="{avatar}" alt="" />
        {:else}
        <img class="avatar" src="/dowser.png" alt="" /> 
        {/if}

		{#if edit}
		<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
        <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
		{/if}
</div>
<style>
	#app{
	display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
}
 
	.upload{
		display:flex;
	height:50px;
		width:50px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:200px;
		width:200px;
	}
</style>

 