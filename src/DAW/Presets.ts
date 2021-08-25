import { IDawSettings } from '..';

export const presets: Record<string, IDawSettings> = {
  dronePad: {
    name: 'Drone pad / Ambience Generator',
    description: 'Click a key to generate a drone in that key.',
    type: 'sawtooth',
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
      cutoffFrequency: 2000,
      type: 'lowpass',
      qFactor: 1,
      dryWet: 1,
    },
    filter1: {
      cutoffFrequency: 300,
      type: 'highpass',
      qFactor: 1,
      dryWet: 1,
    },
    chord: { noteOffsets: [-12, -5, 0, 2, 4, 7, 12] }, // 1, 5, 1, 2, 3, 5, 1
    transpose: { semiTones: 12, shouldOutputDry: true },
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
