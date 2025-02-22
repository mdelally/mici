<template>
  <Page>
    <template #header>Testbed</template>

    <section class="flex min-h-full">
      <section class="flex">
        <div class="mr-2">
          <span class="block p-4 bg-neutral-800">
            <label for="inputs" class="block">Select MIDI Input</label>
            <select
              id="inputs"
              v-model="selectedInput"
              name="inputs"
              class="bg-transparent border-2 border-neutral-400 p-2"
            >
              <option
                v-for="input in inputs"
                :key="input.name"
                :value="input"
                class="bg-neutral-900"
              >
                {{ input.manufacturer }} - {{ input.name }}
              </option>
              <option :value="null" class="bg-neutral-900" default>None</option>
            </select>
          </span>

          <div>{{ selectedInput?.name || 'No input selected' }}</div>

          <section class="bg-cyan-950 p-2 w-[400px] max-h-[400px] overflow-y-auto">
            <h3>Mappings</h3>
            <pre>{{ inputMap }}</pre>
          </section>
        </div>

        <section
          v-if="currentlyCapturedInput"
          class="bg-emerald-950 p-3 min-w-[400px] max-h-[400px] flex-shrink-1"
        >
          <h3 class="font-bold mb-2">Currently Captured Input</h3>
          <pre>{{ currentlyCapturedInput }}</pre>
          <BaseButton label="Add to Mapping" @click="addCurrentInputToMap" />
        </section>
      </section>
    </section>
  </Page>
</template>

<script lang="ts" setup>
import BaseButton from '../components/base/BaseButton.vue'

// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
import { onMounted, Ref, ref, watch } from 'vue'
import useMidi from '../composables/useMidi'
import { Message, type Input } from 'webmidi'
import Page from '@renderer/components/Page.vue'

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
