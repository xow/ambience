import './styles.css';
import * as MIDI from './MIDI';
import { getPlayTone } from './Oscillator';
import { createReverb } from './AudioEffects/Reverb';
import { adjustContinuousControl } from './ContinuousControl';
import { createTrack, Track } from './Track';

/**
 * Main audio context
 */
const context = new window.AudioContext();

// Effects
const reverb = createReverb(context, 6);

/**
 * Master Track
 */
const masterTrack: Track = {
  chain: [reverb],
  volume: 0.6,
};

createTrack({ track: masterTrack, context });

const playTone = getPlayTone(context, reverb);

MIDI.listen(playTone, adjustContinuousControl);

// TODO don't use window
(window as any).playTone = playTone;
