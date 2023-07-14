
<script>
  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  // import ImageUpload from "../../../_utils/imageUpload.svelte.js";

   /** @type {import('./$types').PageData} */
  export let data;
  export let studentId = data.studentId;
  console.log("studentID from slug:"+studentId);
  let body;
  
  let date = new Date();

  let streams = [],
    branches = []
    student_batches = []
    student_compatible_batches = [];

  let myURL = "";

  let cor_address = false;

  let permanent_address = "",
    permanent_city = "",
    permanent_state = "",
    permanent_pin = "";

    async function getStudent() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/student/"+studentId, {
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
          body = response.data;
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

  let src = "../images/";

  

  onMount(async () => {
    console.log("mounted");
    let loginPath = get(ApiUrl);
    await getStudentbatches();
    await getStudentcompatiblebatches();

  });
</script>


{#if body}
<div class="">
  <!-- <h3 class=" text-5xl">Students</h3> -->
  <div class="container" style="--template-color:red">
    <a
      class="w3-button w3-round w3-card w3-hover-green w3-margin"
      href="/admission/student_batches/{studentId}"
      >Batches</a
    >
    <a
      class="w3-button w3-round w3-card w3-hover-green w3-margin"
      href="/admission/create/student_onboarding/fee_management"
      >Fee Management</a
    >
    <a
      class="w3-button w3-round w3-card w3-hover-green w3-margin"
      href="/admission/create/student_onboarding/edit_student">Edit</a
    >
    
    <a
      class="w3-button w3-round w3-card w3-hover-green w3-margin"
      href="/admission/create/student_onboarding/addresses"
      >Addresses</a
    >

    <a
      class="w3-button w3-round w3-card w3-hover-red w3-margin"
      href="/admission/create/student_onboarding/addresses"
      >Delete</a
    >

  </div>

  {#if body}
  <!-- {JSON.stringify(body)} -->
    <div class="mt-6">
      <p class="text-center text-xl">ADMISSION FORM</p>
      <form id="registration" class="w-full mx-auto p-6">
        <img
          src={body.profilePicture}
          alt=""
        />
        <div class=" flex flex-col">
          <p class="w3-left">Branch</p>

          <p class="w3-input w3-border w3-round w3-margin">
            {body.branch}
          </p>

          <p class="w3-left">Stream</p>

          <p class="w3-input w3-border w3-round w3-margin">
            {body.stream}
          </p>
          <!-- <p class="w3-left">Select Batch</p>

          <p class="w3-input w3-border w3-round w3-margin">{body.batch}</p> -->

          <p>Class</p>
          <p class="w3-input w3-border w3-round w3-margin">{body.class_number}</p>

          <div class="mx-5 my-6">
            <div class="flex flex-row">
              <p class="font-bold">Personal Details</p>
              <!-- <p class="text-[.6em] mt-2 ml-6">
                Mandatory Fields are marked with asterick(*)
              </p> -->
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="student_name">Student Name:</p>
              <p class="flex-1 border-2 rounded-md p-1">
                {body.name}
              </p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="father_name">
                Father's/Guardian's name:
              </p>
              <p class="flex-1 border-2 rounded-md p-1">
                {body.father_name}
              </p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="mother_name">Mother's Name:</p>
              <p class="flex-1 border-2 rounded-md p-1">
                {body.mother_name}
              </p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="occupation_of_father">
                Occupation of Father/Guardian:
              </p>
              <p class="flex-1 border-2 rounded-md p-1">
                {body.occupation_of_father}
              </p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="occupation_of_mother">
                Occupation of Mother:
              </p>
              <p class="flex-1 border-2 rounded-md p-1" type="text">
                {body.occupation_of_mother}
              </p>
            </div>

            <div class="flex flex-row">
              <div class=" my-1 mt-2">
                <p class="mt-1 mr-1" for="date_of_birth">Date of Birth:</p>
                <p class=" border-2 rounded-md p-1">
                  {body.date_of_birth}
                </p>
              </div>

              <div class=" ml-20 mt-4">
                <p class="mt-1 mr-1">Gender:</p>
                <p id="gender">{body.gender}</p>
              </div>

              <div class=" ml-20 mt-4">
                <p class="mt-1 mr-1">Blood Group:</p>
                <p>{body.blood_group}</p>
              </div>

              <div class=" ml-20 mt-4">
                <p class="mt-1 mr-1">Category:</p>
                <p>{body.category}</p>
              </div>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" > Nationality </p>
              <p
                class="flex-1 border-2 rounded-md p-1"
                
               
                
              >{body.nationality}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="mobile_parents"
                >Mobile Parents:</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{body.mobile_parents}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="mobile_students"
                >Mobile Students:</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
               
              >{body.phone}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="e_mail_id">E-Mail ID:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
               
              >{body.email}</p>
            </div>

            <!-- <div class="flex flex-row">
              <p class="font-bold mt-8">Permanent Address</p> -->
             
              <!-- <hr />
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" >Address:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
               
              >{body.permanent_address}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="permanent_city"> City:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{body.permanent_city}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="permanent_state"> State:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{body.permanent_state}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" >PIN:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
               
              >{body.permanent_pin}</p>
            </div> -->

            <!-- <div class="flex flex-row mt-8">
              <p class="font-bold">Correspondence Address</p>
              
              <p class="text-[.6em] mt-2 ml-6">(same as permanent Address)</p>
            </div> -->

            
              <!-- <div class=" my-1 flex mt-2">
                <p class="mt-1 mr-2" 
                  >Address:</p
                >
                <p>{body.correspondence_address}</p>
              </div>

              <div class=" my-1 flex mt-2">
                <p class="mt-1 mr-2" >
                  City:</p
                >
                <p>{body.correspondence_city}</p>
              </div>

              <div class=" my-1 flex mt-2">
                <p class="mt-1 mr-2" >
                  State:</p
                >
                <p>{body.correspondence_state}</p>
              </div>

              <div class=" my-1 flex mt-2">
                <p class="mt-1 mr-2" >PIN:</p>
                <p>{body.correspondence_pin}</p>
              </div> -->
            

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" 
                >Phone (Residence):</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
               >{body.phone_residence}</p> 
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" >Phone (office):</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{body.phone_office}</p>
            </div>

            <div class="flex flex-row">
              <p class="font-bold mt-8">Last Class Detail</p>
              <!-- <p class="text-[.6em] mt-2 ml-6">
            Mandatory Fields are marked with asterick(*)
          </p> -->
              <hr />
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" 
                >Schools/College Name:</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{body.school_name}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" >
                Address:</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{body.school_address}</p>
            </div>

            <div class="flex flex-row mt-8">
              <p>Marks Obtained</p>

              <p
                class="text-xs mt-1 ml-4 mr-2"
                
                >Percentage of Class VII/VIII/IX/X</p
              >
              <p
                class="border-2 w-16"
                
              >{body.percentage_of_secondary}</p>

              <p class="text-xs mt-1 ml-4 mr-2" 
                >%(X/XII Board, PCM-Aggregate)</p
              >
              <p
                class="border-2 w-16"
                
              >{body.senior_secondary_pcm}</p>

              <p class="text-xs mt-1 ml-4 mr-2" 
                >%(X/XII Board, PCB-Aggregate)</p
              >
              <p
                class="border-2 w-16"
                
              >{body.senior_secondary_pcb}</p>
            </div>

            <div class="flex flex-row mt-8">
              <p>Grades Obtained</p>

              <p class="text-xs mt-1 ml-4 mr-2" 
                >In Science</p
              >
              <p
                class="border-2 w-16 h-7"
                
              >{body.science_grades}</p>

              <p class="text-xs mt-1 ml-4 mr-2" 
                >In Math</p
              >
              <p
                class="border-2 w-16 h-7"
                
              >{body.math_grades}</p>

              <p class=" mt-1 justify-end ml-24 mr-2 h-7" 
                >Exam Board</p
              >
              <p
                class="border-2 justify-end h-7"
                
              >{body.board}</p>
              <p class=" mt-1 justify-end ml-4 mr-2" 
                >(CBSE/ICSE/ISC/UP/Others)</p
              ><br /><br /><br />
            </div>

            <div
              class="flex flex-row p-1 bg-green-700 text-white border-2 w-full"
            >
              <p>How did you come to know about Gravity ?</p>

              <p class="mx-3 mt-1" for="promotion_team">
                Promotion Team
              </p>
              <p
                
              >{body.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="newspaper"> Newspaper </p>
              <p
                
              >{body.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="teacher"> Teacher </p>
              <p
                
              >{body.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="friend_relatives">
                Friend/Relatives
              </p>
              <p
                
              >{body.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="website"> Website </p>
              <p
                
                required
              >{body.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="radio_tv"> Radio/Tv </p>

              <p
                
              >{body.how_came_to_know}</p>
            </div>
          </div>
        </div>
        <div class="md:flex md:items-center mt-8">
          <div class="md:w-1/3 flex">
            <!-- <button
              class="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded object-right"
              on:click|preventDefault={handleSubmit}
              type="button"
            >
              Submit
            </button> -->
          </div>
          <div class="md:w-2/3" />
        </div>
      </form>
    </div>
  {/if}
</div>
{/if}
