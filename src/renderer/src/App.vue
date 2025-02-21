<template>
  <section class="flex justify-center items-center min-h-full pt-8">
    <div>
      <h1 class="mb-6 font-bold text-4xl">mici</h1>

      <section class="flex">
        <div class="mr-2">
          <span class="block p-4 bg-gray-200 rounded-md">
            <label for="inputs" class="block">Select MIDI Input</label>
            <select
              id="inputs"
              v-model="selectedInput"
              name="inputs"
              class="bg-white rounded-md p-2"
            >
              <option v-for="input in inputs" :key="input.name" :value="input">
                {{ input.manufacturer }} - {{ input.name }}
              </option>
              <option :value="null" default>None</option>
            </select>
          </span>

          <div>{{ selectedInput?.name || 'No input selected' }}</div>

          <section class="bg-cyan-100 p-2 w-[400px] max-h-[900px] overflow-y-scroll rounded-md">
            <h3>Mappings</h3>
            <pre>{{ inputMap }}</pre>
          </section>
        </div>

        <section v-if="currentlyCapturedInput">
          <div class="bg-emerald-400 p-2 rounded-md min-w-[400px]">
            <h3 class="font-bold mb-2">Currently Captured Input</h3>
            <pre>{{ currentlyCapturedInput }}</pre>
            <button
              class="w-full bg-white hover:opacity-80 px-4 py-2 rounded-md cursor-pointer font-medium"
              @click="addCurrentInputToMap"
            >
              Add to Mapping
            </button>
          </div>
        </section>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
import { onMounted, Ref, ref, watch } from 'vue'
import useMidi from './composables/useMidi'
import { Message, type Input } from 'webmidi'

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
  console.log(newVal?.channels)
  if (newVal) {
    // console.log(selectedInput.value)
    selectedInput.value?.addListener('midimessage', (e) => {
      console.log(e)
      console.log(Utils.from7bitToFloat(e.data[2]))
      captureInputDataFromMessage(e.message)
    })
  } else {
    oldVal?.removeListener('midimessage')
    currentlyCapturedInput.value = null
    inputMap.value = []
  }
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
