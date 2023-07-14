<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    import ImageUpload from '../general/imageUpload.svelte';
    import Carousel from '$lib/components/image_collections/carousel.svelte';
    let fileinput;
	import FormData from 'form-data';
    export let productId=0;
    let product;
    let edit=false;
    let authStore;
    let newHighlight="";

    let productPath = get(store.paths.openMarketProducts);
    console.log(productPath);

    onMount(_initialize);

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        console.log(get(authStore).role);
        if(!get(authStore).isAuthenticated())
        {
            location.href="/";
        }
        // cartManager = (await import('$lib/managers/cart_manager')); 
        if(productId!=0)
        {
            getProduct();
            edit=true;
        }
        else{
            product={
                name:"",
                version:"",
                highlights:[],
                description:"",
                price:"",
                thumbnail:"/dowser.png",
                product_type:'physical',// digital or physical
                // images:[{type:ObjectId,ref:"files"}],
                image_url:[],
                category:"",// lamp, course, wearable, mechanical, applications
                subcategory:"",
                reviews:[],// Example: {rating:4,review:"very good",user_id:"Object ID"}
                enabled:true
            };
    }
}

async function createProduct(){
    console.log("create");
    try{
            let productsRes = await fetch(productPath+"/",{method:"put",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(product)});
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
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

async function editProduct(){
    console.log("edit");
    try{
            let productsRes = await fetch(productPath+"/"+productId,{method:"post",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(product)});
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
    product.highlights.push(newHighlight);
    newHighlight="";
    product.highlights = product.highlights;
    // console.log(product.highlights);
}

async function removeHighlight(highlight){
    console.log("removing");
    let index = product.highlights.indexOf(highlight);

    if(index>=0)
    {
        product.highlights.splice(index,1);
        product.highlights=product.highlights;
    }

}

    async function getProduct()
	{
        if(!productId){
            console.log("No product Id found");
            product={};
            return;
        }
		try{
            let productsRes = await fetch(productPath+"/single/"+productId,{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    product = response.data;
                    console.log("successfully aquired product");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring product!");
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

async function deleteProduct(){
    
}

    async function removeImage(image_url)
	{
        
		try{
            let productsRes = await fetch(productPath+"/image/remove/"+productId,{method:"post",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify({image_url})});
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    // product = response.data;
                    // location.reload();
                    let index = product.image_url.indexOf(image_url);
                    if(index>=0)
                    {
                        product.image_url.splice(index,1);
                        product.image_url = product.image_url;
                    }
                    console.log("successfully aquired product");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring product!");
            console.log(err.message);
        }	
	}

    async function addImage(image_url)
	{
        
		try{
            let productsRes = await fetch(productPath+"/image/add/"+productId,{method:"post",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify({image_url})});
            if(productsRes.status==200)
            {
                let response = await productsRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    // product = response.data;
                    // location.reload();
                    product.image_url.push(image_url);
                    product.image_url=product.image_url;
                    console.log(product.image_url.join(","));
                    
                    console.log("successfully uploaded and added image for the product");
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

{#if product}
    <!-- Product{product} -->
    
    <form on:submit|preventDefault={edit?editProduct:createProduct}  class="mx-10">
        Enabled: <input type="checkbox" bind:checked={product.enabled} />
    
        <ImageUpload url={"/api/panel/files/image_upload"} avatar={product.thumbnail} bind:uploadedPath={product.thumbnail}/>
        <label>Product Type</label>
            <select class="rounded-lg shadow-xl bg-white mx-auto my-4 p-2 shadow-xl focus:ring-blue-200 w-30" bind:value={product.product_type} required>
                <option value="physical">Physical</option>
                <option  value="digital">Digital</option>
                <!-- <option  value="digital">Course</option> -->
                <option  value="service">Service</option>
                
            </select>
        {#if edit && product.image_url}
        <h2 class="text-2xl">Images: {product.image_url.length}</h2>
            
            
            <img class="upload " src="https://static.thenounproject.com/png/625182-200.png" width="50px" alt="" on:click={()=>{fileinput.click();}} />
            <div class="chan" on:click={()=>{fileinput.click();}}>Upload new Image</div>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            <br>
            <Carousel list={product.image_url} removeFunction={removeImage} />
        {/if}
        <input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={product.name} placeholder="Product Name(*)" required/>
        <input class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="version" bind:value={product.version} placeholder="Product Version" required/>
        
        <input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={product.description} placeholder="Product Description(*)" maxlength=10>
    
        <input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={product.price} placeholder="Price of the Product($)" />
        <input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={product.category} placeholder="Category" />
        <input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" size="6" maxlength="6" bind:value={product.subcategory} placeholder="Subcategory" required/>

        <!-- <hr> -->
        <label class="text-2xl">Highlights: {product.highlights.length}</label>
        <ul>
            {#each product.highlights as h}
            <li>
                <div class="flex justify-between m-2">
                    <p class="p-2 ">{h}</p>
                    <button class="bg-red-800 p-2 text-white rounded" on:click={()=>{removeHighlight(h)}}>X</button>
                </div>
            </li>
            

            {/each}
        </ul>
        <input class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={newHighlight} placeholder="Highlights"/>
        <p class="btn border-none" on:click={addHighlight}>+ Add highlight</p>
        <!-- {#if product.highlights} -->
    
        <!-- <hr>     -->
        
        <input class=" btn rounded-lg shadow-xl bg-blue-400 mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200 cursor-pointer" type="submit" value="Save">
    
    </form>


    <p class="m-10 btn rounded-lg shadow-xl bg-red-400 p-4 shadow-xl focus:ring-red-200 cursor-pointer" on:click={deleteProduct}>Delete</p>

    
   
    
{/if}
