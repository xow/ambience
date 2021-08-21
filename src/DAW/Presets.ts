import { IDawSettings } from '..';

export const presets: Record<string, IDawSettings> = {
  dronePad: {
    type: 'sawtooth',
    timeSignature: 4,
    bpm: 120,
    reverb: {
      dryWet: 1,
      decay: 8,
    },
    delay: {
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
  },
};

export const defaultPreset: IDawSettings = presets.dronePad;
