import type { getHandleMidi } from '../Instruments/Synth';
import { Commands } from '../Tools/Midi';
import type { adjustContinuousControl } from './ContinuousControl';

let numberOfListeners = 0;

export async function listen(
  handleMidi: ReturnType<typeof getHandleMidi>,
  adjustContinuousControlFunction: typeof adjustContinuousControl,
) {
  numberOfListeners++;
  const midiAccess: WebMidi.MIDIAccess = await navigator.requestMIDIAccess();

  midiAccess.inputs.forEach(input => {
    const listenerNumber = numberOfListeners;

    // eslint-disable-next-line no-param-reassign
    input.onmidimessage = event => {
      if (listenerNumber !== numberOfListeners) return; // TODO remove the event listener
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
