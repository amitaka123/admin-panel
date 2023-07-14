<script>
  import { openModal } from 'svelte-modals';
  import Modal from '$lib/components/modals/authModal.svelte';
  function handleLogin() {
    openModal(Modal)
  }

  // import {CartManager} from '$lib/managers/cart_manager';


  let buttonTitle="Add to Cart"

    export let product;
    import { onMount } from "svelte";
import { get } from "svelte/store";

    onMount(_initialize);

    let authStore;
    let cartManager;
    // let cartStore;

    async function _initialize(){
        authStore = (await import('$lib/stores/authentication')).authStore;
        if(get(authStore).isAuthenticated()){
          cartManager = (await import('$lib/managers/cart_manager')).default;
          if(await cartManager.checkIfPresentInCart(product._id)){
            buttonTitle="Added to Cart";
          }
          console.log(cartManager);
        }
    }


    async function handleAddToCart(){
      if(get(authStore).isAuthenticated()){
          // console.log(product);
          // let {default:cartManager} = (await import('$lib/managers/cart_manager'));
          // console.log(cartManager);
          if(await cartManager.checkIfPresentInCart(product._id))
          {
            alert("item already in the cart!");
            buttonTitle="Added to Cart";
            return;
          }
          let res=await cartManager.addItem(product._id);
          console.log(res);
          if(res)
          {
            buttonTitle="Added to Cart";
          }
          else{
            buttonTitle = "Error adding to cart";
          }
        }
      else{
        alert("Sorry, you do not seem like logged in, please sign in first!");
      }
    }


    




</script>

<div class="bg-white">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <h2 class="text-3xl p-10">Product Details!</h2>
      </nav>
  
      <!-- Image gallery -->
      <div class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div class="card shadow aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
          <img src="/dowser.png" class="w-full h-full object-center object-cover">
        </div>
        <!-- <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-center object-cover">
          </div> -->
        <!-- <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg" alt="Model wearing plain black basic tee." class="w-full h-full object-center object-cover">
          </div>
          <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg" alt="Model wearing plain gray basic tee." class="w-full h-full object-center object-cover">
          </div>
        </div> -->
        <div class="card shadow aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
          <img src="/dowser.png" alt="Model wearing plain white basic tee." class="w-full h-full object-center object-cover">
        </div>
        <!-- <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4 m-2">
            <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Model wearing plain white basic tee." class="w-full h-full object-center object-cover">
          </div>
          <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4 m-2">
            <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Model wearing plain white basic tee." class="w-full h-full object-center object-cover">
          </div> -->
      </div>
  
      <!-- Product info -->
      <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
        </div>
  
        <!-- Options -->
        <div class="mt-4 lg:mt-0 lg:row-span-3">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl text-gray-900">${product.price}</p>
  
          <!-- Reviews -->
          <div class="mt-6">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <!--
                  Heroicon name: solid/star
  
                  Active: "text-gray-900", Default: "text-gray-200"
                -->
                <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
  
                <!-- Heroicon name: solid/star -->
                <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
  
                <!-- Heroicon name: solid/star -->
                <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
  
                <!-- Heroicon name: solid/star -->
                <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
  
                <!-- Heroicon name: solid/star -->
                <svg class="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p class="sr-only">4 out of 5 stars</p>
              <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
            </div>
          </div>
  
          <form class="mt-10">
            <!-- Colors -->
            <div>
              <h3 class="text-sm text-gray-900 font-medium">Color</h3>
  
              <fieldset class="mt-4">
                <legend class="sr-only">Choose a color</legend>
                <div class="flex items-center space-x-3">
                  <!--
                    Active and Checked: "ring ring-offset-1"
                    Not Active and Checked: "ring-2"
                  -->
                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none shadow-xl">
                    <input type="radio" name="color-choice" value="White" class="sr-only" aria-labelledby="color-choice-0-label">
                    <span id="color-choice-0-label" class="sr-only"> White </span>
                    <span aria-hidden="true" class="h-8 w-8 bg-gray-500  rounded-full"></span>
                  </label>
  
                  <!--
                    Active and Checked: "ring ring-offset-1"
                    Not Active and Checked: "ring-2"
                  -->
                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none shadow-xl">
                    <input type="radio" name="color-choice" value="Gray" class="sr-only" aria-labelledby="color-choice-1-label">
                    <span id="color-choice-1-label" class="sr-only"> Green </span>
                    <span aria-hidden="true" class="sadow-xl h-8 w-8 bg-green-200   rounded-full"></span>
                  </label>
  
                  <!--
                    Active and Checked: "ring ring-offset-1"
                    Not Active and Checked: "ring-2"
                  -->
                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ">
                    <input type="radio" name="color-choice" value="Black" class="sr-only" aria-labelledby="color-choice-2-label">
                    <span id="color-choice-2-label" class="sr-only"> Orange </span>
                    <span aria-hidden="true" class="h-8 w-8 bg-orange-400 rounded-full"></span>
                  </label>
                </div>
              </fieldset>
            </div>
  
            <!-- Sizes -->

            {#if $authStore && $authStore.isAuthenticated()}

              <p on:click={handleAddToCart} class="btn mt-10 w-full bg-purple-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">{buttonTitle}</p>
            {:else}
            <p on:click={handleLogin} class="btn mt-10 w-full bg-purple-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Login to buy...</p>

            {/if}

          </form>
        </div>
  
        <div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>
  
            <div class="space-y-6">
              <p class="text-base text-gray-900">Ultimate Healing Lamp</p>
            </div>
          </div>
  
          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
  
            <div class="mt-4">
              <ul role="list" class="pl-4 list-disc text-sm space-y-2">
                <li class="text-gray-400"><span class="text-gray-600">Hand cut and sewn locally</span></li>
  
                <li class="text-gray-400"><span class="text-gray-600">Dyed with our proprietary colors</span></li>
  
                <li class="text-gray-400"><span class="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
  
                <li class="text-gray-400"><span class="text-gray-600">Ultra-soft 100% cotton</span></li>
              </ul>
            </div>
          </div>
  
          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Details</h2>
  
            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  