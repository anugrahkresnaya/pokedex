<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'

const POKEMON_LIST_API = 'https://pokeapi.co/api/v2/pokemon'
const lists = ref(null)
const pokemonList = ref([])

onMounted(async () => {
  try {
    const response = await axios.get(POKEMON_LIST_API)
    lists.value = response.data.results

    lists.value.forEach(async item => {
      let response = await axios.get(POKEMON_LIST_API + `/${item.name}`)
      pokemonList.value.push(response)
    });
  } catch (error) {
    console.log('error while fetching api', error)
  }
})

</script>

<template>
  <div>
    <h1 class="mb-10">pokemon list</h1>
    <ul class="flex flex-wrap justify-center">
      <li v-for="(item, index) in pokemonList" :key="index" class="bg-red-400 hover:shadow-lg rounded-lg w-40 mx-2 mb-10">
        <RouterLink :to='`pokemon/${item.data.name}`'>
          <img 
            :src="item.data.sprites.other['official-artwork']['front_default']" 
            alt="pokemon"
            class="-mt-10"
          />
          <div class="text-center text-white bg-slate-800 rounded-lg mb-1 mx-2">
            <h1 class="rounded-lg">#{{ item.data.id }} {{ item.data.name }}</h1>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>