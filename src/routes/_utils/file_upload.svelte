<script>
	export var avatar,url;
	console.log("avatar"+avatar);
	let fileinput;
	import FormData from 'form-data';
	// import { get } from 'svelte/store';
	// import store from '$lib/stores/store.js';
	let authStore;
	
	
	
	const onFileSelected = async (e) => {
	// authStore = (await import('$lib/stores/authentication')).authStore;
	var formData = new FormData();
	let gFile = e.target.files[0];
	console.log(e);
	if(!gFile)
	{
		console.log("No file selected");
		return;
	}
	// let token = get(authStore).token;
    let token = localStorage.getItem("token");
	//fetch upload of the image as the logo of the company!
	formData.append("g_file", gFile);

	const options = {
		method: 'POST',
		body: formData,
		mode:'cors',
		headers:{'Authorization':'Bearer '+token}
		};
    
    var res = await fetch(`/api/panel/files/single_file_upload`, options);
	if(res.status==200)
	{
		
		// let reader = new FileReader();
        //     reader.readAsDataURL(image);
        //     reader.onload = e => {
        //          avatar = e.target.result
        //     };
			// console.log(res);
			let response = await res.text();
			try{
				let data = await JSON.parse(response);
				if(data.status == "success")
				{
					url = data.data;
					console.log("url: "+url);
					location.reload();
					
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
			
		}
		catch(e){
			alert("some error occured");
			console.log(e);
		}
	}


            
}
	
</script>
<div id="app">
        <!-- {#if avatar}
        <img class="avatar" src="{avatar}" alt="avatar" />
        {:else}
        <img class="avatar" src="/images/blank.jpg" alt="blank_target" /> 
        {/if} -->

		<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
        <div class="chan" on:click={()=>{fileinput.click();}}>Upload new</div>
        <input style="display:none" type="file"  on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
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

 