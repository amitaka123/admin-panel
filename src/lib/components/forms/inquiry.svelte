<script>
    let inquiry_email, inquiry_message,inquiry_phone,inquiry_name;

    async function handleSubmit(event){
        
        console.log("submitting inquiry form");
        const res = await fetch('https://reikidrsurabhi.com/api/business/inquiry/new', {
			method: 'POST',
            headers:{'Content-type':'application/json'},
			body: JSON.stringify({email:inquiry_email, message:inquiry_message,phone:inquiry_phone,name:inquiry_name,tag:"reiki"})
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
<p class="text-center text-3xl">Contact Us...</p>
<form id="contact" class="w-full max-w-lg mx-auto p-10">
    <div class="flex flex-wrap -mx-3 mb-6 ">
      <div class="w-full md:w px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Your Name(*)
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" bind:value={inquiry_name} placeholder="Jane">
        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
      </div>
      <div class="w-full md:w px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Phone #(*)
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" bind:value={inquiry_phone} placeholder="+91-XXXXXXXXXX" >
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          E-mail(*)
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" bind:value={inquiry_email} type="email" placeholder="email@host.com">
        <!-- <p class="text-gray-600 text-xs italic">Some tips - as long as needed</p> -->
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Message(*)
        </label>
        <textarea class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" bind:value={inquiry_message} id="message" placeholder="Your query..."></textarea>
        <!-- <p class="text-gray-600 text-xs italic">Re-size can be disabled by set by resize-none / resize-y / resize-x / resize</p> -->
      </div>
    </div>
    <div class="md:flex md:items-center">
      <div class="md:w-1/3">
        <button class="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" on:click|preventDefault={handleSubmit} type="button">
          Send
        </button>
      </div>
      <div class="md:w-2/3"></div>
    </div>
  </form>
