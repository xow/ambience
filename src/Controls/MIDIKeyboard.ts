import type { getHandleMidi } from '../Instruments/Synth';
import { Commands } from '../Tools/Midi';
import type { adjustContinuousControl } from './ContinuousControl';

export async function listen(
  handleMidi: ReturnType<typeof getHandleMidi>,
  adjustContinuousControlFunction: typeof adjustContinuousControl,
) {
  const midiAccess: WebMidi.MIDIAccess = await navigator.requestMIDIAccess();

  midiAccess.inputs.forEach(entry => {
    // eslint-disable-next-line no-param-reassign
    entry.onmidimessage = event => {
      const [command, message, value] = event.data;

      switch (command) {
        case Commands.NOTE_ON:
        case Commands.NOTE_OFF:
          handleMidi({ command, message, value });
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
