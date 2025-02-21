import { Input, WebMidi, Utilities } from 'webmidi'
import { Ref, ref } from 'vue'

export default function useMidi() {
  const inputs: Ref<Input[]> = ref([])

  function onEnabled(): void {
    // Inputs
    inputs.value = WebMidi.inputs

    console.log(inputs.value)
    // WebMidi.inputs.forEach((input) => console.log(input.manufacturer, input.name))
  }

  return {
    Midi: WebMidi,
    Utils: Utilities,
    onEnabled,
    getInputByName: WebMidi.getInputByName,
    inputs
  }
}
