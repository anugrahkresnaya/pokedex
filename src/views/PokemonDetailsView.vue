<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon'
const pokemonData = ref(null)

const { name } = route.params

onMounted(async () => {
  try {
    const response = await axios.get(`${POKEMON_API}/${name}`)
    pokemonData.value = response
  } catch (error) {
    console.log('error while fetching data: ', error)
  }
})

console.log('pokemon data: ', pokemonData)
</script>

<template>
  <div v-if="pokemonData">
    <h1>{{ pokemonData.data.name }}</h1>
    <img :src="pokemonData.data.sprites.other['official-artwork']['front_default']" alt="pokemon image">
  </div>
  <div v-else>
    <h1>Loading...</h1>
  </div>
</template>