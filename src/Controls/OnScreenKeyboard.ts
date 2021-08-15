import { frequencies, getPlayTone } from '../Instruments/Synth';
import { Commands, octaveAndNoteToMessage } from '../Tools/Midi';

export type IHandleClickKey = ({
  note,
  octave,
}: {
  note: keyof typeof frequencies;
  octave: number;
}) => { handleReleaseKey: () => void };

export function listen(
  playTone: ReturnType<typeof getPlayTone>,
): IHandleClickKey {
  return ({ note, octave }) => {
    const message = octaveAndNoteToMessage({ note, octave });
    const command = Commands.NOTE_ON;

    const { stopTone } = playTone({ command, message, value: 100 });

    return { handleReleaseKey: () => stopTone() };
  };
}
