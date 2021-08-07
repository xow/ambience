import type { getPlayTone } from './Oscillator';
import type { adjustContinuousControl } from './ContinuousControl';

enum Commands {
  NOTE_ON = 144,
  NOTE_OFF = 128,
  CONTINUOUS_CONTROL = 176,
}

const noteStrings = [
  'c',
  'db',
  'd',
  'eb',
  'e',
  'f',
  'gb',
  'g',
  'ab',
  'a',
  'bb',
  'b',
] as const;

export async function listen(
  playTone: ReturnType<typeof getPlayTone>,
  adjustContinuousControlFunction: typeof adjustContinuousControl,
) {
  const midiAccess: WebMidi.MIDIAccess = await navigator.requestMIDIAccess();

  const stopTones: Record<number, () => void> = {};

  midiAccess.inputs.forEach(entry => {
    // eslint-disable-next-line no-param-reassign
    entry.onmidimessage = event => {
      const [command, message, value] = event.data;

      switch (command) {
        case Commands.NOTE_ON:
          stopTones[message] = playTone({
            note: noteStrings[message % 12],
            octave: Math.floor(message / 12),
            velocity: value,
          });
          break;
        case Commands.NOTE_OFF:
          stopTones[message]?.();
          break;
        case Commands.CONTINUOUS_CONTROL:
          adjustContinuousControlFunction(message, value);
          break;
        default:
          break;
      }
    };
  });
}
