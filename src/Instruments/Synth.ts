import { MidiSignal } from '../MidiEffects';
import { messageToOctaveAndNote } from '../Tools/Midi';

/**
 * Convert human readable note to a frequency
 */
export const frequencies = {
  c: 440 / 1.681793,
  db: 440 / 1.587401,
  d: 440 / 1.498307,
  eb: 440 / 1.414214,
  e: 440 / 1.33484,
  f: 440 / 1.259921,
  gb: 440 / 1.189207,
  g: 440 / 1.122462,
  ab: 440 / 1.059463,
  a: 440,
  bb: 440 * 1.059463,
  b: 440 * 1.122462,
};

/**
 * A function to begin playing a tone
 * @returns An object with a stopTone function to stop the tone playing
 */
export type IPlayTone = (data: MidiSignal) => { stopTone: () => void };

export interface IGetPlayToneProps {
  context: AudioContext;
  instrumentNode: AudioNode;
  type: 'custom' | 'sawtooth' | 'sine' | 'square' | 'triangle';
}

/**
 * Returns a function that when called will play a certain note
 */
export function getPlayTone({
  context,
  instrumentNode,
  type,
}: IGetPlayToneProps): IPlayTone {
  return ({ message, value: velocity }) => {
    const { octave, note } = messageToOctaveAndNote(message);
    const frequency = frequencies[note] * 2 ** (octave - 4);

    const maxGain = velocity / 127;

    // Todo have set polyphony, reuse or discard unneeded nodes.
    const gainNode = context.createGain();
    gainNode.gain.value = 0;

    // Todo make params
    const unison = 3;
    const spread = 0.005;

    const envelope = { attack: 0.05, delay: 0.5, sustain: 0.5, release: 0.5 };

    const ocillators = Array.from(new Array(unison), (x, i) => {
      const detune = ((i - (unison - 1) / 2) / (unison - 1)) * spread;

      const osc = context.createOscillator(); // instantiate an oscillator
      osc.type = type; // this is the default - also square, sawtooth, triangle
      osc.frequency.value = frequency * (1 + detune); // Hz
      osc.start(); // start the oscillator

      // Apply attack to oscillator
      gainNode.gain.linearRampToValueAtTime(
        maxGain,
        context.currentTime + envelope.attack,
      );
      osc.connect(gainNode); // connect it to the gain node to give it correct velocity

      // Start a ramp to sustain once attack is done
      setInterval(() => {
        gainNode.gain.linearRampToValueAtTime(
          maxGain * envelope.sustain,
          context.currentTime + envelope.attack + envelope.delay, // TODO don't need attack here once we figure out how to get context's true current Time
        );
      }, envelope.attack * 1000);

      return osc;
    });

    gainNode.connect(instrumentNode);

    function stopTone() {
      // Apply release to each oscillator, and only stop after release is complete.
      ocillators.forEach(osc => {
        gainNode.gain.linearRampToValueAtTime(
          0,
          context.currentTime + envelope.release,
        );
        osc.stop(context.currentTime + envelope.release);
      });
    }

    return { stopTone };
  };
}
