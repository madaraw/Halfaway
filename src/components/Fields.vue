<template>
    <div>
        <div class="flex flex-col">
            <label for="firstFieldInput">First Adress: </label>
            <input class="w-full py-1 px-1 border-2 border-black rounded-md" id="firstFieldInput" v-model="firstFieldInput"
                type="text">
        </div>
        <div class="flex flex-col">
            <label for="secondFieldInput">Second Adress: </label>
            <input class="w-full py-1 px-1 border-2 border-black rounded-md" id="secondFieldInput"
                v-model="secondFieldInput" type="text">
        </div>
        <button @click="gettheplace">Check</button>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { Loader } from "@googlemaps/js-api-loader"

    const firstFieldInput = ref('')
    const secondFieldInput = ref('')
    const autocompleteField1 = ref(null)
    const autocompleteField2 = ref(null)
    const props = defineProps(["country"])
    const emit = defineEmits(["sendPlaces"])
    const gettheplace = () => {
        const payload = {}
        if (autocompleteField1.value.getPlace())
            if (autocompleteField1.value.getPlace().geometry)
                payload.firstField = autocompleteField1.value.getPlace()
            else
                payload.firstField = autocompleteField1.value.getPlace().name
        else
            payload.firstField = firstFieldInput.value
        if (autocompleteField2.value.getPlace())
            if (autocompleteField2.value.getPlace().geometry)
                payload.secondField = autocompleteField2.value.getPlace()
            else
                payload.secondField = autocompleteField2.value.getPlace().name
        else
            payload.secondField = secondFieldInput.value
        emit('sendPlaces', payload)
    }
    onMounted(() => {
        let country = props.country.toLowerCase()
        const loader = new Loader({
            apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            version: "weekly",
        });
        loader.load().then(async () => {
            const { Autocomplete } = await google.maps.importLibrary('places')
            autocompleteField1.value = new Autocomplete(document.getElementById('firstFieldInput'), {
                componentRestrictions: { country }
            })
            autocompleteField2.value = new Autocomplete(document.getElementById('secondFieldInput'), {
                componentRestrictions: { country }
            })
        })
    })
</script>
<style>
.pac-icon {
    @apply hidden
}

.pac-item {
    @apply font-sans font-medium text-sm text-black py-1 px-2
}

.pac-item-query {
    @apply font-sans text-sm
}
</style>