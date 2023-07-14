<script>
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    import store from '$lib/stores/store.js';
    
    import ImageUpload from '../general/imageUpload.svelte';
    import Carousel from '$lib/components/image_collections/carousel.svelte';
    let fileinput;
	import FormData from 'form-data';
    export let eventId=0;
    let event,templates;
    let edit=false;
    let authStore;
    let newHighlight="";

    let eventPath = get(store.paths.panelEvents);
    // let templatePath = get(store.paths.panelTemplates);
    console.log(eventPath);

    onMount(_initialize);

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        console.log(get(authStore).role);
        if(!get(authStore).isAuthenticated())
        {
            location.href="/";
        }
        // cartManager = (await import('$lib/managers/cart_manager')); 
        if(eventId!=0)
        {
            getEvent();
            
            edit=true;
        }
        else{
            event={
                name:"",
                logo:"",
                template:"",
                display_date:"",
                enabled:true
            };
        }
}

async function createEvent(){
    console.log("create");
    try{
            let eventRes = await fetch(eventPath+"/",{method:"put",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(event)});
            if(eventRes.status==200)
            {
                let response = await eventRes.text();
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

async function editEvent(){
    console.log("edit");
    try{
            let productsRes = await fetch(eventPath+"/"+eventId,{method:"post",headers:{"Content-type":"application/json","Authorization":"Bearer "+get(authStore).token},body:JSON.stringify(event)});
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
    event.highlights.push(newHighlight);
    newHighlight="";
    event.highlights = event.highlights;
}

async function removeHighlight(highlight){
    console.log("removing");
    let index = event.highlights.indexOf(highlight);

    if(index>=0)
    {
        event.highlights.splice(index,1);
        event.highlights=event.highlights;
    }

}

    async function getEvent()
	{
        if(!eventId){
            console.log("No event Id found");
            event=null;
            return;
        }
		try{
            let eventRes = await fetch(eventPath+"/single/"+eventId,{method:"get",headers:{Authorization:"Bearer "+get(authStore).token}});
            if(eventRes.status==200)
            {
                let response = await eventRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    event = response.data;
                    // event.display_date = event.display_date.substr(0,event.display_date.indexOf("T"));
                    console.log(event);
                    console.log("successfully acquired event");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in acquiring event!");
            console.log(err.message);
        }	
	}

    $:{
        if(event)
        console.log(event.logo);
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


    async function removeImage(image_url)
	{
        
		try{
            let eventRes = await fetch(eventPath+"/image/remove/"+eventId,{method:"post",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify({image_url})});
            if(eventRes.status==200)
            {
                let response = await eventRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    // product = response.data;
                    // location.reload();
                    let index = event.image_url.indexOf(image_url);
                    if(index>=0)
                    {
                        event.image_url.splice(index,1);
                        event.image_url = event.image_url;
                    }
                    console.log("successfully aquired event");
                }
            }
        }
        catch(err)
        {
            alert("Some Problem has occured in aquiring event!");
            console.log(err.message);
        }	
	}

    async function addImage(image_url)
	{
        
		try{
            let eventRes = await fetch(eventPath+"/image/add/"+eventId,{method:"post",headers:{Authorization:"Bearer "+get(authStore).token,"Content-Type":"application/json"},body:JSON.stringify({image_url})});
            if(eventRes.status==200)
            {
                let response = await eventRes.text();
                response = JSON.parse(response);
                // @ts-ignore
                if(response.status == "success")
                {
                    // @ts-ignore
                    // event = response.data;
                    // location.reload();
                    event.image_url.push(image_url);
                    event.image_url=event.image_url;
                    console.log(event.image_url.join(","));
                    
                    console.log("successfully uploaded and added image for the event");
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

{#if event}
    <!-- Product{product} -->
    
    <form on:submit|preventDefault={edit?editEvent:createEvent}  class="mx-10">
        
    
        <ImageUpload edit={false} url={"/api/panel/files/image_upload"} avatar={event.thumbnail} bind:uploadedPath={event.thumbnail} />
<table class="w3-table-all w3-hoverable">
    <thead>
      <tr class="w3-light-grey">
        <th>Event</th>
        <th>Type</th>
        <th>Status</th>
        <th>Booking</th>
        <th>Event ID</th>
      </tr>
    </thead>
    <tr class="w3-hover-shadow">
        <td>{event.name}</td>
        <td>{event.event_type}</td>
        <td>{event.event_status}</td>
        <td>{event.booking_status}</td>
        <td>{event._id}</td>
    </tr>
  </table>

        Enabled: <input type="checkbox" bind:checked={event.enabled} /><br>
        {#if edit && event.thumbnail}
        <!-- <h2 class="text-2xl">Images: {event.thumbnail.length}</h2> -->
<!--             
            
            <img class="upload " src="https://static.thenounproject.com/png/625182-200.png" width="50px" alt="" on:click={()=>{fileinput.click();}} />
            <div class="chan" on:click={()=>{fileinput.click();}}>Upload new Image</div>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            <br>
            <Carousel list={event.thumbnail} removeFunction={removeImage} /> -->

            <!-- <img src={event.thumbnail} height="300" /> -->
        {/if}
        <!-- Name<input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" bind:value={event.name} placeholder="Name(*)" required/>
        Display Date<input  class="rounded-lg shadow-xl bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="date" bind:value={event.display_date}
          placeholder="Display Date for the Event" required/> -->
        
        <!-- <input class="border-none btn rounded-lg shadow-xl bg-blue-700 mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200 cursor-pointer" type="submit" value="Save"> -->
    
    </form>


    <!-- <p class="m-10 btn rounded-lg shadow-xl bg-red-400 p-4 shadow-xl focus:ring-red-200 cursor-pointer" on:click={deleteEvent}>Delete</p> -->

    
   
    
{/if}
