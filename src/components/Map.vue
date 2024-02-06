
<template>
  <div class="h-[500px]" id="map">
  </div>
</template>


<script setup>
  import { onMounted, ref } from 'vue'
  import { Loader } from "@googlemaps/js-api-loader"

  const map = ref(null)
  const placeMarkers = (places) => {
    createMarker(places.firstField.geometry ? places.firstField.geometry.location.toJSON() : { lat: places.firstField.location.latitude, lng: places.firstField.location.longitude })
    createMarker(places.secondField.geometry ? places.secondField.geometry.location.toJSON() : { lat: places.secondField.location.latitude, lng: places.secondField.location.longitude })
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
          position,
          map: map.value,
        })
      }
    });
  })
</script>
