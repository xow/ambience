import { frequencies, getPlayTone } from '../Instruments/Oscillator';

export function listen(playTone: ReturnType<typeof getPlayTone>) {
  (window as any).onClickKey = ({
    note,
    octave,
  }: {
    note: keyof typeof frequencies;
    octave: number;
  }) => {
    const stopTone = playTone({ note, octave, velocity: 100 });
    setTimeout(() => stopTone(), 400);
  };
}
