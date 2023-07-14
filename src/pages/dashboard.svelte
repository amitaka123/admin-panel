<script context="module">
</script>

<script>
  import EventsHero from "$lib/components/heroes/events_hero.svelte";
  import Phone from "$lib/components/mobile/ios/simple.svelte";
  import Hero from "$lib/components/heroes/samples.svelte";
  import Slideshow from "$lib/components/slideshow.svelte";
  import FAQ from "$lib/components/faq/hero.svelte";
  import Contact from "$lib/components/forms/inquiry.svelte";
  import Footer from "$lib/components/footer.svelte";


  import { onMount } from 'svelte';
    import ContactUs from "../lib/components/heroes/contact_us.svelte";
  let authStore;
  onMount(_initialization);
  async function _initialization(){
    authStore = (await import('$lib/stores/authentication')).authStore;
  }
  
</script>

<div class="bg-white">
  <EventsHero />
  
  <Slideshow />
  <Hero />
  
  <!-- <Phone /> -->
 
  <!-- <div class="center w-30"><ContactUs /></div> -->
  <FAQ />
  <Footer />
  
</div>
