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
      otpsent = false;
      // console.log("handling login");
      // login();
      // closeModal();
    }

    function handleSendOtp(){
      otpsent = true;
      // closeModal();
    }


    

    let otp = "",phone = "";
    let otpsent=false;

  

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
      <div class="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        <div class=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          
            <!-- <div class="mx-auto flex-shrink-0 flex items-center justify-center h-20 rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
              
            </div> -->
            <div class="center">
              <!-- <div class="p-10 flex flex-vertical align-center justify-center">
                <p class="p-2 text-gray-400">Don't have an account?</p>
                <p>contact: neoned71@gmail.com</p>
              </div> -->
              <img class="center object-contain h-10" src="/images/glogo.png"  /> 
              <!-- <h3 class="text-xl leading-6 font-medium text-green-600" id="modal-title">Get Started</h3> -->
              <div id="errorLogin" class="text-red-500 text-sm p-2 m-2 rounded bg-white hidden"></div>
              
              <div class="mt-2 rounded">
                {#if !otpsent}
                <div class="relative justify-center overflow-hidden bg-gray-50 rounded">
                  <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                      <div class="flex flex-col items-center justify-center text-center space-y-2">
                        <div class="font-semibold text-3xl">
                          <p>Phone number Verification</p>
                        </div>
                      </div>
                
                      <div>
                        <!-- <form action="" method="post"> -->
                          <div class="flex flex-col space-y-16">
                            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                              +91-<input bind:value={phone} class=" m-10 rounded bg-gray-200 text-black w-full my-4 p-4 shadow-xl ring-black focus:ring-green-200" type="phone"  placeholder="Phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"><br>

                            </div>
                
                            <div class="flex flex-col space-y-5">
                              <div>
                                <button on:click={handleSendOtp} class="flex flex-row items-center justify-center text-center w-full border rounded outline-none py-5 bg-green-500 border-none text-white text-sm shadow-sm">
                                  Send OTP
                                </button>
                              </div>
                
                              <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-green-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                              </div>
                            </div>
                          </div>
                        <!-- </form> -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <input bind:value={otp} class="rounded-lg bg-white mx-auto w-full my-4 p-4 shadow-xl" type="text" placeholder="OTP Code">
                <button type="button" on:click={handleLogin} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">Done!</button> -->

                <!-- <input bind:value={phone} class="rounded-lg bg-white w-full my-4 p-4 shadow-xl focus:ring-blue-200" type="phone"  placeholder="Phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"><br>
                <button type="button" on:click={handleSendOtp} class="m-2 w-40 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Send OTP</button> -->
                {:else}
                <div class="relative justify-center overflow-hidden bg-gray-50 rounded">
                  <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                      <div class="flex flex-col items-center justify-center text-center space-y-2">
                        <div class="font-semibold text-3xl">
                          <p>Phone number Verification</p>
                        </div>
                        <div class="flex flex-row text-sm font-medium text-gray-400">
                          <p>We have sent a code to your Phone: {phone}</p>
                        </div>
                      </div>
                
                      <div>
                        <!-- <form action="" method="post"> -->
                          <div class="flex flex-col space-y-16 space-x-5">
                            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                              <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                              </div>
                              <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                              </div>
                              <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                              </div>
                              <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                              </div>
                              <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                              </div>
                              <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                              </div>
                            </div>
                
                            <div class="flex flex-col space-y-5">
                              <div>
                                <button on:click={handleLogin} class="flex flex-row items-center justify-center text-center w-full border rounded outline-none py-5 bg-green-500 border-none text-white text-sm shadow-sm">
                                  Verify Account
                                </button>
                              </div>
                
                              <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-green-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                              </div>
                            </div>
                          </div>
                        <!-- </form> -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <input bind:value={otp} class="rounded-lg bg-white mx-auto w-full my-4 p-4 shadow-xl" type="text" placeholder="OTP Code">
                <button type="button" on:click={handleLogin} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">Done!</button> -->

                {/if}
              </div>
            </div>
          
        </div>
        
        <div class=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" on:click={handleCancel} class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
        </div>
      </div>
      
      {/if}
    </div>
  </div>
</div>