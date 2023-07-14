<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Token } from "../../../routes/_utils/dynamic_store.js";
  import { ApiUrl } from "../../../routes/_utils/static_store.js";
  import { get } from "svelte/store";
  import ImageUpload from "../../../routes/_utils/imageUpload.svelte";
  export let edit = false;
  export let studentId;
  // /home/binari/Documents/student_panel/src/routes/admission/create/student_onboarding

  let date = new Date();

  let streams = [],
    batches = [],
    branches = [];

  let myURL = "/panel/student_create";

  let cor_address = false;

  // let correspondence_address = "", correspondence_city = "",
  // correspondence_state = "", correspondence_pin = "";

  // var url = null;

  // let centre_scoops = 1;
  // let stream_scoops = 1;
  // let course_scoops = 1;

  // let course_opted = 1;

  let src = "../images/";

  let body = {
    // centre: [],
    // stream: [],
    // course_opted: [],
    // course_opted_class: [],
    how_came_to_know: [],
    primary_address: {
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      pincode: "",
    },
    secondary_address: {
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      pincode: "",
    },
  };

  onMount(async () => {
    console.log("mounted");

    let token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }

    Token.set(token);

    let loginPath = get(ApiUrl);
    // myURL = loginPath + "/panel/student_create";
    await getStreams();
    await getBranches();

    if (edit) {
      console.log("edit:"+edit);
      getStudent();
    } else {
      // body.batch = "-";
      body.branch = "-";
      body.stream = "-";
    }
  });

  

  async function handleSubmit(event) {
    
    let loginPath = get(ApiUrl);

    let myCreateURL = loginPath + "/panel/student_create";
    let myEditURL = loginPath + "/panel/student_edit";

    


    if(edit){
      myEditURL = myEditURL+"/"+studentId;
      console.log(myEditURL);
    }

    console.log("submitting inquiry form");
    console.log(body);
    var token = localStorage.getItem("token");

    // if(body.stream == "-" || body.branch=="-" || body.class==" " )
		// {
		// 	alert("Make sure you have selected a branch, stream and a class !");
		// 	return;
		// }

    // if(body.name == " " )
		// {
		// 	alert("Make sure you have provided your name!");
		// 	return;
		// }

    // if(body.father_name == " " )
		// {
		// 	alert("Make sure you have provided Father's/Guardian's name!");
		// 	return;
		// }

    // if(body.phone == " " && !/^\d{10}$/.test(body.number) )
		// {
		// 	alert("Make sure you have provided a valid 10 digit Students' Mobile !");
		// 	return;
		// }

    // if(body.mobile_parents == " " && !/^\d{10}$/.test(body.mobile_parents) )
		// {
		// 	alert("Make sure you have provided a valid 10 digit Parents' Mobile !");
		// 	return;
		// }

    
    // console.log(body);
    // here we have created the clone of the body, otherwise secondary address will be getting permanently deleted

    let data = JSON.parse(JSON.stringify(body));
    if (cor_address) {
      delete data.secondary_address;
    }

    
    // if (/^\d{10}$/.test(data.number)) {
    //    // value is ok, use it
    //    } else {
    // alert("Invalid number; must be ten digits")
    // number.focus()
    // return false
    //  }

    if(data.stream == "-"  )
		{
			delete data.stream;
		}

    if(data.branch == "-"  )
		{
			delete data.branch;
		}

    if(data.class_number == "-"  )
		{
			delete data.class_number;
		}

    const res = await fetch(edit?myEditURL:myCreateURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    // console.log(await res.text());
    const json = await res.json();
    if (json.status == "success") {
      alert("Thankyou for contacting us, our team will reach you shortly");
      // location.reload();
      if(edit){
        history.back();
      } else{
        location.href = "/students/" + json.data;
      }
      
    } else {
      alert("Some problem has occured " + json.message);
      // location.reload();
    }

    // goto('../../../routes/admission/create/student_onboarding');
  }

  async function getBranches() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/branches/", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          branches = response.data;
          // batches= response.data.batches;
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log("caught1");
        alert("Some problem has occured, see console for more info.");
        console.log(e.message);
      }
    } else {
      console.log(await res.text());
    }
  }

  async function getStudent() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/student/" + studentId, {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        console.log(response);
        if (response.status == "success") {
          body = response.data;
          if(body.stream){
            body.stream = body.stream._id;
          }else{
            body.stream ="-";
          }
          if(body.branch){
            body.branch = body.branch._id;
          }else{
            body.branch ="-";
          }
          if(body.class_number){
            body.class_number = body.class_number;
          }else{
            body.class_number ="-";
          }
        
          
          // batches= response.data.batches;
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log("caught1");
        alert("Some problem has occured, see console for more info.");
        console.log(e.message);
      }
    } else {
      console.log(await res.text());
    }
  }

  async function getStreams() {
    // console.log(body);
    var token = localStorage.getItem("token");
    var loginPath = get(ApiUrl);
    let res;
    console.log("trying streams");
    res = await fetch(loginPath + "/panel/streams", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          streams = response.data;
          console.log(streams);
        } else {
          console.log(response.message);
          alert(response.message);
        }
      } catch (e) {
        console.log("caught");
        console.log(e);
      } finally {
      }
    } else {
      console.log(await res.text());
      // user.email = "no logged";
    }
  }
