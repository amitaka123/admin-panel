<script>

    let name="",phone="",email="",password="",confirmPassword="";

    async function handleSubmit()
    {
        hideError();
        if(name.length==0)
        {
            showError("Please provide a Name!");
            return;
        }
        if(phone.length<10)
        {
            showError("Please provide a valid Phone Number!");
            return;
        }

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(mailformat))
        {
            showError("Please provide a valid Email address!");
            return;
        }

        if(phone.length<10)
        {
            showError("Please provide a valid Phone Number!");
            return;
        }

        if(password.length==0 || (password!=confirmPassword))
        {
            showError("Check the Passwords!");
            return;
        }
        // console.log('sending');
        let resp=await fetch('http://localhost:5000/api/user/authentication/register',{method:"post",headers:{'Content-type':'application/json'},redirect: 'follow',body:JSON.stringify({name,email,password,phone})});
        if(resp.status==200)
        {
            let data = await resp.json();
            if(data.status=="success")
            {
                alert('Registered successfully');
            }
            else{
                // alert('Registered failed');
                alert(data.message);
            }   
            // console.log(data);
        }
        else{
            alert('Registered could not proceed because of some server problem');
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

</script>

<!-- This is an example component 
    Instagram: ccornejo__ -->
    <div class='grid grid-cols-12'>
        <div class="banner lg:col-span-8 col-span-0 text-white font-sans font-bold">
            <!-- Aquí iría algún comentario -->
        </div>   
        <div class="lg:col-span-4 col-span-12 text-white font-sans font-bold bg-pink-800 min-h-screen pl-7">
            <div class="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
                <div class="row-span-4 row-start-1 text-2xl">
                    Join Us
                    <div id="error" class="text-red-500 text-sm p-2 m-2 rounded bg-white hidden"></div>
                    <div class="pt-2 hover:shadow-xl">
                        <label class="text-sm font-sans font-medium">
                            Name(*)
                        </label>
                        <input 
                            id='name'
                            type="text" 
                            name="name" 
                            placeholder="Name"
                            bind:value={name} 
                            class=" w-full bg-pink-900 hover:bg-pink-800 py-3 px-12 border hover: border-white-500 rounded shadow text-base font-sans"/>
                        <!-- <a href="" class="text-sm font-sans font-medium text-gray-600 underline">
                            Forgot password?
                        </a> -->
                    </div>
                    <div class="pt-2 hover:shadow-xl">
                        <label class="text-sm font-sans font-medium">
                            Phone #(*)
                        </label>
                        <input 
                            type="tel" 
                            name="phone" 
                            bind:value={phone} 
                            placeholder="+XX XXXXXXXXXX" 
                            class=" w-full bg-pink-900 hover:bg-pink-800 py-3 px-12 border hover: border-white-500 rounded shadow text-base font-sans"/>
                        <!-- <a href="" class="text-sm font-sans font-medium text-gray-600 underline">
                            Forgot password?
                        </a> -->
                    </div>                    
                    <div class="pt-2 hover:shadow-xl">
                        <label class="text-sm font-sans font-medium">
                            Email(*)
                        </label>
                        <input 
                            type="text" 
                            name="email" 
                            bind:value={email} 
                            placeholder="Em@il.address" 
                            class=" w-full bg-pink-900 hover:bg-pink-800 py-3 px-12 border hover: border-white-500 rounded shadow text-base font-sans"/>
                        <!-- <a href="" class="text-sm font-sans font-medium text-gray-600 underline">
                            Forgot password?
                        </a> -->
                    </div>
                    <div class="pt-2 hover:shadow-xl">
                        <label class="text-sm font-sans font-medium">
                            Password(*)
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            bind:value={password} 
                            placeholder="Password" 
                            class=" w-full bg-pink-900 hover:bg-pink-800 py-3 px-12 border hover: border-white rounded shadow text-base font-sans"/>
                        <!-- <a href="" class="text-sm font-sans font-medium text-gray-600 underline">
                            Forgot password?
                        </a> -->
                    </div>
                    <div class="pt-2 hover:shadow-xl">
                        <label class="text-sm font-sans font-medium">
                            Confirm Password(*)
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Confirm Password" 
                            bind:value={confirmPassword} 
                            class=" w-full bg-pink-900 hover:bg-pink-800 py-3 px-12 border hover:border-white rounded shadow text-base font-sans"/>
                        <!-- <a href="" class="text-sm font-sans font-medium text-gray-600 underline">
                            Forgot password?
                        </a> -->
                    </div>
                    
                    <!-- Button -->
                    <div class="text-sm font-sans font-medium w-full pr-20 pt-14">
                        <button 
                            on:click={handleSubmit}
                            type="button"   
                            class="text-center w-full py-4 bg-white text-pink-800 hover:bg-pink-400 hover:text-white rounded-md text-white">
                               Register Now
                        </button>
                    </div>
                </div>
                <!-- Text -->
                <a href="/login" class="font-sans text-lg font-thin text-white hover:text-xl">
                    Already have an account? <b>Sign In</b>
                </a>
            </div>         
        </div>

        <!-- Second column image -->
         
</div>



<style>
    .banner {
        background: url( '/static/people.jpg' );
        background-repeat: no-repeat;
        background-size: cover        
    }
</style>