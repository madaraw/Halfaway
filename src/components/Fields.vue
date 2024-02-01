<template>
    <div>
        <div>
            <label for="firstPerson">First Adress: </label>
            <input id="firstPerson" v-model="firstPerson" type="text">
        </div>
        <div>
            <label for="secondPerson">Second Adress: </label>
            <input id="secondPerson" v-model="secondPerson" type="text">
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