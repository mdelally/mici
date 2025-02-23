<template>
  <nav class="flex flex-col min-w-64 min-h-full bg-neutral-950 overflow-hidden fixed box-border">
    <div class="p-2 flex items-center justify-center bg-amber-950 border-r-2 border-amber-800">
      <RouterLink to="/" class="block font-bold text-amber-400 text-4xl">mici</RouterLink>
    </div>

    <div>
      <NavLink v-for="item in menuItems" :key="item.label" :to="item.to" :icon="item.icon">
        {{ item.label }}
      </NavLink>
    </div>
    <div class="flex-grow-1 border-r-2 border-neutral-800"></div>
  </nav>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import NavLink from './NavLink.vue'

const menuItems = [
  { to: '/', label: 'Profiles', icon: 'solar:music-library-2-bold-duotone' },
  { to: '/interfaces', label: 'Interfaces', icon: 'solar:volume-knob-bold-duotone' },
  { to: '/actions', label: 'Actions', icon: 'solar:magic-stick-3-bold-duotone' },
  { to: '/mapping', label: 'Mapping', icon: 'solar:plus-minus-bold-duotone' }
]
</script>
