<script lang="ts">
    // import type { ActionData } from "./$types";
    // import { applyAction, enhance } from "$app/forms";
    // import { invalidateAll } from "$app/navigation";

    // export let form: ActionData;

    export async function handleSubmit() {
        // if (email && password) {
        // 	// const res= await fetch('login.json',{method:'get'});
        // 	const res = await fetch(loginPath + "/panel/authentication/login", {
        // 		mode: "cors",
        // 		method: "post",
        // 		headers: { "Content-Type": "application/json" },
        // 		body: JSON.stringify({ email, password }),
        // 	});
        // 	if (res.status == 200) {
        // 		var response = await res.text();
        // 		let data = await JSON.parse(response);
        // 		if (data.status == "success") {
        // 			let user = data.user;
        // 			let token = user.token;
        // 			console.log(token);
        // 			localStorage.setItem("token", token);
        // 			location.href = "/admission";
        // 		} else {
        // 			console.log(data.message);
        // 			alert(data.message);
        // 		}
        // 	} else {
        // 		alert("Login Failed");
        // 		console.log(res.text());
        // 	}
        // }
    }
</script>

<div class="mx-auto max-w-screen-xl px-10 py-40 sm:px-6 lg:px-8 pt-[10%] w-1/3">
    <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Forgot Password</h1>
    </div>

    <div class="mx-auto mt-12 mb-0 max-w-md">
        {#if true}
            <div
                role="alert"
                class="rounded border border-red-200 bg-red-50 p-4"
            >
                <p class="text-sm text-red-700">
                    <!-- Username is already taken, please try another one. -->
                    Please type your registered E-mail address
                </p>
            </div>
        {/if}
    </div>
    <br />

    <!-- <form action="?/register" method="POST" class="mx-auto mt-8 mb-0 max-w-md space-y-4" use:enhance> -->
    <form
        class="flex flex-col mx-auto mt-8 mb-0 max-w-md space-y-4"
        on:submit|preventDefault={handleSubmit}
    >
        <div>
            <label for="username">Email Address</label><br />

            <div class=" ">
                <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                    placeholder="Enter username"
                />
            </div>
        </div>

        <!-- <div>
        <label for="password" class="sr-only">Password</label>
        <div class="relative">
          <input
            required
            type="password"
            id="password"
            name="password"
            class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter password"
          />
        </div>
      </div> -->

        <div class="flex items-center justify-between">
            <!-- <p class="text-sm text-gray-500">
          Already have an account?
          <a class="underline" href="/login">Log in</a>
        </p> -->

            <button
                type="submit"
                class="inline-flex items-center rounded border border-cyan-600 bg-cyan-600 px-6 py-3 text-white focus:outline-none"
            >
                <span class="text-sm font-medium"> Submit </span>

                <svg
                    class="ml-3 h-5 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </button>
            {#if true}
                <div
                    role="alert"
                    class="rounded border border-red-200 bg-red-50 p-4"
                >
                    <p class="text-sm text-red-700">
                        <!-- Username is already taken, please try another one. -->
                        Please type your registered E-mail address
                    </p>
                </div>
            {/if}
        </div>
    </form>
</div>
