<template>
    <div v-if="nearbyInfos" v-for="place in nearbyInfos" :key="place.id">
        <a :href="place.googleMapsUri" target="_blank">
            <h1>{{ place.displayName.text }}</h1>
        </a><span>{{ place.rating }}</span>
        <p v-if="place.currentOpeningHours">open? {{ place.currentOpeningHours.openNow ? "yes" : "no" }}</p>
    </div>
</template>
<script setup>
    import { computed } from "vue"
    import { useNearbyInfosStore } from '../stores/nearbyInfos';
    const nearbyInfosStore = useNearbyInfosStore()
    const nearbyInfos = computed(() => {
        return nearbyInfosStore.nearbyInfo
    })
</script>