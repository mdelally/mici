<template>
  <RouterLink
    :to="to"
    active-class="bg-neutral-900 text-neutral-100 !border-neutral-500"
    class="group block transition-colors ease-in-out px-4 py-2 text-neutral-200 font-bold hover:bg-amber-900 hover:text-amber-100 border-r-2 border-neutral-800 hover:!border-amber-300"
  >
    <span class="flex items-center">
      <span class="text-amber-700 group-hover:text-amber-100">
        <Icon :icon="icon" width="1.5em" class="mr-2" />
      </span>
      <slot></slot>
    </span>
  </RouterLink>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const { to, icon } = defineProps<{ to: string; icon: string }>()
</script>
