
<template>
  <div class="h-[500px]" id="map">
  </div>
</template>


<script setup>
  import { onMounted, ref } from 'vue'
  import { Loader } from "@googlemaps/js-api-loader"

  const map = ref()
  onMounted(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });
    let googlemaps
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      googlemaps = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  })
</script>
