<script setup>
import NavbarComponent from './components/NavbarComponent.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <NavbarComponent />
  </header>

  <main>
    <RouterView />
  </main>
</template>
