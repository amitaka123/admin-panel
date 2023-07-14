<script>
    import CartDetails from '$lib/components/cart/cart_details.svelte';
    import {onMount} from 'svelte';
    import { get } from 'svelte/store';
    let authStore;

    onMount(_initialize);

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        if(get(authStore).isAuthenticated()){
            console.log("moving ahead with the cart page");
        }
        else{
            location.href="/";
        }
    }

   
</script>

<CartDetails />
