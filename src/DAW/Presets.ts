import { IDawSettings } from '..';

export type Patches = 'dronePad' | 'init';

export const presets: Record<Patches, IDawSettings> = {
  init: {
    id: 'init',
    name: 'Initial',
    seoName: 'Free online Synth',
    description: 'Basic starter patch to be modified.',
    synth: {
      type: 'sawtooth',
      attack: 0,
      delay: 0,
      sustain: 1,
      release: 0,
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
      noteDenominator: 4,
      feedback: 0.6,
      dryWet: 0.5,
    },
    filter0: {
      isOn: false,
      frequency: 2000,
      type: 'lowpass',
      qFactor: 1,
      dryWet: 1,
    },
    filter1: {
      isOn: false,
      frequency: 300,
      type: 'highpass',
      qFactor: 1,
      dryWet: 1,
    },
    chord: { isOn: false, noteOffsets: [-7, 0, 7] }, // 5, 1, 5
    transpose: { isOn: false, semiTones: 12, shouldOutputDry: false },
    arpeggiator: {
      isOn: false,
      noteDenominator: 8,
      gate: 1,
      style: 'up',
      isLatchOn: true,
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
      delay: 0,
      sustain: 1,
      release: 0.3,
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

export const defaultPreset: IDawSettings = presets.dronePad;
