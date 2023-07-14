
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
  let body={

  };

  let student_batches=[];
  let student_compatible=[];
  
  let date = new Date();

  

  let myURL = "";

  let cor_address = false;

  let permanent_address = "",
    permanent_city = "",
    permanent_state = "",
    permanent_pin = "";

    async function getStudentBatches() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/batches/student_batches_ids/"+studentId, {
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
          student_batches = response.data;
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
    console.log(student_batches);
    
  }

  async function getStudentCompatibleBatches() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/batches/student_compatible/"+studentId, {
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
          student_compatible = response.data;
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
    console.log("Student compatible");
    console.log(student_compatible);
  }

  async function batchAddStudent(batchId) {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/batches/batch_add_student/"+batchId+"/"+studentId, {
      mode: "cors",
      method: "post",
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
          location.reload();
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

  async function batchRemoveStudent(batchId) {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/batches/batch_remove_student/"+batchId+"/"+studentId, {
      mode: "cors",
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          location.reload();
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
    await getStudentBatches();
    await getStudentCompatibleBatches();

  });
</script>

<h1 class="text-center text-2xl">Batches</h1>
<p class="text-center">Please Add/Remove student from batches </p>
<table class="w3-table-all w3-hoverable">
  <thead>
    <tr class="w3-light-grey">
      <th>Batch ID</th>
      <th>Class</th>
      <th>Centre</th>
      <th>Stream</th>
      <th>#Lectures</th>
      <th>#Students</th>
      <th>Student Added</th>
      <th>Toggle Entry</th>
      <!-- <th>Email Id</th>
      <th>Student ID</th> -->
    </tr>
  </thead>
  {#each student_compatible as batch}
  <tr class="w3-hover-shadow">
      <td>{batch._id}</td>
      <td>{batch.class_number}</td>
      <td>{batch.branch.name}</td>
      <td>{batch.stream.name}</td>
      <td>{batch.lectures.length}</td>
      <td>{batch.students.length}</td>
      <td>{student_batches.includes(batch._id)}</td>
      {#if student_batches.includes(batch._id)}
      <td><button class="btn" on:click={()=>batchRemoveStudent(batch._id)}>Remove</button></td>
      {:else}
      <td><button class="btn" on:click={()=>batchAddStudent(batch._id)}>Add</button></td> 
      {/if}
  </tr>
  {/each}
</table>


