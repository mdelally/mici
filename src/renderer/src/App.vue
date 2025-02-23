<template>
  <section class="flex min-h-full">
    <SideNavigation />
    <main class="w-full pl-64 h-full">
      <RouterView />
    </main>
  </section>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideNavigation from './components/layout/SideNavigation.vue'
</script>

<style>
div#app {
  height: 100vh;
}
</style>
