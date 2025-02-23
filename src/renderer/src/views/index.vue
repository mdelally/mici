<template>
  <Page>
    <template #header>Profiles</template>

    <section class="flex gap-4 p-4 bg-neutral-800">
      <!-- <label for="inputs" class="block">Select MIDI Input</label>
      <select
        id="inputs"
        v-model="selectedInput"
        name="inputs"
        class="bg-transparent border-2 border-neutral-400 p-2"
      >
        <option v-for="input in inputs" :key="input.name" :value="input" class="bg-neutral-900">
          {{ input.manufacturer }} - {{ input.name }}
        </option>
        <option :value="null" class="bg-neutral-900" default>None</option>
      </select> -->

      <InputSelect
        v-model="selectedInput"
        placeholder="Select a MIDI Input..."
        :options="availableInputs"
      />
      <p>{{ selectedInput }}</p>
      <BaseButton>Click me!</BaseButton>
    </section>
  </Page>
</template>

<script lang="ts" setup>
import BaseButton from '../components/base/BaseButton.vue'

// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
import { computed, onMounted, Ref, ref, watch } from 'vue'
import useMidi from '../composables/useMidi'
import { Message, type Input } from 'webmidi'
import Page from '@renderer/components/layout/Page.vue'
import InputSelect from '@renderer/components/input/InputSelect.vue'

const { Midi, inputs, Utils, onEnabled } = useMidi()

interface LocalInputData {
  channel: number
  command: number
  data: number[]
  type: string
}

const selectedInput: Ref<Input | null> = ref(null)
const currentlyCapturedInput: Ref<LocalInputData | null> = ref(null)

const inputMap: Ref<LocalInputData[]> = ref([])

watch(selectedInput, (newVal, oldVal) => {
  console.log(newVal)
  if (newVal) {
    // console.log(selectedInput.value)
    // selectedInput.value?.addListener('midimessage', (e) => {
    //   console.log(e)
    //   console.log(Utils.from7bitToFloat(e.data[2]))
    //   captureInputDataFromMessage(e.message)
    // })
  } else {
    // oldVal?.removeListener('midimessage')
    // currentlyCapturedInput.value = null
    // inputMap.value = []
  }
})

const availableInputs = computed(() => {
  return inputs.value.map((input) => {
    return { label: input.name, value: input.name }
  })
})

function captureInputDataFromMessage(message: Message): void {
  currentlyCapturedInput.value = {
    channel: message.channel,
    command: message.command,
    data: message.data,
    type: message.type
  }
}

function addCurrentInputToMap(): void {
  if (!currentlyCapturedInput.value) return

  inputMap.value.push({ ...currentlyCapturedInput.value } as LocalInputData)
}

onMounted(async () => {
  await Midi.enable().then(() => onEnabled())
})
</script>
