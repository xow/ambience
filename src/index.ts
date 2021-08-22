import * as MIDI from './Controls/MIDIKeyboard';
import * as OnScreenKeyboard from './Controls/OnScreenKeyboard';
import { getHandleMidi, IGetHandleMidiProps } from './Instruments/Synth';
import { createReverb } from './AudioEffects/Reverb';
import { createFilter, ICreateFilterParams } from './AudioEffects/Filter';
import { adjustContinuousControl } from './Controls/ContinuousControl';
import { createTrack, Track } from './DAW/Track';
import { createDelay } from './AudioEffects/Delay';
import { createTranspose, ITransposeParams } from './MidiEffects/Transpose';
import { IHandleMidi } from './Tools/Midi';
import {
  createArpeggiator,
  IArpeggiatorUniqueParams,
} from './MidiEffects/Arpeggiator';
import { createChord, IChordParams } from './MidiEffects/Chord';

export interface IDawSettings {
  // Song
  bpm: number;
  timeSignature: number;

  // Synth
  type: IGetHandleMidiProps['type'];

  // Audio effects. TODO: dynamic array of synth settings
  reverb: {
    isOn: boolean;
    decay: number;
    dryWet: number;
  };
  delay: {
    noteDenominator: number;
    feedback: number;
    dryWet: number;
  };
  filter0: ICreateFilterParams;
  filter1: ICreateFilterParams;
  chord: IChordParams;
  transpose: ITransposeParams;
  arpeggiator: IArpeggiatorUniqueParams;
}

export function initialise(params: IDawSettings) {
  /**
   * Main audio context
   */
  const context = new window.AudioContext();

  // Audio Effects
  const reverb = createReverb(
    context,
    params.reverb.decay,
    params.reverb.dryWet,
  );
  const delay = createDelay(
    context,
    params.bpm,
    params.timeSignature,
    params.delay.noteDenominator,
    params.delay.feedback,
    params.delay.dryWet,
  );
  const lowpassFilter = createFilter({ context, ...params.filter0 });
  const highpassFilter = createFilter({ context, ...params.filter1 });

  // Midi Effects
  const chord = createChord(params.chord);
  const transpose = createTranspose(params.transpose);
  const arpeggiator = createArpeggiator({
    bpm: params.bpm,
    timeSignature: params.timeSignature,
    ...params.arpeggiator,
  });

  // Instrument

  const instrument = context.createGain();

  /**
   * Master Track
   */
  const masterTrack: Track = {
    audioEffectsChain: [
      delay,
      lowpassFilter,
      highpassFilter,
      ...(params.reverb.isOn ? [reverb] : []),
    ],
    midiEffectsChain: [chord, arpeggiator, transpose],
    volume: 0.3,
    instrument,
  };

  createTrack({ track: masterTrack, context });

  const instrumentHandleMidi = getHandleMidi({
    context,
    instrumentNode: instrument,
    type: params.type,
  });

  // Output the last in the chain to the instrument
  masterTrack.midiEffectsChain[
    masterTrack.midiEffectsChain.length - 1
  ].outputOnMidi = x => instrumentHandleMidi(x);

  // TODO move to create track?
  const handleMidiEvent: IHandleMidi = signal => {
    // Signal the first in the chain
    masterTrack.midiEffectsChain[0].inputOnMidi(signal);
  };

  MIDI.listen(handleMidiEvent, adjustContinuousControl);
  const handleClickKey = OnScreenKeyboard.listen(handleMidiEvent);

  return { handleClickKey, handleUnlatch: () => arpeggiator.unLatch() };
}
