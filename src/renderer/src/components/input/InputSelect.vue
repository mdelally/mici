<template>
  <SelectRoot v-model="modelValue">
    <SelectTrigger
      class="inline-flex min-w-[240px] items-center justify-between p-4 h-[42px] gap-[5px] bg-transparent border-2 border-neutral-400 outline-none"
      aria-label="Customise options"
    >
      <SelectValue :placeholder="placeholder" />
      <Icon icon="solar:double-alt-arrow-down-line-duotone" class="h-3.5 w-3.5" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="transition-all mt-[40px] min-w-[240px] bg-neutral-800 border-2 border-neutral-600 z-[100]"
        :side-offset="5"
        position="popper"
      >
        <SelectScrollUpButton
          class="transition-all flex items-center justify-center h-[25px] bg-transparent cursor-default"
        >
          <Icon icon="radix-icons:chevron-up" />
        </SelectScrollUpButton>

        <SelectViewport class="p-2">
          <SelectGroup>
            <SelectItem
              v-for="option in options"
              :key="option.label"
              class="transition-all leading-none flex items-center p-2 pl-[25px] h-[28px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-amber-600 data-[highlighted]:text-white"
              :value="option.value"
              :disabled="isDisabled"
            >
              <SelectItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <Icon icon="radix-icons:check" />
              </SelectItemIndicator>
              <SelectItemText>
                {{ option.label }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton
          class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
        >
          <Icon icon="radix-icons:chevron-down" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface SelectInputProps {
  options: unknown
  isDisabled?: boolean
  placeholder?: string
}

const { options, isDisabled, placeholder } = defineProps<SelectInputProps>()

const modelValue = defineModel()
</script>
