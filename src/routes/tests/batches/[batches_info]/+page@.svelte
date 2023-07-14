<!-- <script>
    import {page} from '$app/stores';
    const batch_info = $page.params.batch_info;
</script>

<h1>Details about the Batches {batch_info}</h1> -->


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
                <!-- <div class="bg-slate-400">
                    <div class=" card card-side bg-base-100 shadow-xl mt-4 p-4 rounded-b ">
                        <div class= " ">
                            <h1 class=" text-2xl">NEET 2024</h1>
                            
                        </div>
                    </div>
                    <div class=" tab-sm space-x-2 mt-4 ">
                        <a class="tab hover:shadow-lg rounded-md bg-slate-100">Description</a> 
                        <a class="tab  hover:shadow-lg rounded-md bg-slate-100"  >Classroom</a> 
                        <a class="tab hover:shadow-lg rounded-md bg-slate-100">Khazana</a>
                        <a class="tab hover:shadow-lg rounded-md bg-slate-100">Announcement</a>
                    </div>
                </div> -->

                <div class="bg-base-100 my-4  rounded-2xl ">
                    <!-- <div class="bg-slate-400 p-5 rounded-t-2xl"> -->
                        <h1 class="text-2xl bg-slate-400 rounded-2xl py-4 rounded-b px-2">Neet 2024</h1>
                    <!-- </div> -->
                    <div class=" space-x-2 mt-4">
                        <a class="tab hover:shadow-lg rounded-md bg-slate-100 ">Description</a> 
                        <a class="tab  hover:shadow-lg rounded-md bg-slate-100"  >Classroom</a> 
                        <a class="tab hover:shadow-lg rounded-md bg-slate-100">Khazana</a>
                        <a class="tab hover:shadow-lg rounded-md bg-slate-100">Announcement</a>
                    </div>
                </div>

                <div class="bg-slate-400 my-4  rounded-t-2xl h-8 ">
                   
                </div>

                
                
                  
                    
            </div>        
    
                

