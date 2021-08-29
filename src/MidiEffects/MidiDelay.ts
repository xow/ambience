import { MidiEffect } from '.';
import { IHandleMidi, MidiSignal } from '../Tools/Midi';

class MidiDelay extends MidiEffect {
  inputOnMidi: IHandleMidi;

  constructor({
    bpm,
    timeSignature,
    noteDenominator,
    shouldOutputDry,
  }: {
    bpm: number;
    timeSignature: number;
    noteDenominator: number;
    shouldOutputDry: boolean;
  }) {
    super();
    this.inputOnMidi = ({ command, message, value }: MidiSignal) => {
      const delayMs = (((60 / bpm) * timeSignature) / noteDenominator) * 1000;

      setTimeout(() => {
        this.outputOnMidi({ command, message, value });
      }, delayMs);

      if (shouldOutputDry) this.outputOnMidi({ command, message, value });
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  outputOnMidi = (signal: MidiSignal) => {};

  destruct = () => {
    // TODO stop delays (not that important as there will only be 1)
  };
}

export function createMidiDelay({
  bpm,
  timeSignature,
  noteDenominator,
  shouldOutputDry,
}: {
  bpm: number;
  timeSignature: number;
  noteDenominator: number;
  shouldOutputDry: boolean;
}): MidiEffect {
  return new MidiDelay({
    bpm,
    timeSignature,
    noteDenominator,
    shouldOutputDry,
  });
}
