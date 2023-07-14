<script>
    // let productsList;
  
    export let order;
    
import OrderItem from "$lib/request_containers/orders/orders_product_item.svelte";
    import { onMount } from "svelte";
  
    import { get } from 'svelte/store';
import OrderProductsListItem from "./order_products_list_item.svelte";
    
    let authStore;
    let _initialize= async ()=>{
        
    }
  
    onMount(_initialize);
  
  </script>
  {#if order}
  <div class="bg-white">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <!-- <h2 class="text-4xl text-center p-10">User Order: {order._id}</h2> -->
      </nav>
      <!-- Product info -->
      <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        
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
          
            {#each order.items as item}
              <OrderItem productId={item.product} />
            {/each}
  
              
            
        </div>
      </div>
    </div>
  </div>
  {/if}
  
  <!-- <Footer /> -->