<script>
    // let productsList;
    
    import { onMount } from "svelte";
    import ProductCartItem from "$lib/request_containers/cart/cart_item.svelte";
    import cartManager from "$lib/managers/cart_manager";

    import { get } from 'svelte/store';
    let authStore;
    let total = 0;

    
    let cart=null,cartStore;
    let errorMessage="";

    onMount(async ()=>{
        console.log("inside on mount of cart");
        authStore = (await import('$lib/stores/authentication')).authStore;
        if(get(authStore).isAuthenticated())
        {
          cart = await cartManager.getCart();
          cartStore = await cartManager.getCartStore();
          // cartStore
          if(!cart)
          {
            errorMessage="Could not bring up the cart";
          }

        }
        else{
          errorMessage = "Please login to continue";
        }   
    });

</script>
{#if $cartStore && $cartStore.error==false}
<div class="bg-white">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <h2 class="text-4xl text-center p-10">Cart Details</h2>
      </nav>
      <!-- Product info -->
      <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Total Items: {$cartStore.cart.length}</h1>
        </div>
        <!-- Options -->
        <div class="mt-4 lg:mt-0 lg:row-span-3">
          <h2 class="sr-only">Products information</h2>
          
        </div>
        <div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>
            <div class="space-y-6">
              <!-- <p class="text-base text-gray-900">{cart.createdAt}</p> -->
            </div>
          </div>
          <!-- <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Total Items: {cart.length}</h3>
          </div> -->
          
            {#each $cartStore.cart as item}
            <ProductCartItem productId={item.product} />
              {/each}

              <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$0.00</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6">
                  {#if $cartStore.cart.length >0}
                  <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                  {/if}
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                     <a href="/marketplace/products" type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></a>
                  </p>
                </div>
              </div>
            
        </div>
      </div>
    </div>
</div>

{:else}
  <p>{errorMessage}</p>
{/if}