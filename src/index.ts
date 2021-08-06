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
const filter = createFilter(context, 1000);

/**
 * Master Track
 */
const masterTrack: Track = {
  chain: [reverb, filter],
  volume: 0.6,
};

createTrack({ track: masterTrack, context });

const playTone = getPlayTone(
  context,
  masterTrack.chain[masterTrack.chain.length - 1],
); // TODO don't pass in last chain, add audio source to track, and auto connect in createTrack

MIDI.listen(playTone, adjustContinuousControl);

// TODO don't use window
(window as any).playTone = playTone;