</script>

{#if body}
  <div class="mt-4">
    <input
      class="border-2 float-right mr-4"
      type="text"
      id="enrolment"
      bind:value={body.enrolment}
    />
    <label class="float-right" for="enrolment">Enrolment No:</label><br />
  </div>
  <div class="mt-6">
    <p class="text-center text-xl">ADMISSION FORM</p>
    <form id="registration" class="w-full mx-auto p-6">
      <ImageUpload
        bind:url={body.profilePicture}
        avatar={body.profilePicture}
      />
      <div class=" flex flex-col">
        {#if branches}
          <p class="w3-left">Select Branch</p>

          <select
            class="w3-input w3-border w3-round w3-margin"
            required
            bind:value={body.branch}
          >
            <option value="-">Select Branch</option>
            {#each branches as branch}
              <!-- <label>{}</label> -->
              <option value={branch._id} 
                >{branch.name.toUpperCase()}</option
              >
              <!-- <input class="w3-checkbox w3-input" type="checkbox"  bind:group={body.streams} /> -->
            {/each}
          </select>
        {/if}

        {#if streams}
          <p class="w3-left">Select Stream</p>

          <select
            class="w3-input w3-border w3-round w3-margin"
            required
            bind:value={body.stream}
          >
            <option value="-">Select Stream</option>
            {#each streams as stream}
              <!-- <label>{}</label> -->
              <option value={stream._id} 
                >{stream.name.toUpperCase()}</option
              >
              <!-- <input class="w3-checkbox w3-input" type="checkbox"  bind:group={body.streams} /> -->
            {/each}
          </select>
        {/if}

        <!-- {#if batches}
          <p class="w3-left">Select Batch</p>
          
          <select
            class="w3-input w3-border w3-round w3-margin"
            bind:value={body.batch}
          >
            <option value="-">Select Batch</option>
            {#each batches as batch}
               <option value={batch._id}>{batch.name.toUpperCase()}</option>
               {/each}
          </select>
        {/if} -->
        
        <label for="class">Class</label>
        <select
          class="w3-input w3-border w3-round w3-margin"
          id="class"
          bind:value={body.class_number}
          
        >
          <option value="-">Select Class</option>
          <option value="13">Passout</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>

        <div class="mx-5 my-6">
          <div class="flex flex-row">
            <p class="font-bold">Personal Details</p>
            <!-- <p class="text-[.6em] mt-2 ml-6">
              Mandatory Fields are marked with asterick(*)
            </p> -->
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="name">Student Name:</label>
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="name"
              bind:value={body.name}
              placeholder="jane"
              
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="father_name">
              Father's/Guardian's name:</label
            >
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="father_name"
              bind:value={body.father_name}
              
              
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="mother_name"> Mother's Name:</label>
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="mother_name"
              bind:value={body.mother_name}
              placeholder="jane"
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="occupation_of_father"
              >Occupation of Father/Guardian:</label
            >
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="occupation_of_father"
              bind:value={body.occupation_of_father}
              placeholder="jane"
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="occupation_of_mother"
              >Occupation of Mother:</label
            >
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="occupation_of_mother"
              bind:value={body.occupation_of_mother}
              placeholder="jane"
            />
          </div>

          <div class="flex flex-row">
            <div class=" my-1 mt-2">
              <label class="mt-1 mr-1" for="date_of_birth">
                Date of Birth*:
              </label>
              <input
                class=" border-2 rounded-md p-1"
                type="date"
                id="date_of_birth"
                bind:value={body.date_of_birth}
              />
            </div>

            <div class=" ml-20 mt-4">
              <label class="mt-1 mr-1" for="gender"> Gender: </label>
              <select id="gender" bind:value={body.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non_binary">non-binary</option>
              </select>
            </div>

            <div class=" ml-20 mt-4">
              <label class="mt-1 mr-1" for="blood_group"> Blood Group: </label>
              <select id="blood_grouprs" bind:value={body.blood_group}>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div class=" ml-20 mt-4">
              <label class="mt-1 mr-1" for="category"> Category*: </label>
              <select id="category" bind:value={body.category} >
                <option value="GEN">GEN</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="PH">PH</option>
              </select>
            </div>
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="nationality"> Nationality </label>
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="nationality"
              bind:value={body.nationality}
              placeholder="INDIA"
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="mobile_parents">Mobile Parents:</label
            >
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="mobile_parents"
              bind:value={body.mobile_parents}
              placeholder="jane"
              
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="phone">Mobile Students:</label>
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="phone"
              bind:value={body.phone}
              placeholder="jane"
              
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="e_mail_id">E-Mail ID:</label>
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="email"
              id="e_mail_id"
              bind:value={body.email}
              placeholder="jane"
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="aadhaar_number">Aadhaar :</label>
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="number"
              id="aadhaar_number"
              bind:value={body.aadhaar_number}
              placeholder="jane"
            />
          </div>

          {#if !edit}
            <div class="flex flex-row">
              <p class="font-bold mt-8">Permanent Address</p>
              <!-- <p class="text-[.6em] mt-2 ml-6">
            Mandatory Fields are marked with asterick(*)
          </p> -->
              <hr />
            </div>

            <div class=" my-1 flex mt-2">
              <label class="mt-1 mr-2" for="permanent_address"
                >Address Line 1:</label
              >
              <input
                class="flex-1 border-2 rounded-md p-1"
                type="text"
                id="permanent_address"
                bind:value={body.primary_address.address_line_1}
                placeholder="jane"
              />
            </div>

            <div class=" my-1 flex mt-2">
              <label class="mt-1 mr-2" for="permanent_address"
                >Address Line 2:</label
              >
              <input
                class="flex-1 border-2 rounded-md p-1"
                type="text"
                id="permanent_address"
                bind:value={body.primary_address.address_line_2}
                placeholder="jane"
              />
            </div>

            <div class=" my-1 flex mt-2">
              <label class="mt-1 mr-2" for="permanent_city"> City:</label>
              <input
                class="flex-1 border-2 rounded-md p-1"
                type="text"
                id="permanent_city"
                bind:value={body.primary_address.city}
                placeholder="jane"
              />
            </div>

            <div class=" my-1 flex mt-2">
              <label class="mt-1 mr-2" for="permanent_state"> State:</label>
              <input
                class="flex-1 border-2 rounded-md p-1"
                type="text"
                id="permanent_state"
                bind:value={body.primary_address.state}
                placeholder="jane"
              />
            </div>

            <div class=" my-1 flex mt-2">
              <label class="mt-1 mr-2" for="permanent_pin">PIN:</label>
              <input
                class="flex-1 border-2 rounded-md p-1"
                type="text"
                id="permanent_pin"
                bind:value={body.primary_address.pincode}
                placeholder="jane"
              />
            </div>

            <div class="flex flex-row mt-8">
              <p class="font-bold">Correspondence Address</p>
              <input
                class="ml-2 mt-1"
                type="checkbox"
                bind:checked={cor_address}
              />
              <p class="text-[.6em] mt-2 ml-6">(same as permanent Address)</p>
            </div>

            {#if !cor_address}
              <div class=" my-1 flex mt-2">
                <label class="mt-1 mr-2" for="correspondence_address"
                  >Address:</label
                >
                <input
                  class="flex-1 border-2 rounded-md p-1"
                  type="text"
                  id="correspondence_address"
                  bind:value={body.secondary_address.address_line_1}
                  placeholder="jane"
                />
              </div>

              <div class=" my-1 flex mt-2">
                <label class="mt-1 mr-2" for="correspondence_address"
                  >Address:</label
                >
                <input
                  class="flex-1 border-2 rounded-md p-1"
                  type="text"
                  id="correspondence_address"
                  bind:value={body.secondary_address.address_line_2}
                  placeholder="jane"
                />
              </div>

              <div class=" my-1 flex mt-2">
                <label class="mt-1 mr-2" for="correspondence_city">
                  City:</label
                >
                <input
                  class="flex-1 border-2 rounded-md p-1"
                  type="text"
                  id="correspondence_city"
                  bind:value={body.secondary_address.city}
                  placeholder="jane"
                />
              </div>

              <div class=" my-1 flex mt-2">
                <label class="mt-1 mr-2" for="correspondence_state">
                  State:</label
                >
                <input
                  class="flex-1 border-2 rounded-md p-1"
                  type="text"
                  id="correspondence_state"
                  bind:value={body.secondary_address.state}
                  placeholder="jane"
                />
              </div>

              <div class=" my-1 flex mt-2">
                <label class="mt-1 mr-2" for="correspondence_pin">PIN:</label>
                <input
                  class="flex-1 border-2 rounded-md p-1"
                  type="text"
                  id="correspondence_pin"
                  bind:value={body.secondary_address.pincode}
                  placeholder="jane"
                />
              </div>
            {/if}
          {/if}

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="phone_residence"
              >Phone (Residence):</label
            >
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="phone_residence"
              bind:value={body.phone_residence}
              placeholder="jane"
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="phone_office">Phone (office):</label>
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="phone_office"
              bind:value={body.phone_office}
              placeholder="jane"
            />
          </div>

          <div class="flex flex-row">
            <p class="font-bold mt-8">Last Class Detail</p>
            <!-- <p class="text-[.6em] mt-2 ml-6">
            Mandatory Fields are marked with asterick(*)
          </p> -->
            <hr />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="school_name"
              >Schools/College Name:</label
            >
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="school_name"
              bind:value={body.school_name}
              placeholder="jane"
            />
          </div>

          <div class=" my-1 flex mt-2">
            <label class="mt-1 mr-2" for="school_address"> Address:</label>
            <input
              class="flex-1 border-2 rounded-md p-1"
              type="text"
              id="school_address"
              bind:value={body.school_address}
              placeholder="jane"
            />
          </div>

          <div class="flex flex-row mt-8">
            <p>Marks Obtained</p>

            <label class="text-xs mt-1 ml-4 mr-2" for="percentage_of_secondary"
              >Percentage of Class VII/VIII/IX/X</label
            >
            <input
              class="border-2 w-16"
              type="number"
              id="percentage_of_secondary"
              bind:value={body.percentage_of_secondary}
            />

            <label class="text-xs mt-1 ml-4 mr-2" for="senior_secondary_pcm"
              >%(X/XII Board, PCM-Aggregate)</label
            >
            <input
              class="border-2 w-16"
              type="number"
              id="senior_secondary_pcm"
              bind:value={body.senior_secondary_pcm}
            />

            <label class="text-xs mt-1 ml-4 mr-2" for="senior_secondary_pcb"
              >%(X/XII Board, PCB-Aggregate)</label
            >
            <input
              class="border-2 w-16"
              type="number"
              id="senior_secondary_pcb"
              bind:value={body.senior_secondary_pcb}
            />
          </div>

          <div class="flex flex-row mt-8">
            <p>Grades Obtained</p>

            <label class="text-xs mt-1 ml-4 mr-2" for="science_grades"
              >In Science</label
            >
            <input
              class="border-2 w-16 h-7"
              type="text"
              id="science_grades"
              bind:value={body.science_grades}
            />

            <label class="text-xs mt-1 ml-4 mr-2" for="math_grades"
              >In Math</label
            >
            <input
              class="border-2 w-16 h-7"
              type="text"
              id="math_grades"
              bind:value={body.math_grades}
            />

            <label class=" mt-1 justify-end ml-24 mr-2 h-7" for="board"
              >Exam Board</label
            >
            <input
              class="border-2 justify-end h-7"
              type="text"
              id="board"
              bind:value={body.board}
            />
            <label class=" mt-1 justify-end ml-4 mr-2" for="board"
              >(CBSE/ICSE/ISC/UP/Others)</label
            ><br /><br /><br />
          </div>

          <div
            class="flex flex-row p-1 bg-green-700 text-white border-2 w-full"
          >
            <p>How did you come to know about Gravity ?</p>

            <label class="mx-3 mt-1" for="promotion_team">
              Promotion Team
            </label>
            <input
              type="checkbox"
              bind:group={body.how_came_to_know}
              name="course_scoops"
              value="promotion_team"
              id="promotion_team"
            />

            <label class="mx-3 mt-1" for="newspaper"> Newspaper </label>
            <input
              type="checkbox"
              bind:group={body.how_came_to_know}
              name="course_scoops"
              value="newspaper"
              id="newspaper"
            />

            <label class="mx-3 mt-1" for="teacher"> Teacher </label>
            <input
              type="checkbox"
              bind:group={body.how_came_to_know}
              name="course_scoops"
              value="teacher"
              id="teacher"
            />

            <label class="mx-3 mt-1" for="friend_relatives">
              Friend/Relatives
            </label>
            <input
              type="checkbox"
              bind:group={body.how_came_to_know}
              name="course_scoops"
              value="friend_relatives"
              id="friend_relatives"
            />

            <label class="mx-3 mt-1" for="website"> Website </label>
            <input
              type="checkbox"
              bind:group={body.how_came_to_know}
              name="course_scoops"
              value="website"
              id="website"
              
            />

            <label class="mx-3 mt-1" for="radio_tv"> Radio/Tv </label>

            <input
              type="checkbox"
              bind:group={body.how_came_to_know}
              name="course_scoops"
              value="radio_tv"
              id="radio_tv"
            />
          </div>
          {#if !edit}
          <div class="flex flex-row mt-2">
            <hr>
            <label class="mr-3" for="fees">Total fee</label>
            <input
              class="border-2 "
              type="number"
              id="fees"
              bind:value={body.fees}
            />
          </div>
          {/if}
      
        </div>
      </div>
      <div class="md:flex md:items-center mt-4 mb-5 float-right">
        <div class="md:w-1/3 flex">
          <button
            class="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded object-right"
            on:click={handleSubmit}
            type="submit"
          >
            Submit
          </button>
        </div>
        <div class="md:w-2/3" />
      </div>
    </form>
  </div>
{/if}
