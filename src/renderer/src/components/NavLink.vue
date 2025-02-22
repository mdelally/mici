<template>
  <RouterLink
    :to="to"
    active-class="bg-neutral-900 text-neutral-100 !border-neutral-500"
    class="block transition-colors ease-in-out px-4 py-2 text-neutral-200 font-bold hover:bg-orange-900 hover:text-orange-100 border-r-2 border-neutral-800 hover:!border-orange-300"
  >
    <slot></slot>
  </RouterLink>
</template>

<script lang="ts" setup>
const { to } = defineProps<{ to: string }>()
</script>
