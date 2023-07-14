
<script>
let body ={
    key:"ccrudG1V",
    surl:"https://reikidrsurabhi.com/payments/success",
    furl:"https://reikidrsurabhi.com/payments/failure",
    udf5:"",
    productinfo:"Donation Towards Reiki Healing Heaven",
};
let hashed_body=null;


function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    // alert("You have entered an invalid email address!")
    return (false)
}

function ValidatePhone(phone) 
{
 if (/[0-9]{10}/.test(phone))
  {
    return (true)
  }
    // alert("You have entered an invalid phone #!")
    return (false)
}

function ValidateAmount(amount) 
{
 if (/[0-9]*[1-9]+.?[0-9]*/.test(amount))
  {
	//   console.log("ds");
    return Number(amount) > 99;
  }
    // alert("You have entered an invalid phone #!")
    return (false)
}
	
	// var payukey=

async function request_hash() {
    console.log("requesting hash");
    let response = await fetch('/api/business/payments/request_hash', {
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body)
        });
    let b = await response.json();
    return b.data;
}

async function initiatePayment(){
	if(body.firstname.length==0)
	{

		alert("please enter a name");
		return false;
	}
	let email=body.email;
	if(!ValidateEmail(email))
	{
		alert("please enter a proper email");
		return false;
	}

	let phone=body.phone;
	if(!ValidatePhone(phone))
	{
		alert("please enter a proper phone #");
		return false;
	}

	let amount=body.amount;
	if(!ValidateAmount(amount))
	{
		alert("Minumum amount to be transace = Rs.100");
		return false;
	}
	let txnid = randomId();
	body.txnid=txnid;

    hashed_body = await request_hash();

    if(hashed_body){
        console.log("recieved hash");
        setTimeout(()=>{
            console.log("submitting form!!");
            console.log(hashed_body);
            document.forms['final_form'].submit();
        },1000);
    }
    //TODO write fetch request to get hash and iniitiate the transaction!
}



function randomId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}



</script>

<div class="form w3-center w3-padding w3-margin">
    <form>
    <!--<input type="hidden" name="txnid" bind:value={body.txnid} />
        <input type="hidden" name="key" bind:value={body.key} /> -->

        <div class="dv w3-margin">
        <!-- <span class="text"><label>First Name:</label></span><br> -->
        <span>
            <input type="text"  id="fname" name="firstname" bind:value={body.firstname} placeholder="First Name" />
        </span>
        </div>
        
        <div class="dv w3-margin">
        <!-- <span class="text"><label>Email ID:</label></span><br> -->
        <span><input type="text"  id="email" name="email" bind:value={body.email} placeholder="Email ID" /></span>
        </div>

        <div class="dv w3-margin">
            <!-- <span class="text"><label>Phone #:</label></span><br> -->
            <!-- <input type="tel" maxlength="10" id="phone" name="phone" placeholder="Phone #(+91- 10 digits)" pattern="[0-9]{10}"></span> -->
            <span><input type="tel" maxlength="10" id="phone" bind:value={body.phone} name="phone" placeholder="Phone #(+91:10 digits)" pattern="[0-9]{10}"></span>
            </div>

        <div class="dv w3-margin">
            <!-- <span class="text"><label>Phone #:</label></span><br> -->
            <!-- <input type="tel" maxlength="10" id="phone" name="phone" placeholder="Phone #(+91- 10 digits)" pattern="[0-9]{10}"></span> -->
            <span><input type="number" name="amount" bind:value={body.amount} placeholder="Amount(INR)" /></span>
            </div>
        </form>
        <button on:click|preventDefault={initiatePayment}>Donate Now</button>

        {#if hashed_body}
        <p>Payment hash aquired, moving to PayU Payments Page. Please Wait....</p>
        <div>
            
            <form action='https://secure.payu.in/_payment' id="final_form" enctype="multipart/form-data" method='post'>
                <input type="hidden" name="key" value={hashed_body.key} />
                <input type="hidden" name="txnid" value={hashed_body.txnid} />
                <input type="hidden" name="productinfo" value={hashed_body.productinfo} />
                <input type="hidden" name="amount" value={hashed_body.amount} />
                <input type="hidden" name="email" value={hashed_body.email} />
                <input type="hidden" name="firstname" value={hashed_body.firstname} />
                <!-- <input type="hidden" name="lastname" value={hashed_body.lastname} /> -->
                <input type="hidden" name="surl" value={hashed_body.surl} />
                <input type="hidden" name="furl" value={hashed_body.furl} />
                <input type="hidden" name="phone" value={hashed_body.phone} />
                <input type="hidden" name="hash" value={hashed_body.hash} />
             </form>
                
        </div>

        {/if}
        
</div>