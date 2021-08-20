import { MidiEffect } from '.';
import { IHandleMidi, MidiSignal } from '../Tools/Midi';

interface ITransposeParams {
  semiTones: number;
  shouldOutputDry: boolean;
}

class Transpose extends MidiEffect {
  inputOnMidi: IHandleMidi;

  constructor({ semiTones, shouldOutputDry }: ITransposeParams) {
    super();
    this.inputOnMidi = ({ command, message, value }: MidiSignal) => {
      if (shouldOutputDry) this.outputOnMidi({ command, message, value });
      this.outputOnMidi({ command, message: message + semiTones, value });
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  outputOnMidi = (signal: MidiSignal) => {};
}

export function createTranspose(params: ITransposeParams): MidiEffect {
  return new Transpose(params);
}
