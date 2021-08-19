import { frequencies, getHandleMidi } from '../Instruments/Synth';
import { Commands, octaveAndNoteToMessage } from '../Tools/Midi';

export type IHandleClickKey = ({
  note,
  octave,
}: {
  note: keyof typeof frequencies;
  octave: number;
}) => { handleReleaseKey: () => void };

export function listen(
  handleMidi: ReturnType<typeof getHandleMidi>,
): IHandleClickKey {
  return ({ note, octave }) => {
    const message = octaveAndNoteToMessage({ note, octave });

    handleMidi({ command: Commands.NOTE_ON, message, value: 100 });

    return {
      handleReleaseKey: () =>
        handleMidi({ command: Commands.NOTE_OFF, message, value: 100 }),
    };
  };
}
