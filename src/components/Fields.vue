<template>
    <div class="mb-11">
        <div class="flex flex-col">
            <label for="firstPerson">First Adress: </label>
            <input class="w-full border-2 border-black rounded-md" id="firstPerson" v-model="firstPerson" type="text">
        </div>
        <div class="flex flex-col">
            <label for="secondPerson">Second Adress: </label>
            <input class="w-full border-2 border-black rounded-md" id="secondPerson" v-model="secondPerson" type="text">
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'

    const firstPerson = ref('')
    const secondPerson = ref('')

    watch(firstPerson, (oldPerson, newPerson) => {
        console.log(oldPerson, newPerson)
    })

    watch(secondPerson, (oldSecondPerson, newSecondPerson) => {
        console.log(oldSecondPerson, newSecondPerson)
    })
</script>