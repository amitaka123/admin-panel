<!-- This is an example component 
    Instagram: ccornejo__ -->
    <div class='grid grid-cols-12'>
        <div class="banner lg:col-span-8 col-span-0 text-white font-sans font-bold">
            <!-- Aquí iría algún comentario -->
        </div>   
        <div class="lg:col-span-4 col-span-12 text-white font-sans font-bold bg-pink-800 min-h-screen pl-7">
            <div class="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
                <div class="row-span-4 row-start-1 text-2xl">
                    Sign In                    
                    <div class="pt-2">
                        <label class="text-sm font-sans font-medium">
                            Username
                        </label>
                        <input 
                            type="text" 
                            name="Username" 
                            placeholder="Username" 
                            class=" w-full bg-pink-900 py-3 px-12 border hover: border-white-500 rounded shadow text-base font-sans"/>
                        <!-- <a href="" class="text-sm font-sans font-medium text-gray-600 underline">
                            Forgot password?
                        </a> -->
                    </div>
                    <div class="pt-2">
                        <label class="text-sm font-sans font-medium">
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            class=" w-full bg-pink-900 py-3 px-12 border hover: border-white rounded shadow text-base font-sans"/>
                        <!-- <a href="" class="text-sm font-sans font-medium text-gray-600 underline">
                            Forgot password?
                        </a> -->
                    </div>
                   
                    
                    <!-- Button -->
                    <div class="text-sm font-sans font-medium w-full pr-20 pt-14">
                        <button 
                            type="button"   
                            class="text-center w-full py-4 bg-white text-pink-800 hover:bg-pink-400 hover:text-white rounded-md text-white">
                                Sign In
                        </button>
                    </div>
                </div>
                <!-- Text -->
                <a href="/register" class="font-sans text-lg font-thin text-white underline">
                    Don´t have an account? Sign up
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