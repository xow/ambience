import { IDawSettings } from '..';

const initPatch = {
  id: 'init',
  name: 'Initial',
  seoName: 'Free online Synth',
  description: 'Basic starter patch to be modified.',
  synth: {
    type: 'sawtooth' as const,
    attack: 0,
    delay: 0.1,
    sustain: 1,
    release: 0,
    unison: 1,
    spread: 0,
  },
  timeSignature: 4,
  bpm: 120,
  reverb: {
    isOn: false,
    dryWet: 0.5,
    decay: 8,
  },
  delay: {
    isOn: false,
    noteDenominator: 4 as const,
    feedback: 0.6,
    dryWet: 0.5,
  },
  filter0: {
    isOn: false,
    frequency: 2000,
    type: 'lowpass' as const,
    qFactor: 1,
    dryWet: 1,
  },
  filter1: {
    isOn: false,
    frequency: 300,
    type: 'highpass' as const,
    qFactor: 1,
    dryWet: 1,
  },
  chord: { isOn: false, noteOffsets: [-7, 0, 7] }, // 5, 1, 5
  transpose: { isOn: false, semiTones: 12, shouldOutputDry: false },
  arpeggiator: {
    isOn: false,
    noteDenominator: 8 as const,
    gate: 1,
    style: 'up' as const,
    isLatchOn: true,
  },
};

export const presets: Record<string, IDawSettings> = {
  init: {
    ...initPatch,
  },
  lead: {
    ...initPatch,
    id: 'lead',
    name: 'Lead',
    seoName: 'Lead stabbing synth',
    description: 'For use in anthemic songs.',
    synth: {
      type: 'sawtooth' as const,
      attack: 0,
      delay: 0.1,
      sustain: 1,
      release: 0.3,
      unison: 5,
      spread: 0.025,
    },
    reverb: {
      decay: 2.3,
      dryWet: 0.5,
      isOn: true,
    },
  },
  softPad: {
    ...initPatch,
    id: 'softPad',
    name: 'Soft pad',
    seoName: 'Soft pad sound',
    description: 'For use in mellow songs.',
    synth: {
      type: 'sawtooth' as const,
      attack: 0.3,
      delay: 0.1,
      sustain: 1,
      release: 0.5,
      unison: 5,
      spread: 0.01,
    },
    reverb: {
      decay: 6,
      dryWet: 0.7,
      isOn: true,
    },
    filter0: {
      isOn: true,
      frequency: 1500,
      type: 'lowpass',
      qFactor: 1,
      dryWet: 1,
    },
  },
  dronePad: {
    id: 'dronePad',
    name: 'Drone pad',
    seoName: 'Drone pad / Ambience Generator',
    description: 'Click a key to generate a drone in that key.',
    synth: {
      type: 'sawtooth',
      attack: 0.2,
      delay: 0.1,
      sustain: 1,
      release: 0.3,
      unison: 3,
      spread: 0.005,
    },
    timeSignature: 4,
    bpm: 120,
    reverb: {
      isOn: true,
      dryWet: 1,
      decay: 8,
    },
    delay: {
      isOn: true,
      noteDenominator: 4,
      feedback: 0.6,
      dryWet: 0.5,
    },
    filter0: {
      isOn: true,
      frequency: 2000,
      type: 'lowpass',
      qFactor: 1,
      dryWet: 1,
    },
    filter1: {
      isOn: true,
      frequency: 300,
      type: 'highpass',
      qFactor: 1,
      dryWet: 1,
    },
    chord: { isOn: true, noteOffsets: [-12, -5, 0, 2, 4, 7, 12] }, // 1, 5, 1, 2, 3, 5, 1
    transpose: { isOn: true, semiTones: 12, shouldOutputDry: true },
    arpeggiator: {
      isOn: true,
      noteDenominator: 8,
      gate: 1,
      style: 'up',
      isLatchOn: true,
    },
  },
};

export type Patches = keyof typeof presets;

export const defaultPreset: IDawSettings = presets.dronePad;
