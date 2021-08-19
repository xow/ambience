import { MidiEffect } from '.';
import { Commands, IHandleMidi, MidiSignal } from '../Tools/Midi';

class Arpeggiator extends MidiEffect {
  inputOnMidi: IHandleMidi;

  isKeydownByNote: Record<number, boolean>;
  velocityByNote: Record<number, number>;

  constructor({
    bpm,
    timeSignature,
    noteDenominator,
  }: {
    bpm: number;
    timeSignature: number;
    noteDenominator: number;
  }) {
    super();

    this.isKeydownByNote = {};
    this.velocityByNote = {};

    const delayMs = (((60 / bpm) * timeSignature) / noteDenominator) * 1000;

    setInterval(() => {
      this.tick(delayMs);
    }, delayMs);

    this.inputOnMidi = ({ command, message, value }: MidiSignal) => {
      switch (command) {
        case Commands.NOTE_ON:
          this.isKeydownByNote[message] = true;
          this.velocityByNote[message] = value;
          break;
        case Commands.NOTE_OFF:
          this.isKeydownByNote[message] = false;
          break;
        default:
          break;
      }
    };
  }

  tick(delayMs: number) {
    Object.entries(this.isKeydownByNote).forEach(([note, isKeyDown]) => {
      if (!isKeyDown) return;
      const message = parseInt(note, 10);
      const value = this.velocityByNote[parseInt(note, 10)] || 0;

      this.outputOnMidi({
        command: Commands.NOTE_ON,
        message,
        value,
      });

      // TODO gate param
      const gate = 0.5;
      setTimeout(() => {
        this.outputOnMidi({
          command: Commands.NOTE_OFF,
          message,
          value,
        });
      }, delayMs * gate);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  outputOnMidi = (signal: MidiSignal) => {};
}

export function createArpeggiator({
  bpm,
  timeSignature,
  noteDenominator,
}: {
  bpm: number;
  timeSignature: number;
  noteDenominator: number;
}): MidiEffect {
  return new Arpeggiator({
    bpm,
    timeSignature,
    noteDenominator,
  });
}
