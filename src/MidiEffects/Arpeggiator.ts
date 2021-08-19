import { MidiEffect } from '.';
import { Commands, IHandleMidi, MidiSignal } from '../Tools/Midi';

type ArpeggiatorStyles = 'trigger' | 'up';

interface IArpeggiatorParams {
  bpm: number;
  timeSignature: number;
  noteDenominator: number;
  /** 0 to 1; the length between each note the note will be held */
  gate: number;
  /** The pattern in which the currently held notes will play */
  style: ArpeggiatorStyles;
}

class Arpeggiator extends MidiEffect {
  inputOnMidi: IHandleMidi;

  isKeydownByNote: Record<number, boolean>;
  velocityByNote: Record<number, number>;

  currentTick: number;
  delayMs: number;
  gate: number;

  constructor({
    bpm,
    timeSignature,
    noteDenominator,
    gate,
    style,
  }: IArpeggiatorParams) {
    super();

    this.isKeydownByNote = {};
    this.velocityByNote = {};
    this.currentTick = 0;

    this.delayMs = (((60 / bpm) * timeSignature) / noteDenominator) * 1000;
    this.gate = gate;

    setInterval(() => {
      this.tick(style);
    }, this.delayMs);

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

  up() {
    const downEntries = Object.entries(this.isKeydownByNote).reduce<
      Array<number>
    >((carry, [note, isKeyDown]): Array<number> => {
      if (isKeyDown) return [...carry, parseInt(note, 10)];
      return carry;
    }, [] as Array<number>);

    const note = downEntries[this.currentTick % downEntries.length];

    if (!note) return;

    const message = note;
    const value = this.velocityByNote[note] || 0;

    this.outputOnMidi({
      command: Commands.NOTE_ON,
      message,
      value,
    });

    // TODO gate param
    setTimeout(() => {
      this.outputOnMidi({
        command: Commands.NOTE_OFF,
        message,
        value,
      });
    }, this.delayMs * this.gate);
  }

  trigger() {
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
      setTimeout(() => {
        this.outputOnMidi({
          command: Commands.NOTE_OFF,
          message,
          value,
        });
      }, this.delayMs * this.gate);
    });
  }

  tick(style: ArpeggiatorStyles) {
    this.currentTick += 1;

    switch (style) {
      case 'up':
        this.up();
        break;
      case 'trigger':
        this.trigger();
        break;
      default:
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  outputOnMidi = (signal: MidiSignal) => {};
}

export function createArpeggiator(params: IArpeggiatorParams): MidiEffect {
  return new Arpeggiator(params);
}
