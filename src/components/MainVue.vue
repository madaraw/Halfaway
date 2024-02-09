<script setup>
    import { useNearbyInfosStore } from '../stores/nearbyInfos'
    import { onMounted, ref } from 'vue';
    import { fetchPlace, getIpGeo } from '../composables/mapsApiCalls';
    import Fields from './Fields.vue'
    import Map from './Map.vue'
    import Results from './Results.vue'

    const nearbyInfosStore = useNearbyInfosStore()
    const types = ref([])
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
        await nearbyInfosStore.getNearbyInfo(getLatLng(places).midleLatLng, types.value)
        map.value.placeMarkers(places, getLatLng(places).midleLatLng)
    }
    const getLatLng = (places) => {
        const latLngs = {
            first: places.firstField.geometry ? places.firstField.geometry.location.toJSON() : {
                lat: places.firstField.location.latitude,
                lng: places.firstField.location.longitude
            },
            second: places.secondField.geometry ? places.secondField.geometry.location.toJSON() : {
                lat: places.secondField.location.latitude,
                lng: places.secondField.location.longitude
            }
        }
        return {
            firstLatLng: latLngs.first,
            secondLatLng: latLngs.second,
            midleLatLng: {
                lat: (latLngs.first.lat + latLngs.second.lat) / 2,
                lng: (latLngs.first.lng + latLngs.second.lng) / 2
            }
        }
    }
    const map = ref(null)
    const centerCoords = ref(null)
    const country = ref(null)
    onMounted(async () => {
        const ipGeo = await getIpGeo()
        country.value = ipGeo.country
        centerCoords.value = { lat: +ipGeo.loc.split(",")[0], lng: +ipGeo.loc.split(",")[1] }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                centerCoords.value = { lat: position.coords.latitude, lng: position.coords.longitude }
            })
        }
    })
</script>

<template>
    <div class="container mx-auto py-10 px-2 space-y-4">
        <Fields v-if="country" @send-Places="getPlaces" :country="country" />
        <Map v-if="centerCoords" ref="map" :center="centerCoords" />
        <Results />
    </div>
</template>
