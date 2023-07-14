<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import ImageUpload from '../general/imageUpload.svelte';
    import Carousel from '$lib/components/image_collections/carousel.svelte';
    let fileinput;
	import FormData from 'form-data';
    export let templateId=0;
    let template;
    let edit=false;
    let authStore;
    let newHighlight="";

    let templatePath = get(store.paths.panelTemplates);
    console.log(templatePath);

    onMount(_initialize);

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        console.log(get(authStore).role);
        if(!get(authStore).isAuthenticated())
        {
            location.href="/";
        }
        // cartManager = (await import('$lib/managers/cart_manager')); 
        if(templateId!=0)
        {
            getTemplate();
            edit=true;
        }
        else{
            template={
                name:"",
                description:"",
                logo:"/dowser.png",
                color:'#b1bbc9',// digital or physical #b1bbc9
                enabled:true
            };
    }
}

async function createTemplate(){
    console.log("create");
    try{
            let templateRes = await fetch(templatePath+"/",{method:"put",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(template)});
            if(templateRes.status==200)
            {
                let response = await templateRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    alert("successfully created product");
                    location.reload();
                }
            }
        }
        catch(err)
        {
            alert(err.message);
            // console.log(err.message);
        }	
}

async function editTemplate(){
    console.log("edit");
    try{
            let productsRes = await fetch(templatePath+"/"+templateId,{method:"post",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(template)});
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    //alert("successfully created product");
                    //location.reload();
                }
            }
        }
        catch(err)
        {
            alert(err.message);
            console.log(err.message);
        }
}

async function addHighlight(){
    console.log("highlights");
    template.highlights.push(newHighlight);
    newHighlight="";
    template.highlights = template.highlights;
    // console.log(product.highlights);
}

async function removeHighlight(highlight){
    console.log("removing");
    let index = template.highlights.indexOf(highlight);

    if(index>=0)
    {
        template.highlights.splice(index,1);
        template.highlights=template.highlights;
    }

}

    async function getTemplate()
	{
        if(!templateId){
            console.log("No template Id found");
            template={};
            return;
        }
		try{
            let templateRes = await fetch(templatePath+"/single/"+templateId,{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
            if(templateRes.status==200)
            {
                let response = await templateRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    template = response.data;
                    console.log("successfully aquired tempalte");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring template!");
            console.log(err.message);
        }	
	}

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
		};
    
    var res = await fetch("/api/panel/files/image_upload", options );
	if(res.status==200)
	{
		let reader = new FileReader();
		// console.log(image);
            reader.readAsDataURL(image);
            
			// console.log(res);
			let response = await res.text();
			try{
				let data = await JSON.parse(response);
				if(data.status == "success")
				{
					await addImage(data.data);

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
			alert(text);
		}
		catch(e){
			alert("some error occured");
			console.log(e);
		}
	}


            
}

async function deleteTemplate(){
    
}

    async function removeImage(image_url)
	{
        
		try{
            let templateRes = await fetch(templatePath+"/image/remove/"+templateId,{method:"post",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify({image_url})});
            if(templateRes.status==200)
            {
                let response = await templateRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    // product = response.data;
                    // location.reload();
                    let index = template.image_url.indexOf(image_url);
                    if(index>=0)
                    {
                        template.image_url.splice(index,1);
                        template.image_url = template.image_url;
                    }
                    console.log("successfully aquired template");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring template!");
            console.log(err.message);
        }	
	}

    $:{
        if(template)
        console.log(template.color);
    }

    async function addImage(image_url)
	{
        
		try{
            let templateRes = await fetch(templatePath+"/image/add/"+templateId,{method:"post",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify({image_url})});
            if(templateRes.status==200)
            {
                let response = await templateRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    // template = response.data;
                    // location.reload();
                    template.image_url.push(image_url);
                    template.image_url=template.image_url;
                    console.log(template.image_url.join(","));
                    
                    console.log("successfully uploaded and added image for the template");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in uploading and adding image!");
            console.log(err.message);
        }	
	}
</script>

{#if template}
    <!-- Product{product} -->
    
    <form on:submit|preventDefault={edit?editTemplate:createTemplate}  class="mx-10">
        
    
        <ImageUpload url={"/api/panel/files/image_upload"} avatar={template.logo}  bind:uploadedPath={template.logo}/>
        Enabled: <input type="checkbox" bind:checked={template.enabled} />

        <!-- <img class="upload " src="https://static.thenounproject.com/png/625182-200.png" width="50px" alt="" on:click={()=>{fileinput.click();}} />
            <div class="chan" on:click={()=>{fileinput.click();}}>Upload new Image</div>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            -->
        
        <!-- {#if edit && template.image_url}
        <h2 class="text-2xl">Images: {template.image_url.length}</h2>
            
            
            <img class="upload " src="https://static.thenounproject.com/png/625182-200.png" width="50px" alt="" on:click={()=>{fileinput.click();}} />
            <div class="chan" on:click={()=>{fileinput.click();}}>Upload new Image</div>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            <br>
            <Carousel list={template.image_url} removeFunction={removeImage} />
        {/if} -->
        Name
        <input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={template.name} placeholder="template Name(*)" required/>
        Description
        <input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={template.description} placeholder="template Description(*)">

        Color
        <input  class="rounded-2xl shadow-xl bg-white mx-auto my-4 p-4 shadow-xl focus:ring-blue-200" type="color" bind:value={template.color} placeholder="Color" />
        <p style="background:{template.color}" class="rounded-2xl p-2 m-2 w-full">{template.color} </p>    


        <!-- <hr> -->
        
       <!-- {#if product.highlights} -->
    
        <!-- <hr>     -->
        
        <input class=" btn rounded-lg border-none shadow-xl bg-blue-800 mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200 cursor-pointer" type="submit" value="Save">
    
    </form>

    {#if edit}
        <p class="m-10 btn rounded-lg border-none shadow-xl bg-red-700 p-4 shadow-xl focus:ring-red-200 cursor-pointer" on:click={deleteTemplate}>Delete</p>
    {/if}
    
   
    
{/if}
