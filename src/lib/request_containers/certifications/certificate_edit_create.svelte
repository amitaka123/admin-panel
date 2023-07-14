<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import ImageUpload from '../general/imageUpload.svelte';
    import Carousel from '$lib/components/image_collections/carousel.svelte';
    let fileinput;
	import FormData from 'form-data';
    export let certificateId=0;
    let certificate,templates;
    let edit=false;
    let authStore;
    let newHighlight="";

    let certificatePath = get(store.paths.panelCertificates);
    let templatePath = get(store.paths.panelTemplates);
    console.log(certificatePath);

    onMount(_initialize);

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        console.log(get(authStore).role);
        if(!get(authStore).isAuthenticated())
        {
            location.href="/";
        }
        // cartManager = (await import('$lib/managers/cart_manager')); 
        if(certificateId!=0)
        {
            getCertificate();
            
            edit=true;
        }
        else{
            certificate={
                name:"",
                logo:"",
                template:"",
                display_date:"",
                enabled:true
            };
        }
        getTemplates();
}

async function createCertificate(){
    console.log("create");
    try{
            let certificateRes = await fetch(certificatePath+"/",{method:"put",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(certificate)});
            if(certificateRes.status==200)
            {
                let response = await certificateRes.text();
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

async function editCertificate(){
    console.log("edit");
    try{
            let productsRes = await fetch(certificatePath+"/"+certificateId,{method:"post",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(certificate)});
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
    certificate.highlights.push(newHighlight);
    newHighlight="";
    certificate.highlights = certificate.highlights;
    // console.log(product.highlights);
}

async function removeHighlight(highlight){
    console.log("removing");
    let index = certificate.highlights.indexOf(highlight);

    if(index>=0)
    {
        certificate.highlights.splice(index,1);
        certificate.highlights=certificate.highlights;
    }

}

    async function getCertificate()
	{
        if(!certificateId){
            console.log("No certificate Id found");
            certificate=null;
            return;
        }
		try{
            let certificateRes = await fetch(certificatePath+"/single/"+certificateId,{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
            if(certificateRes.status==200)
            {
                let response = await certificateRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    certificate = response.data;
                    certificate.display_date = certificate.display_date.substr(0,certificate.display_date.indexOf("T"));

                    console.log(certificate);
                    console.log("successfully aquired certificate");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring certificate!");
            console.log(err.message);
        }	
	}

    $:{
        if(certificate)
        console.log(certificate.logo);
    }

    async function getTemplates()
	{
        
		try{
            let certificateRes = await fetch(templatePath+"/all/",{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
            if(certificateRes.status==200)
            {
                let response = await certificateRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    templates = response.data;
                    console.log("successfully aquired tempaltes");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring templates!");
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
		// If you add this, upload won't work
		// headers: {
		//   'Content-Type': 'multipart/form-data',
		// }
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

async function deleteCertificate(){
    
}

    async function removeImage(image_url)
	{
        
		try{
            let certificateRes = await fetch(certificatePath+"/image/remove/"+certificateId,{method:"post",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify({image_url})});
            if(certificateRes.status==200)
            {
                let response = await certificateRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    // product = response.data;
                    // location.reload();
                    let index = certificate.image_url.indexOf(image_url);
                    if(index>=0)
                    {
                        certificate.image_url.splice(index,1);
                        certificate.image_url = certificate.image_url;
                    }
                    console.log("successfully aquired certificate");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring certificate!");
            console.log(err.message);
        }	
	}

    async function addImage(image_url)
	{
        
		try{
            let certificateRes = await fetch(certificatePath+"/image/add/"+certificateId,{method:"post",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify({image_url})});
            if(certificateRes.status==200)
            {
                let response = await certificateRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    // certificate = response.data;
                    // location.reload();
                    certificate.image_url.push(image_url);
                    certificate.image_url=certificate.image_url;
                    console.log(certificate.image_url.join(","));
                    
                    console.log("successfully uploaded and added image for the certificate");
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

{#if certificate}
    <!-- Product{product} -->
    
    <form on:submit|preventDefault={edit?editCertificate:createCertificate}  class="mx-10">
        
    
        <ImageUpload url={"/api/panel/files/image_upload"} avatar={certificate.logo} bind:uploadedPath={certificate.logo} />
        Enabled: <input type="checkbox" bind:checked={certificate.enabled} /><br>
        {#if templates}
            <label>Certificate Template</label>
            <select class="w-full rounded-lg shadow-xl bg-white mx-auto my-4 p-2 shadow-xl focus:ring-blue-200 w-30" bind:value={certificate.template}>
                <option value="">Select a Template</option>
                {#each templates as template}
                    <option value="{template._id}">{template.name}</option><hr>
                {/each}
            </select>
        {/if}
        {#if edit && certificate.image_url}
        <h2 class="text-2xl">Images: {certificate.image_url.length}</h2>
            
            
            <img class="upload " src="https://static.thenounproject.com/png/625182-200.png" width="50px" alt="" on:click={()=>{fileinput.click();}} />
            <div class="chan" on:click={()=>{fileinput.click();}}>Upload new Image</div>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            <br>
            <Carousel list={certificate.image_url} removeFunction={removeImage} />
        {/if}
        Name<input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={certificate.name} placeholder="Name(*)" required/>
        Display Date<input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="date" bind:value={certificate.display_date}
          placeholder="Display Date for the Certificate" required/>
        
        <input class="border-none btn rounded-lg shadow-xl bg-blue-700 mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200 cursor-pointer" type="submit" value="Save">
    
    </form>


    <!-- <p class="m-10 btn rounded-lg shadow-xl bg-red-400 p-4 shadow-xl focus:ring-red-200 cursor-pointer" on:click={deleteCertificate}>Delete</p> -->

    
   
    
{/if}
