<template>
    <div>
        <div class="flex flex-col">
            <label for="firstPerson">First Adress: </label>
            <input class="w-full py-1 border-2 border-black rounded-md" id="firstPerson" v-model="firstPerson" type="text">
        </div>
        <div class="flex flex-col">
            <label for="secondPerson">Second Adress: </label>
            <input class="w-full py-1 border-2 border-black rounded-md" id="secondPerson" v-model="secondPerson"
                type="text">
        </div>
        <button @click="$emit('sendPlaces', [firstPerson, secondPerson])">Check</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const firstPerson = ref('')
    const secondPerson = ref('')
</script>