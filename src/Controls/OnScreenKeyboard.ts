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
    const command = Commands.NOTE_ON;

    const { stopTone } = handleMidi({ command, message, value: 100 });

    return { handleReleaseKey: () => stopTone() };
  };
}
