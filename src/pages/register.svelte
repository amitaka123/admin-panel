
<script>
	export let email,password;
import Register from '$lib/components/heroes/register.svelte';
	import {onMount} from 'svelte';
import ThichNav from '$lib/components/navigation_bars/thich_nav.svelte';
import Faq from '$lib/components/faq.svelte';
import Footer from '$lib/components/footer.svelte';
import NavigationLoggedOut from '$lib/components/main_navigation.svelte';
import Rating from '$lib/components/heroes/rating.svelte';
    let loginPath = "http://localhost:3000/api";

	onMount(async ()=>{
		var token = localStorage.getItem("token");
		if(token && token!= 'null')
		{
            console.log("logged in with token: "+token);
			location.href="/user/dashboard";
		}
	});



export async function handleSubmit(){
	if(email && password)
	{
		// const res= await fetch('login.json',{method:'get'});
		const res = await fetch(loginPath+'/auth/login',{mode:'cors',method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
		if(res.status==200)
		{
			console.log(res.headers);
			var token=res.headers.get('xtoken');
			// alert(token);
			if(token)
			{
				localStorage.setItem("token",token);
			
				var text = await res.text();
				text = await JSON.parse(text);
				// user = text.user;
				location.href = "/user/dashboard";
			}
			else
			{
				console.log("no token present");
			}
			
		}
		else{
			alert("Login Failed");
			console.log(res.text());
		}
		
	}
}
</script>

<style>
	h1, figure, p {
		text-align: left;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 0em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
	
</style>
<NavigationLoggedOut />

<Register />

<Footer />