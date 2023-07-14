<script>
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import store from '$lib/stores/store.js';
// import Events from '$lib/components/collections/lists/events.svelte';
// import Bookings from '$lib/components/collections/lists/bookings.svelte';
// import Users from '$lib/components/collections/lists/users.svelte';
let panelPath = get(store.paths.panelPath);

var authStore;
var dashboard=null;
let  token;
var search = "";

export var user;
onMount(async ()=>{
    authStore = (await import('$lib/stores/authentication')).authStore;
    if(get(authStore).authenticated)
    {
        token=get(authStore).token;
        alert(token);
        // performSearch();
    }
    else{
        console.log("no auth token found");
        //location.href="/login";
    }
  
});


async function performSearch()
{
//    if(search)
//    {
//        search = search.trim();
//        await fetchSearch();
//    }
//    else
//    {
//        await getDashboard();
//    }
   
}

async function fetchSearch(){
  
       let dashboardReq = await fetch(panelPath+"/search/"+search,{method:"get",headers:{'Authorization':'Bearer '+token}});
       dashboard = await dashboardReq.json();
       if(dashboard.status="success")
       {
           dashboard = dashboard.data;
       }
       console.log(dashboard);

}


async function getDashboard()
{

   let dashboardReq = await fetch(panelPath+"/dashboard",{method:"get",headers:{'Authorization':'Bearer '+token}});
   dashboard = await dashboardReq.json();
   if(dashboard.status="success")
   {
       dashboard = dashboard.data;
   }
   console.log(dashboard);
}
</script>

<!-- <h2 class="text-center text-2xl m-10">Gravity Dashboard</h2> -->

{#if dashboard}
		<div class="w3-center rounded ">
			<!-- <h2>WELCOME <span class="">{dashboard.profile.name.toUpperCase()}</span></h2>
			<h3>POST:<span class="text-green-400">{dashboard.profile.role.toUpperCase()}</span></h3> -->
			<label>Search Events, Bookings, Users and Hosts...</label>
			<div class="ui search" style="cursor:pointer">
				<div class="ui icon input">
				  <input class="prompt p-2 rounded bg-gray-200" type="text" bind:value={search} placeholder="ID or pattern..." on:input={performSearch}>
				  <i class="search icon" ></i>
				</div>
				
			  </div>
		</div>
		<div class="m-10">
            <h3 class="text-center text-2xl">Events</h3>
		<p>Recently Added</p>
        <Events events={dashboard.events} />
		<!-- <StudentsList students={dashboard.events} /> -->
		<p>See All <a class="w3-margin w3-link w3-text-cyan" href="/events">Events</a></p>
		<hr>	

		<h3 class="text-center text-2xl">Bookings</h3>
		<p>Recently Added</p>
        <Bookings bookings={dashboard.bookings} />
		<!-- <TestsList tests={dashboard.bookings} /> -->
		<p>See All <a class="w3-margin w3-link w3-text-cyan" href="/bookings">Bookings</a></p>
		<hr>

		<h3>Users</h3>
		<p>Recently Added</p>
        <Users users ={dashboard.users} />
		<!-- <QuestionsList questions={dashboard.users} /> -->
		<p>See All <a class="w3-margin w3-link w3-text-cyan" href="/users">Users</a></p>
		<hr>
        </div>
		
		
		<!-- {JSON.stringify(dashboard)} -->
		{/if}
        
        <div class="px-20">
          <div class="flex space-x-4 py-10">
            <input type="text" placeholder="Search here" class="input input-bordered w-fit  justify-end flex-1" />
            <button class="btn btn-secondary  w-36 ">Study</button>
          </div>
          
        
            <div class="carousel w-full h-32 bg-blue-300 rounded-xl object-cover"  >
                <div id="item1" class="carousel-item w-full" >
                  <img src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" class="w-full" />
                </div> 
                <div id="item2" class="carousel-item w-full">
                  <img src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg" class="w-full" />
                </div> 
                <div id="item3" class="carousel-item w-full">
                  <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" class="w-full" />
                </div> 
                <div id="item4" class="carousel-item w-full">
                  <img src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" class="w-full" />
                </div>
              </div> 
              <div class="flex justify-center w-full py-2 gap-2">
                <a href="#item1" class="radio"><input type="radio" name="radio-1" class="radio" checked/></a>
                <a href="#item2" class="radio"><input type="radio" name="radio-1" class="radio" /></a>
                <a href="#item3" class="radio"><input type="radio" name="radio-1" class="radio" /></a> 
                <a href="#item4" class="radio"><input type="radio" name="radio-1" class="radio" /></a>
              </div>

              <div class="tabs tab-sm space-x-2">
                <a class="tab hover:shadow-lg rounded-md bg-slate-100">Tab 1</a> 
                <a class="tab  hover:shadow-lg rounded-md bg-slate-100"  >Tab 2</a> 
                <a class="tab hover:shadow-lg rounded-md bg-slate-100">Tab 3</a>
              </div>

              <div class="card  bg-base-100 shadow-xl bg-slate-400 my-16 p-3 w-1/3">
                
                <div class="flex">
                  <p class="text-lg flex-1" >NEET 2024</p> 
                  <p class="badge bg-amber-300 border-amber-300 text-black rounded-md h-7 mr-4 ">New</p>
                  <i class="fa-solid fa-share-nodes text-lg "></i>
                </div>
                <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">For NEET 2025</h2>
                  <p>tarts on 15th of april</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              
        </div>        

            

        
        