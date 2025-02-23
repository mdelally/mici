export interface Profile {
  name: string
  deviceManufacturer: string
  deviceName: string
  controls: Control[]
}

export interface Control {
  name: string
  type: ControlType
  channel: number
  control: number
  command: MidiCommand
  infinite?: boolean
  upValue?: number
  downValue?: number
  steps?: number
}

export enum ControlType {
  Fader,
  Button,
  Indicator
}

export enum MidiCommand {
  NoteOn = 'noteon',
  NoteOff = 'noteoff',
  PolyAftertouch = 'polyaftertouch',
  CC = 'cc',
  Program = 'program',
  ChannelAfterTouch = 'channelaftertouch',
  Pitch = 'pitch',
  Position = 'position',
  MTC = 'mtc',
  Clock = 'clock',
  Select = 'select',
  Start = 'start',
  Continue = 'continue',
  ActiveSense = 'activesense',
  Reset = 'reset'
}
