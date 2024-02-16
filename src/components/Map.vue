
<template>
  <div class="h-[500px]" id="map">
  </div>
</template>


<script setup>
  import { onMounted, ref, watch, computed } from 'vue'
  import { Loader } from "@googlemaps/js-api-loader"
  import { useNearbyInfosStore } from '../stores/nearbyInfos'

  const props = defineProps(['center'])
  const nearbyInfosStore = useNearbyInfosStore()
  const nearbyInfos = computed(() => nearbyInfosStore.nearbyInfo)
  watch(nearbyInfos, (infos) => {
    infos.forEach(info => {
      createMarker({ lat: info.location.latitude, lng: info.location.longitude })
    });
  })
  const map = ref(null)
  const placeMarkers = (places, middleLatLng) => {
    createMarker(middleLatLng, true)
    createCircle(middleLatLng)
    panTheMap(middleLatLng)
    createMarker(places.firstField.geometry ? places.firstField.geometry.location.toJSON() : { lat: places.firstField.location.latitude, lng: places.firstField.location.longitude })
    createMarker(places.secondField.geometry ? places.secondField.geometry.location.toJSON() : { lat: places.secondField.location.latitude, lng: places.secondField.location.longitude })
  }
  let createMarker = null, createCircle = null, panTheMap = null
  defineExpose({ placeMarkers })
  onMounted(() => {
    let centerCoords = props.center
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

      const myMap = new Map(document.getElementById("map"), {
        center: centerCoords,
        zoom: 10,
        disableDefaultUI: true,
        mapId: import.meta.env.VITE_GOOGLE_MAP_ID
      });
      map.value = myMap
      createMarker = (position, middleMap = false) => {
        let pinBackground = new PinElement({
          background: "#0542fa",
          borderColor: "#4205fa",
          glyphColor: "#4205fa"
        })
        return middleMap ? new AdvancedMarkerElement({
          position,
          content: pinBackground.element,
          map: myMap,
        }) : new AdvancedMarkerElement({
          position,
          map: myMap,
        })
      }
      createCircle = (middleLatLng) => {
        return new google.maps.Circle({
          strokeColor: "#4205fa",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#4205fa",
          fillOpacity: 0.35,
          map: myMap,
          center: middleLatLng,
          radius: nearbyInfosStore.range,
        });
      }
      panTheMap = (panLatLng) => {
        myMap.panTo(panLatLng)
        myMap.setZoom(14)
      }
    });
  })
</script>
