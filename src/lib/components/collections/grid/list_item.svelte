<script>
    export var listData={
        id:0,
        item_type:"-",
        image_url:"-",
        description:"-",
        title:"-",
        subtitle:"-",
        info:"-",
        target:"#"
    };

    export let first=false;

</script>

<div class=" {first?"ml-10":""} rounded-xl transition ease-in-out delay-0 bg-white-500 hover:-translate-y-1 hover:scale-100 hover:shadow-xl shadow hover:scale-120 duration-300">
    <a href={listData.target}>
        <div class="card ">
            {#if listData.image_url!="-"}
                <figure>
                    <img src={listData.image_url}  class="w-56 h-56" alt={listData.title+"image"}>
                </figure>
            {/if}
            <hr>
            <div class="card-body">
              
              <h2 class="text-lg text-purple-600 text-center "><span class="text-2xl">$</span>{listData.subtitle}</h2>
              <p class="text-xs text-gray-500">Name</p>
              <p class="p-2 card-title text-center">{listData.title}</p>
              <p class="text-xs text-gray-500">Type</p>
              {#if listData.item_type}
              <p class="text-gray-500 text-sm ">{listData.item_type.toUpperCase()}</p>

              {/if}
              {#if listData.info}
                <p class="text-grey-200 text-sm">{listData.info}</p>
              {/if}
            </div>
          </div>
    </a>
</div> 
