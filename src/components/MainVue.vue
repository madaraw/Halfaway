<script setup>
    import { ref } from 'vue';
    import Fields from './Fields.vue'
    import Map from './Map.vue'
    import Results from './Results.vue'

    const getPlaces = async (places) => {
        if (!places[0] && !places[1]) return
        const positions = await checkPosition(...places)
        console.log("positions", positions)
        map.value.placeMarkers(...positions)
    }
    const map = ref(null)
    const fetchPlace = async (query) => {
        return await fetch(`https://places.googleapis.com/v1/places:searchText`, {
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
