<script>
    export var list;
    export let removeFunction=null;
    export const width=56;
    export const height=56;

    console.log("inside carousal"+list.length);

</script>

<style>
    img{
        object-fit: contain;
        padding:10px;

    }
</style>
<!-- <div class="carousel carousel-center"> -->
<div class="carousel carousel-center ">
        
            {#each list as image_url}
            <div class="m-5 card w-192 carousel-item rounded-xl transition ease-in-out delay-0 bg-white-500 hover:-translate-y-1 hover:scale-100 hover:shadow-xl duration-300">
                <figure>
                    <img src={image_url}  class="w-{width} h-{height}" alt="-">
                </figure>
                
                {#if removeFunction}
                    <p class="btn m-5 bg-red-500 border-none shadow-xl" on:click={()=>{removeFunction(image_url)}} >Delete</p>
                {/if}
            </div>
            {/each}
          
</div> 
<!-- </div> -->
