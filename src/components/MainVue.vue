<script setup>
    import { useNearbyInfosStore } from '../stores/nearbyInfos'
    import { useMapStore } from '../stores/map';
    import { computed, onMounted, ref, watch } from 'vue';
    import { fetchPlace, getIpGeo } from '../composables/mapsApiCalls';
    import { formatLatLng } from '../composables/misc';
    import Fields from './Fields.vue'
    import Map from './Map.vue'
    import Results from './Results.vue'

    const nearbyInfosStore = useNearbyInfosStore()
    const mapStore = useMapStore()
    const types = ref([])
    const nearbyInfos = computed(() => nearbyInfosStore.nearbyInfo)
    watch(nearbyInfos, (infos) => {
        mapStore.createNearbyEstablishmentsMarkers(infos)
    })
    const getPlaces = async (places) => {
        if (places.coffeeShops)
            types.value.push(...['coffee_shop', 'cafe'])
        if (places.restaurants)
            types.value.push('restaurant')
        console.log(types.value)
        if (!places.firstField.geometry) {
            const firstPlace = await fetchPlace(places.firstField)
            places.firstField = firstPlace.places[0]
        }
        if (!places.secondField.geometry) {
            const secondPlace = await fetchPlace(places.secondField)
            places.secondField = secondPlace.places[0]
        }
        await nearbyInfosStore.getNearbyInfo(formatLatLng(places).halfwayLatLng, types.value)
        mapStore.createInitialMarkers(formatLatLng(places), nearbyInfosStore.range)
    }
    const country = ref(null)
    onMounted(async () => {
        const ipGeo = await getIpGeo()
        country.value = ipGeo.country
        let center = { lat: +ipGeo.loc.split(",")[0], lng: +ipGeo.loc.split(",")[1] }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                center = { lat: position.coords.latitude, lng: position.coords.longitude }
            })
        }
        mapStore.mapCenter = center
    })
</script>

<template>
    <div class="container mx-auto py-10 px-2 space-y-4">
        <Fields v-if="country" @send-Places="getPlaces" :country="country" />
        <Map v-if="mapStore.mapCenter" />
        <Results />
    </div>
</template>
