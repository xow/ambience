import './styles.css';
import * as MIDI from './MIDI';
import * as OnScreenKeyboard from './OnScreenKeyboard';
import { getPlayTone } from './Oscillator';
import { createReverb } from './AudioEffects/Reverb';
import { createFilter } from './AudioEffects/Filter';
import { adjustContinuousControl } from './ContinuousControl';
import { createTrack, Track } from './Track';
import { createDelay } from './AudioEffects/Delay';

const bpm = 120;
const timeSignature = 4;

/**
 * Main audio context
 */
const context = new window.AudioContext();

// Effects
const reverb = createReverb(context, 6, 0.5);
const filter = createFilter(context, 5000, 'lowpass', 1, 1);
const delay = createDelay(context, bpm, timeSignature, 4, 0.3);

const instrument = context.createGain();

/**
 * Master Track
 */
const masterTrack: Track = {
  chain: [delay, filter, reverb],
  volume: 0.6,
  instrument,
};

createTrack({ track: masterTrack, context });

const playTone = getPlayTone({ context, instrumentNode: instrument });

MIDI.listen(playTone, adjustContinuousControl);
OnScreenKeyboard.listen(playTone);
