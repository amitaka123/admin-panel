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

</script>

<div class="carousel-item rounded-xl w-300 transition ease-in-out delay-0 bg-white-500 hover:-translate-y-1 hover:scale-100 hover:shadow-xl shadow hover:scale-120 duration-300">
    <a href={listData.target}>
        <div class="card  ">
            {#if listData.image_url!="-"}
                <figure>
                    <img src={listData.image_url}  class="w-56 h-56" alt={listData.title+"image"}>
                </figure>
            {/if}
            <div class="card-body">
              
              <span class="text-sm text-center ">{listData.title}</span>
              <p class="card-title text-center">{listData.item_type}</p>
              <p class="text-blue-500 text-lg ">Rs.{listData.subtitle}</p>
              {#if listData.info}
                <p class="text-grey-200 text-sm">{listData.info}</p>
              {/if}
            </div>
          </div>
    </a>
</div> 
