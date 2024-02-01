
<template>
  <div id="map">
  </div>
</template>


<script setup>
  /* eslint-disable */
  import { onMounted, ref } from 'vue'
  import { Loader } from "@googlemaps/js-api-loader"

  const map = ref()
  onMounted(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDiNB6iFozzwqoJA9kBQL-0H_U6-szVOW4",
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

<style>
#map {
  height: 500px;
}
</style>