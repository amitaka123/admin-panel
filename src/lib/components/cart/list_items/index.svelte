<script>
    export let product;

    import cartManager from "$lib/managers/cart_manager";

    async function handleRemove(){
      let ret=cartManager.removeItem(product._id);
    }

    // export let quan
</script>





<div class="pointer-events-auto w-full">
    <div class="flex h-full flex-col bg-white">
      <div class="flex-1 py-6 px-4 sm:px-6">


        <div class="mt-0">
          <div class="flow-root">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
              <li class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src="{product.thumbnail}" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center">
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#"> {product.name} </a>
                      </h3>
                      <p class="ml-4">$90.00</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{product.product_type}</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty 1</p>

                    <div class="flex">
                      <button type="button" on:click={handleRemove} class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      
    </div>
  </div>

