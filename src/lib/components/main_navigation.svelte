<script>
  import { openModal } from 'svelte-modals';
  import Modal from '$lib/components/modals/otpAuthModal.svelte';
  function handleLogin() {
    openModal(Modal)
  }


  
  import { onMount } from 'svelte';

  import { get } from 'svelte/store';
  let authStore;
  import { Auth } from '$lib/utils/classes';

  onMount(_initialization);

  async function _initialization(){
    authStore = (await import('$lib/stores/authentication')).authStore;
    // let authObject=get(authStore);
  }


  

  async function handleLogout(){
    await authStore.set(new Auth(false,"-"));
    let lls=await logout();
    console.log(lls);
    location.href="/";
  }

  async function logout()
{
    try{
      let resp=await fetch('/api/panel/authentication/logout',{method:"post",headers:{'Content-type':'application/json'},redirect: 'follow'});
      if(resp.status ==200)
      {
        let res = JSON.parse(await resp.text());
        if(res.status == "success")
        {
          return true;
        }
        else{
          return false;
        }

      }
      else{
        return false;
        console.log("");
      }
    }
    catch(err)
    {
      return false;
      console.log(err.message);
    }
}
</script>


<style> 
.logo{
  margin:10px;
  height:50px;
  width:50px;
}
</style>
<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5  sticky top-0 z-20 ">
    <div class="container flex flex-wrap justify-between items-center ">
    <a href="/">
      <img src="/images/glogoB.png" class="h-10" alt="logo">
      <span class="text-green-600"><b>Student Center</b></span>
    <!-- <span class="self-center text-lg font-semibold whitespace-nowrap ">Clumsy</span><img class="logo" src="/images/logo.png" /> -->
    </a>
    <!-- <a href="/" class="flex">
      
    </a>   -->
    <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
      <!-- <h3>Welcome to Admin Panel</h3> -->
    </div>
    <div class="items-center flex">
      <div class="flex items-center py-2 -mx-1 mx-0 gap-2">
          {#if $authStore && $authStore.isAuthenticated()}
          <a href="#" on:click={handleLogout} class="shadow-xl button block text-white bg-red-700 hover:bg-red-600 hover-shadow-2xl focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-red-500" type="button" >Logout</a>
          {:else}
          <a href="#" on:click={handleLogin} class="shadow-xl button block text-white bg-green-600 hover:bg-green-700 hover-shadow-2xl focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-gray-500" type="button" >Get Started</a>
          {/if}
        </div>
    </div>
    </div>
    
    </nav>
    
