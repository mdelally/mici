<template>
  <button
    class="w-full bg-white hover:opacity-80 px-4 text-black py-2 rounded-md cursor-pointer font-medium"
    @click="$emit('click')"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts" setup>
const { label = 'Button' } = defineProps<{ label?: string }>()

defineEmits(['click'])
</script>
