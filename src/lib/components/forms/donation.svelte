<script>
    let donation_email,donation_phone,donation_amount;

    async function handleSubmit(event){
        
        console.log("submitting inquiry form");
        const res = await fetch('https://reikidrsurabhi.com/api/business/donate', {
			method: 'POST',
            headers:{'Content-type':'application/json'},
			body: JSON.stringify({email:donation_email,phone:donation_phone,amount:donation_amount})
		});
		// console.log(await res.text());
		const json = await res.json();
        if(json.status=="success")
        {
            alert("Thankyou for contacting us, our team will reach you shortly");
            // location.reload();
        }
		// let result = JSON.stringify(json);
        // console.log(result);
    }

</script>
<style>
    form{
        background-color: rgb(89, 72, 147);
    }
</style>
<p class="text-center text-purple-500 text-4xl"><b>Make a Donation</b></p>
<form id="donation" class="w-full max-w-lg mx-auto p-10 shadow-2xl rounded-2xl">


    <div class="flex flex-wrap -mx-3 mb-6">


      <div class="w-full md:w mx-10">
        <label class="block uppercase tracking-wide text-white text-lg font-bold mb-2" for="grid-first-name">
        *Your Email
        </label>
        <input class="appearance-none block w-full bg-white-200 text-gray-700 m-2 border border-gray-200 rounded-xl shadow-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white " id="grid-first-name" type="text" bind:value={donation_email} placeholder="Email Address">
        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
      </div>

      <div class="w-full md:w m-10">
        <label class="block uppercase tracking-wide text-white text-lg font-bold mb-2" for="grid-last-name">
        *Phone Number
        </label>
        <input class="appearance-none block w-full bg-white-200 text-gray-700 m-2 border border-gray-200 rounded-xl shadow-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white " id="grid-last-name" type="text" bind:value={donation_phone} placeholder="+XX-XXXXXXXXXX" >
      </div>

      <div class="w-full md:w mx-10">
        <label class="block uppercase tracking-wide text-white text-lg font-bold mb-2" for="grid-password">
          *Amount (<i class="fas fa-rupee-sign"></i>)
        </label> 
        <input class=" text-lg appearance-none block w-full bg-white-200 text-gray-700 m-2 border border-gray-200 rounded-xl shadow-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white " id="amount(in Rs.)" bind:value={donation_amount} type="email" placeholder="Amount in Rupees">
        <!-- <p class="text-gray-600 text-xs italic">Some tips - as long as needed</p> -->
      </div>
    </div>
    
    <div class="flex items-center justify-center">
      <div class="p-20">
        <button class="p-5 shadow-xl hover:shadow-2xl bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold rounded-xl" on:click|preventDefault={handleSubmit} type="button">
          Confirm
        </button>
      </div>
    </div>
  </form>
