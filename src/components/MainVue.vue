<script setup>
    import { ref } from 'vue';
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
    const checkPosition = async (field1, field2) => {
        const places = await Promise.all([fetchPlace(field1), fetchPlace(field2)])
        return await Promise.all([places[0].json(), places[1].json()])
    }
</script>

<template>
    <div class="container mx-auto py-10 px-2 space-y-4">
        <Fields @send-Places="getPlaces" />
        <Map ref="map" />
        <Results />
    </div>
</template>
