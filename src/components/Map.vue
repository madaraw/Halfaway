
<template>
  <div class="h-[500px]" id="map">
  </div>
</template>


<script setup>
  import { onMounted, ref } from 'vue'
  import { Loader } from "@googlemaps/js-api-loader"

  const map = ref(null)
  const placeMarkers = (info1, info2) => {
    createMarker(info1.places[0].location)
    createMarker(info2.places[0].location)
  }
  let createMarker = null
  defineExpose({ placeMarkers })
  onMounted(() => {
    let centerCoords
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        centerCoords = { lat: position.coords.latitude, lng: position.coords.longitude }
      })
      console.log("", map.value)
    }
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      map.value = new Map(document.getElementById("map"), {
        center: centerCoords,
        zoom: 10,
      });
      createMarker = (position) => {
        return new google.maps.Marker({
          position: { lat: position.latitude, lng: position.longitude },
          map: map.value,
        })
      }
    });
  })
</script>
