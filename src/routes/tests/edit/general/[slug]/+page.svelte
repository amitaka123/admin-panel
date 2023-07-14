<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let testId = data.testId;
  console.log("studentID from slug:" + testId);
  
  import { onMount } from "svelte";
  import { Token } from "../../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import { bubble } from "svelte/internal";
  import Test from "../../../../_utils/_tests/general.svelte";
  
  let test;
  // let date= new Date(certificate.timestamp);
  // let d= new Date(date).toLocaleDateString('en-US', {
  // day: '2-digit',
  // month: '2-digit',
  // year: 'numeric',
  // });
  var token;
  var loginPath;
  // var jsonQuestion;
  
  // let day= date.getDay();
  
  onMount(async () => {
  console.log(testId);
  console.log("mounted");
  // localStorage.setItem("token","some value");
  
  token = localStorage.getItem("token");
  if (!token) {
  console.log("yes");
  location.href = "/login";
  }
  Token.set(token);
  loginPath = get(ApiUrl);
  
  // console.log(loginPath+'/auth/whoami');
  // loginPath = "/api"
  const res = await fetch(loginPath + "/panel/test_get/" + testId, {
  mode: "cors",
  method: "get",
  headers: { Authorization: "Bearer " + token },
  });
  if (res.status == 200) {
  try {
  let response = await res.text();
  console.log(response);
  
  response = await JSON.parse(response);
  if (response.status == "success") {
  console.log("got questions");
  test = response.data;
  console.log(test);
  } else {
  console.log(response.message);
  alert(response.message);
  }
  } catch (e) {
  console.log("caught");
  
  console.log(e);
  } finally {
  }
  
  // let data = JSON.parse(text);
  } else {
  console.log(await res.text());
  // user.email="no logged";
  }
  //
  });
  </script>
  
  <div class="container w3-card" style="--template-color:red">
  {#if test}
  <Test edit={true} body={test} />
  {/if}
  </div>
  
  <style>
  * {
  color: rgb(51, 51, 51);
  }
  /*
  By default, CSS is locally scoped to the component,
  and any unused styles are dead-code-eliminated.
  In this page, Svelte can't know which elements are
  going to appear inside the {{{post.html}}} block,
  so we have to use the :global(...) modifier to target
  all elements inside .content
  */
  .content :global(h2) {
  font-size: 1.4em;
  font-weight: 500;
  }
  
  .content :global(pre) {
  background-color: #dfc502;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
  padding: 0.5em;
  border-radius: 2px;
  overflow-x: auto;
  }
  
  .content :global(pre) :global(code) {
  background-color: transparent;
  padding: 0;
  }
  
  .content :global(ul) {
  line-height: 1.5;
  }
  
  .content :global(li) {
  margin: 0 0 0.5em 0;
  }
  
  .container {
  width: 100%;
  /* border:1px solid rgb(140, 140, 140); */
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* background: linear-gradient(45deg,rgb(134, 60, 253),var(--template-color)); */
  }
  img {
  display: block;
  width: 150px;
  }
  .certificate {
  font-size: 120px;
  font-family: "MonteCarlo", cursive;
  }
  .organization {
  color: black;
  font-size: 80px;
  font-family: "MonteCarlo", cursive;
  }
  .cont {
  font-family: "MonteCarlo", cursive;
  font-size: 30px;
  }
  .straight {
  font-family: "Merriweather", serif;
  
  /* font-family: 'MonteCarlo', cursive; */
  }
  .flex {
  margin-top: 30px;
  display: flex;
  align-items: stretch;
  }
  .flexit {
  flex: 1;
  padding: 20px;
  }
  p {
  width: 100%;
  margin: 0;
  text-align: center;
  }
  h1 {
  margin: 300px;
  }
  </style>
  
  