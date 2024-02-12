<template>
    <div v-if="nearbyInfos" v-for="place in nearbyInfos" :key="place.id">
        <h1>{{ place.displayName.text }}</h1><span>{{ place.rating }}</span>
        <p v-if="place.currentOpeningHours">open? {{ place.currentOpeningHours.openNow ? "yes" : "no" }}</p>
    </div>
    <div>
        <h2 class="text-xl font-semibold">Simple Text</h2>
        <p>Simple description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat cumque id eveniet tempora
            repellat, dignissimos tempore nobis totam, eligendi, fugit ea dolore quis numquam tenetur officia nulla aperiam
            expedita deleniti?</p>
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