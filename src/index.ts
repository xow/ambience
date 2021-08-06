import './styles.css';
import * as MIDI from './MIDI';
import { getPlayTone } from './Oscillator';
import { createReverb } from './Reverb';
import { adjustContinuousControl } from './CC';

const masterVolume = 0.6;

/**
 * Main audio context
 */
const context = new window.AudioContext();

const reverb = createReverb(context, 6);

const gain = context.createGain();
gain.gain.value = masterVolume; // Master volume
gain.connect(context.destination);

reverb.connect(gain);

const playTone = getPlayTone(context, reverb);

MIDI.listen(playTone, adjustContinuousControl);

// TODO don't use window
(window as any).playTone = playTone;
