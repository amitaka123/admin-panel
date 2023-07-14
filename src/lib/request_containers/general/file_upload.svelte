<script>
	export var url;
	export var dontReload=false;
	let fileinput,fileinputFiles;
	let fileType='academic';
	let fileName='';
	import FormData from 'form-data';
	
	
	const handleSubmit = async () => {
	console.log("handling submit");
	var formData = new FormData();
	if(!fileinputFiles || !fileinputFiles[0])
	{
		alert("no file selected");
		return;
	}
	let file = fileinputFiles[0];
	
	let token = localStorage.getItem("token");
	//fetch upload of the image as the logo of the company!
	if(fileType=="" || fileName=="")
	{
		alert("please enter all the relevant fields(name+type)");
		return;
	}
	formData.append("file", file);
	formData.append("file_type",fileType);
	formData.append("title",fileName);
		const options = {
		method: 'POST',
		body: formData,
		mode:'cors',
		headers:{'Authorization':'Bearer '+token}
		// If you add this, upload won't work
		// headers: {
		//   'Content-Type': 'multipart/form-data',
		// }
		};
    
    var res = await fetch(`/api/files/upload_file`, options);
	if(res.status==200)
	{
		// let reader = new FileReader();
		// reader.readAsDataURL(image);
		// reader.onload = e => {
		// 		avatar = e.target.result
		// };
			// console.log(res);
			let response = await res.text();
			try{
				let data = await JSON.parse(response);
				if(data.status == "success")
				{
					url = data.data;
					if(!dontReload)
					{
						location.reload();
					}
					// console.log("url: "+url);
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
			alert(text.message);
		}
		catch(e){
			alert("some error occured");
			console.log(e);
		}

	}


            
}
	
</script>
<p>File size: 20MB Max</p>
<div id="app" class=" w3-margin w3-padding w3-row">
	<div class="w3-half">
		<i class="fa fa-upload w3-center w3-green w3-padding w3-card w3-round" on:click={()=>{fileinput.click();}} aria-hidden="true"></i>
		{#if fileinputFiles && fileinputFiles[0]}
			<p>{fileinputFiles[0].name}</p>
		{/if}
		<br>
        <!-- <div class="chan" on:click={()=>{fileinput.click();}} >Choose a File</div> -->
		<input type="text" class="w3-input" placeholder="Name of the file" bind:value={fileName} />
		<br>
	</div>

	<div class="w3-half">
		<label>File upload type</label>
		<br>
		<select class="w3-padding w3-margin w3-select w3-input" bind:value={fileType} >
			<option value="academic">Academic</option>
			<option value="materials_zip">Study Material Zip</option>
			<option value="official">Official document</option>
		</select>
        <input style="{dontReload?'':'display:none'}" type="file" accept=".jpg, .jpeg, .png, .zip" bind:this={fileinput} bind:files={fileinputFiles} >
		<br>
		
		<button class="w3-button w3-blue w3-margin w3-round" on:click={handleSubmit}>Submit</button>

	</div>
	
		
		
	</div>



<style>
	.chan{
		display:inline;
		cursor:pointer;
	}

	i{
		font-size: 300%;
		cursor:pointer;
	}
	#app{
	
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

 