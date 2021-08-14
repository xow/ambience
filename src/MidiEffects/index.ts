export interface MidiEffect {
  process: (signal: MidiSignal) => MidiSignal;
}

export interface MidiSignal {
  command: number;
  message: number;
  value: number;
}
