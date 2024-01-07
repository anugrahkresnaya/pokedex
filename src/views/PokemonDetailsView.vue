<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'

const route = useRoute()

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon'
const pokemonData = ref(null)

const { name } = route.params

const isCaught = ref(null)
const pokemonCaught = ref(null)

const pokemonStore = usePokemonStore()

onMounted(async () => {
  try {
    const response = await axios.get(`${POKEMON_API}/${name}`)
    pokemonData.value = response
  } catch (error) {
    console.log('error while fetching data: ', error)
  }
})

const catchPokemon = (pokemon) => {
  try {
    console.log('catch button clicked!')
    const randomValue = Math.random()

    if (randomValue < 0.5) {
      isCaught.value = true
      pokemonCaught.value = pokemon
    } else {
      isCaught.value = false
    }
  } catch (error) {
    console.log('error while catching pokemon: ', error)
  }
}

const addPokemonToMyList = () => {
  pokemonStore.addPokemon(pokemonCaught.value)
  pokemonCaught.value = null
}

</script>

<template>
  <div v-if="pokemonData">
    <div class="flex flex-col items-center text-white">
      <h1>{{ pokemonData.data.name }}</h1>
      <img 
        :src="pokemonData.data.sprites.other['official-artwork']['front_default']"
        alt="pokemon image"
        class="w-32"
      />
    </div>
    <div class="text-white text-center">
      <h1>catch this pokemon</h1>
      <button @click="catchPokemon(pokemonData.data.name)" class="bg-metallic-violet p-2 rounded-lg">catch</button>
      <div v-if="isCaught === true">
        <p>you caught {{ pokemonData.data.name }}</p>
        <button @click="addPokemonToMyList" class="bg-metallic-violet p-2 rounded-lg">Add to my pokedex</button>
      </div>
      <div v-else-if="isCaught === false">
        <p>Oh no! {{ pokemonData.data.name }} got away!</p>
      </div>
    </div>

  </div>
  <div v-else>
    <h1>Loading...</h1>
  </div>
</template>