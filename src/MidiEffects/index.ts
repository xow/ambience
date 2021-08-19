import { IHandleMidi } from '../Tools/Midi';

export abstract class MidiEffect {
  abstract inputOnMidi: IHandleMidi;

  abstract outputOnMidi: IHandleMidi;
}
