import { frequencies, getPlayTone } from '../Instruments/Oscillator';
import { Commands, octaveAndNoteToMessage } from '../Tools/Midi';

export type IHandleClickKey = ({
  note,
  octave,
}: {
  note: keyof typeof frequencies;
  octave: number;
}) => void;

export function listen(
  playTone: ReturnType<typeof getPlayTone>,
): IHandleClickKey {
  return ({ note, octave }) => {
    const message = octaveAndNoteToMessage({ note, octave });
    const command = Commands.NOTE_ON;
    const { stopTone } = playTone({ command, message, value: 100 });
    setTimeout(() => stopTone(), 400);
  };
}
