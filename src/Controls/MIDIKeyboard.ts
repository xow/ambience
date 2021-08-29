import type { getHandleMidi } from '../Instruments/Synth';
import { Commands } from '../Tools/Midi';
import type { adjustContinuousControl } from './ContinuousControl';

export async function listen(
  handleMidi: ReturnType<typeof getHandleMidi>,
  adjustContinuousControlFunction: typeof adjustContinuousControl,
) {
  const midiAccess: WebMidi.MIDIAccess = await navigator.requestMIDIAccess();

  const destructors = [...midiAccess.inputs.entries()].reduce<
    Array<() => void>
  >((carry, [, input]) => {
    // Remove old listener if it exists
    const listener = (e: WebMidi.MIDIMessageEvent) => {
      const [command, message, value] = e.data;

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

    input.addEventListener('midimessage', listener);

    function destruct() {
      input.removeEventListener(
        'midimessage',
        listener as unknown as EventListener,
      );
    }

    return [...carry, destruct];
  }, []);

  return () => {
    destructors.forEach(destruct => destruct());
  };
}
