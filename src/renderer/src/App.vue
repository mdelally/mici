<template>
  <section class="flex min-h-full">
    <nav class="flex flex-col min-w-64 min-h-full bg-neutral-950 overflow-hidden fixed box-border">
      <div
        class="p-2 flex items-center justify-center bg-orange-950 border-r-2 border-b-2 border-orange-800"
      >
        <RouterLink to="/" class="block font-bold text-orange-400 text-4xl">mici</RouterLink>
      </div>

      <div>
        <NavLink to="/">Mapping</NavLink>
        <NavLink to="/test">Actions</NavLink>
        <NavLink to="/test">Test</NavLink>
        <NavLink to="/test">Test</NavLink>
        <NavLink to="/test">Test</NavLink>
      </div>
      <div class="flex-grow-1 border-r-2 border-neutral-800"></div>
    </nav>
    <main class="w-full pl-64 h-full">
      <RouterView />
    </main>
  </section>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavLink from './components/NavLink.vue'
</script>

<style>
div#app {
  height: 100vh;
}
</style>
