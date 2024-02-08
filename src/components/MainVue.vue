<script setup>
    import { onMounted, ref } from 'vue';
    import Fields from './Fields.vue'
    import Map from './Map.vue'
    import Results from './Results.vue'

    const getPlaces = async (places) => {
        if (!places.firstField.geometry) {
            const firstPlace = await fetchPlace(places.firstField)
            places.firstField = firstPlace.places[0]
        }
        if (!places.secondField.geometry) {
            const secondPlace = await fetchPlace(places.secondField)
            places.secondField = secondPlace.places[0]
        }
        map.value.placeMarkers(places)
    }
    const map = ref(null)
    const centerCoords = ref(null)
    const country = ref(null)
    const fetchPlace = async (query) => {
        const res = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY,
                'X-Goog-FieldMask': 'places.displayName,places.addressComponents,places.location'
            },
            body: JSON.stringify({
                'textQuery': query
            })
        })
        return await res.json()
    }
    onMounted(async () => {
        let res = await fetch('http://ipinfo.io/json?token=d7e1be900b762e')
        const ipGeo = await res.json()
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
