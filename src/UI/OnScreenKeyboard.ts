import { frequencies, getPlayTone } from '../Instruments/Oscillator';
import { Commands, octaveAndNoteToMessage } from '../Tools/Midi';

export function listen(playTone: ReturnType<typeof getPlayTone>) {
  (window as any).onClickKey = ({
    note,
    octave,
  }: {
    note: keyof typeof frequencies;
    octave: number;
  }) => {
    const message = octaveAndNoteToMessage({ note, octave });
    const command = Commands.NOTE_ON;
    const { stopTone } = playTone({ command, message, value: 100 });
    setTimeout(() => stopTone(), 400);
  };
}
