
<template>
  <!-- <h1 v-if="nearbyInfosStore.nearbyInfoLoading" class="font-bold text-xl">Loading..</h1> -->
  <div class="h-[500px]" id="map">
  </div>
</template>


<script setup>
  import { onMounted } from 'vue'
  import { useMapStore } from '../stores/map';

  const mapStore = useMapStore()
  onMounted(() => {
    mapStore.createMap()
  })
</script>
