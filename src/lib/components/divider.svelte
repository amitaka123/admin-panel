<script>
import Calendar from "./calendar.svelte";
import Stats from "./stats.svelte";

let entered = "";
let isCorrect = null;
let attempted = false;

function check(){
  if(entered=="winsor")
  {
    isCorrect= true;
  }
  else{
    isCorrect = false;
  }
  attempted = true;
  // entered= "";
}


function enter(word)
{
  if(attempted)
  {
    entered="";
    attempted=false;
  }
  entered+=word;
  
}
</script>
<style>
    .kbd{
        height:70px;
        width:80px;
        background-color: white;
        color:grey;
        cursor:pointer;
        box-shadow: 2px 2px 5px gray;
    }
    .kbd:hover{
      /* color:white;  */
      /* font-size:xx-large */
      box-shadow: 1px 1px 2px grey;
    }


    .kbd-enter{
        height:70px;
        width:80px;
        background-color: white;
        color:#2a34b6;
        border: 1px solid #2a34b6;
        cursor:pointer;
        box-shadow: 5px 5px 5px grey;
    }
    .kbd-enter:hover{
      /* color:white;  */
      box-shadow: 2px 2px 5px grey;
      /* font-size:large */
    }

    .tr{
        color:#2a34b6;
    }
</style>
<div class="flex flex-col w-full lg:flex-row p-20 h-100 overflow-y-auto bg-white">
    <div class="grid flex-grow card  rounded-box place-items-center">
        <Stats />
        
        {#if entered != ""}
         <p class="text-3xl"> {entered.toUpperCase()}</p>
        {/if}
        {#if isCorrect != null}
          {#if !isCorrect}
          <p class="text-red-800">Wrong!!</p>
          {:else}
          <p class="text-green-800">Right!!</p>
          {/if}

        {/if}

        
        <!-- <Calendar /> -->
        <p class="text-xl text-green-800">Can you guess the WORD?!!?</p>
        <div class="flex justify-center gap-1 my-1 w-full">
            <kbd class="kbd text-blue-700" on:click={()=>{;}}>q</kbd>
            <kbd class="kbd text-3xl tr bg-neutral"  on:click={()=>{enter('w');}}>W</kbd>
            <kbd class="kbd"  on:click={()=>{;}}>e</kbd>
            <kbd class="kbd text-3xl tr bg-neutral"  on:click={()=>{enter('r');}}>r</kbd>
            <kbd class="kbd"  on:click={()=>{;}}>t</kbd>
            <kbd class="kbd"  on:click={()=>{;}}>y</kbd>
            <kbd class="kbd"  on:click={()=>{;}}>u</kbd>
            <kbd class="kbd text-3xl tr bg-neutral"  on:click={()=>{enter('i');}}>i</kbd>
            <kbd class="kbd text-3xl tr bg-neutral"  on:click={()=>{enter('o');}}>o</kbd>
            <kbd class="kbd" >p</kbd>
          </div> 
          <div class="flex justify-center gap-1 my-1 w-full">
            <kbd class="kbd">a</kbd>
            <kbd class="kbd text-3xl tr bg-neutral" on:click={()=>{enter('s');}}>s</kbd>
            <kbd class="kbd">d</kbd>
            <kbd class="kbd">f</kbd>
            <kbd class="kbd">g</kbd>
            <kbd class="kbd">h</kbd>
            <kbd class="kbd">j</kbd>
            <kbd class="kbd">k</kbd>
            <kbd class="kbd">l</kbd>
            <kbd class="flex items-center justify-center rounded-lg  kbd-enter"  on:click={()=>{check();}}>ENTER</kbd>
          </div> 
          <div class="flex justify-center gap-1 my-1 w-full">
            <kbd class="kbd">z</kbd>
            <kbd class="kbd">x</kbd>
            <kbd class="kbd">c</kbd>
            <kbd class="kbd">v</kbd>
            <kbd class="kbd">b</kbd>
            <kbd class="kbd text-3xl tr bg-neutral shadow" on:click={()=>{enter('n');}}>n</kbd>
            <kbd class="kbd">m</kbd>
            
          </div>
    </div> 
    <div class="divider lg:divider-horizontal"></div> 
    <div class="grid flex-grow card  sticky-top-0 rounded-box place-items-center">
        <Calendar />
    </div>
  </div>