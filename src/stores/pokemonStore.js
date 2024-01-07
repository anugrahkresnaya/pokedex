import { defineStore } from "pinia";
import { ref } from "vue";

export const usePokemonStore = defineStore('pokemon', () => {
  const myPokemon = ref([])

  const addPokemon = (pokemon) => {
    myPokemon.value.push(pokemon)
  }

  return { myPokemon, addPokemon }
})