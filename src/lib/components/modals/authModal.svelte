<script>
    import { closeModal } from 'svelte-modals';
    
    //this part is must for every logged in component!
    import { onMount } from 'svelte';

    onMount(_initialization);
    let authStore;

    async function _initialization(){
       authStore = (await import('$lib/stores/authentication')).authStore;
    }

    export const isLogin = true;
    function handleCancel(){
      closeModal();
    }

    function handleLogin(){
      console.log("handling login");
      login();
      // closeModal();
    }


    

    let email="",password="";
    let nameR="",phoneR="",emailR="",passwordR="",confirmPasswordR="";
  

async function login()
{
    hideErrorLogin();
   
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.match(mailformat))
    {
      showErrorLogin("Please provide a valid Email address!");
        return;
    }

   
    if(password.length==0)
    {
        showErrorLogin("Check the Passwords!");
        return;
    }
    // console.log('sending');
    let resp=await fetch('/api/panel/authentication/login',{method:"post",headers:{'Content-type':'application/json'},redirect: 'follow',body:JSON.stringify({email,password})});
    if(resp.status==200)
    {
        let data = await resp.json();
        if(data.status=="success")
        {
            console.log(data);
            authStore.update(obj => {
              obj.token = data.user.token;
              obj.authenticated = true;
              obj.role=data.user.role;

              // console.log(obj);
              console.log(obj);

              return obj;
            });
            closeModal();
        }
        else{
            showErrorLogin(data.message);
        }   
        // console.log(data);
    }
    else{
        // alert('Registered could not proceed because of some server problem');
        showErrorLogin('Login could not proceed because of some server problem');
        console.log(resp.status);
    }
}

function showError(message){
        document.getElementById('error').textContent = message;
        document.getElementById('error').style.display="block";
}

function hideError(){
        // document.getElementById('error').textContent = message;
        document.getElementById('error').style.display="none";
}

function showErrorLogin(message){
        document.getElementById('errorLogin').textContent = message;
        document.getElementById('errorLogin').style.display="block";
}

function hideErrorLogin(){
        // document.getElementById('error').textContent = message;
        document.getElementById('errorLogin').style.display="none";
}
  
  </script>

  <!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
 
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed z-5 inset-0 overflow-y-auto">
    <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
     
      {#if isLogin}
      <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
              <!-- Heroicon name: outline/exclamation -->
              <img class="object-contain" src="/images/logo.png" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
              <div class="p-10 flex flex-vertical align-center justify-center">
                <p class="p-2 text-gray-400">Don't have an account?</p>
                <p>contact: neoned71@gmail.com</p>
              </div>
              <h3 class="text-2xl leading-6 font-medium text-green-600" id="modal-title">Sign In</h3>
              <div id="errorLogin" class="text-red-500 text-sm p-2 m-2 rounded bg-white hidden"></div>
              
              <div class="mt-2">
                <input bind:value={email} class="rounded-lg bg-white mx-auto w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="text" placeholder="Email"><br>
                <input bind:value={password} class="rounded-lg bg-white mx-auto w-full my-4 p-4 shadow-xl" type="password" placeholder="Password">
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" on:click={handleLogin} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">Login</button>
          <button type="button" on:click={handleCancel} class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
        </div>
      </div>
      
      {/if}
    </div>
  </div>
</div>