import { MidiEffect } from '.';
import { IHandleMidi, MidiSignal } from '../Tools/Midi';

export interface IChordParams {
  noteOffsets: number[];
}

class Chord extends MidiEffect {
  inputOnMidi: IHandleMidi;

  noteOffsets: number[];

  constructor({ noteOffsets }: IChordParams) {
    super();

    this.noteOffsets = noteOffsets;

    this.inputOnMidi = ({ command, message, value }: MidiSignal) => {
      noteOffsets.forEach(noteOffset => {
        this.outputOnMidi({ command, message: message + noteOffset, value });
      });
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  outputOnMidi = (signal: MidiSignal) => {};
}

export function createChord(params: IChordParams): MidiEffect {
  return new Chord(params);
}
