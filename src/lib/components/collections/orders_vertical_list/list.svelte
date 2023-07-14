<script>
    export const list=[];
    export const heading="";
    export const subheading="";
    export const target="#";

    import ListItem from "./list_item.svelte";

</script>


<div class="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
    <span class="font-semibold text-lg text-primary  block">
   
    </span>
    <h2 class=" text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">{heading}</h2>
    <p class="text-blue-700 text-body-color text-1xl">{subheading}</p>
</div>


{#if target!="#"} 
    <div>
        <a href={target}>View All</a>
    </div>
{/if}

<div class="w-full m-10 p-10 space-x-10 bg-gradient-to-r from-black-300 to-grey-200">

{#if list.length>0}
    {#each list as list_item}
        <ListItem listData={list_item} />
    {/each}
{/if}

</div>
