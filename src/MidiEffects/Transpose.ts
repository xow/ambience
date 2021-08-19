import { MidiEffect } from '.';
import { IHandleMidi, MidiSignal } from '../Tools/Midi';

class Transpose extends MidiEffect {
  inputOnMidi: IHandleMidi;

  constructor(semiTones: number) {
    super();
    this.inputOnMidi = ({ command, message, value }: MidiSignal) => {
      this.outputOnMidi({ command, message: message + semiTones, value });
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  outputOnMidi = (signal: MidiSignal) => {};
}

export function createTranspose({
  semiTones,
}: {
  semiTones: number;
}): MidiEffect {
  return new Transpose(semiTones);
}
