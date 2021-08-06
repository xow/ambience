import './styles.css';
import * as MIDI from './MIDI';
import { getPlayTone } from './Oscillator';
import { createReverb } from './AudioEffects/Reverb';
import { createFilter } from './AudioEffects/Filter';
import { adjustContinuousControl } from './ContinuousControl';
import { createTrack, Track } from './Track';

/**
 * Main audio context
 */
const context = new window.AudioContext();

// Effects
const reverb = createReverb(context, 6);
const filter = createFilter(context, 1000, 'lowpass', 1);

const instrument = context.createGain();

/**
 * Master Track
 */
const masterTrack: Track = {
  chain: [reverb, filter],
  volume: 0.6,
  instrument,
};

createTrack({ track: masterTrack, context });

const playTone = getPlayTone({ context, instrumentNode: instrument });

MIDI.listen(playTone, adjustContinuousControl);

(window as any).playTone = playTone;
