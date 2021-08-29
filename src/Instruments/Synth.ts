import { Commands, IHandleMidi, messageToOctaveAndNote } from '../Tools/Midi';

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

export interface IGetHandleMidiProps {
  context: AudioContext;
  instrumentNode: AudioNode;
  type: 'sawtooth' | 'sine' | 'square' | 'triangle';
  attack: number;
  delay: number;
  sustain: number;
  release: number;
}

type IStopTone = () => void;

const stopTones: Record<number, IStopTone> = {};

function startTone({
  context,
  message,
  velocity,
  instrumentNode,
  type,
  attack,
  delay,
  sustain,
  release,
}: {
  context: AudioContext;
  message: number;
  velocity: number;
  instrumentNode: AudioNode;
  type: OscillatorType;
  attack: number;
  delay: number;
  sustain: number;
  release: number;
}) {
  const { octave, note } = messageToOctaveAndNote(message);
  const frequency = frequencies[note] * 2 ** (octave - 4);

  const maxGain = velocity / 127;

  // Todo have set polyphony, reuse or discard unneeded nodes.
  const gainNode = context.createGain();
  gainNode.gain.value = 0;

  // Todo make params
  const unison = 3;
  const spread = 0.005;

  const envelope = { attack, delay, sustain, release };

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
    // Cancel existing ramps (e.g. delay)
    gainNode.gain.cancelScheduledValues(context.currentTime);

    // Fix gain
    gainNode.gain.linearRampToValueAtTime(
      0,
      context.currentTime + envelope.release,
    );

    setTimeout(() => {
      gainNode.disconnect();
    }, envelope.release * 1000);

    // Apply release to each oscillator, and only stop after release is complete.
    ocillators.forEach(osc => {
      osc.stop(context.currentTime + envelope.release);
    });
  }

  return { stopTone };
}

/**
 * Returns a function that when called will play a certain note
 */
export function getHandleMidi({
  context,
  instrumentNode,
  type,
  attack,
  delay,
  sustain,
  release,
}: IGetHandleMidiProps): IHandleMidi {
  return ({ command, message, value: velocity }) => {
    switch (command) {
      case Commands.NOTE_ON:
        // if it already exists, cancel it
        if (stopTones[message]) stopTones[message]();

        stopTones[message] = startTone({
          context,
          message,
          velocity,
          instrumentNode,
          type,
          attack,
          delay,
          sustain,
          release,
        }).stopTone;
        break;
      case Commands.NOTE_OFF:
        stopTones[message]?.();
        break;
      default:
        break;
    }
  };
}
