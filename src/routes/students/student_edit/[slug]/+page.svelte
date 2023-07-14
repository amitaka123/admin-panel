
<script>
  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import Admissions from "../../../../lib/components/forms/admissions.svelte";

  // import ImageUpload from "../../../_utils/imageUpload.svelte.js";

   /** @type {import('./$types').PageData} */
  export let data;
  export let studentId = data.studentId;
  console.log("studentID from slug:"+studentId);
  // let body;
  
  // let date = new Date();

  // let streams = [],
  //   branches = [],
  //   student_batches = [],
  //   student_compatible_batches = [];

  // let myURL = "";

  // let cor_address = false;

  // let permanent_address = "",
  //   permanent_city = "",
  //   permanent_state = "",
  //   permanent_pin = "";

  //   async function getStudent() {
  //   var token = localStorage.getItem("token");
  //   var res;
  //   var loginPath = get(ApiUrl);
  //   console.log("trying branches");
  //   var res = await fetch(loginPath + "/panel/student/"+studentId, {
  //     mode: "cors",
  //     method: "get",
  //     headers: {
  //       Authorization: "Bearer " + token,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (res.status == 200) {
  //     try {
  //       let response = await res.text();
  //       response = await JSON.parse(response);
  //       if (response.status == "success") {
  //         body = response.data;
  //         // batches= response.data.batches;
  //       } else {
  //         console.log(response.message);
  //       }
  //     } catch (e) {
  //       console.log("caught1");
  //       alert("Some problem has occured, see console for more info.");
  //       console.log(e.message);
  //     }
  //   } else {
  //     console.log(await res.text());
  //   }
  // }

  // let src = "../images/";

  

  // onMount(async () => {
  //   console.log("mounted");
  //   let loginPath = get(ApiUrl);
  //   await getStudentbatches();
  //   await getStudentcompatiblebatches();

  // });
</script>
<Admissions edit={true} studentId={studentId}/>


<!-- {#if body}

{/if} -->
