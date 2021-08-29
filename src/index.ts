import * as MIDI from './Controls/MIDIKeyboard';
import * as OnScreenKeyboard from './Controls/OnScreenKeyboard';
import { getHandleMidi, IGetHandleMidiProps } from './Instruments/Synth';
import { createReverb } from './AudioEffects/Reverb';
import { createFilter, ICreateFilterParams } from './AudioEffects/Filter';
import { adjustContinuousControl } from './Controls/ContinuousControl';
import { createTrack, Track } from './DAW/Track';
import { createDelay, DelayRates } from './AudioEffects/Delay';
import { createTranspose, ITransposeParams } from './MidiEffects/Transpose';
import { IHandleMidi } from './Tools/Midi';
import {
  createArpeggiator,
  IArpeggiatorUniqueParams,
} from './MidiEffects/Arpeggiator';
import { createChord, IChordParams } from './MidiEffects/Chord';
import { Patches } from './DAW/Presets';

export interface IDawSettings {
  // Patch
  id: Patches;
  name: string;
  seoName: string;
  description: string;

  // Song
  bpm: number;
  timeSignature: number;

  synth: {
    type: IGetHandleMidiProps['type'];
    attack: number;
    delay: number;
    sustain: number;
    release: number;
    spread: number;
    unison: number;
  };

  // Audio effects. TODO: dynamic array of synth settings
  reverb: {
    isOn: boolean;
    decay: number;
    dryWet: number;
  };
  delay: {
    isOn: boolean;
    noteDenominator: DelayRates;
    feedback: number;
    dryWet: number;
  };
  filter0: ICreateFilterParams & { isOn: boolean };
  filter1: ICreateFilterParams & { isOn: boolean };
  chord: IChordParams & { isOn: boolean };
  transpose: ITransposeParams & { isOn: boolean };
  arpeggiator: IArpeggiatorUniqueParams & { isOn: boolean };
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
  const filter0 = createFilter({ context, ...params.filter0 });
  const filter1 = createFilter({ context, ...params.filter1 });

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
    midiEffectsChain: [
      ...(params.chord.isOn ? [chord] : []),
      ...(params.arpeggiator.isOn ? [arpeggiator] : []),
      ...(params.transpose.isOn ? [transpose] : []),
    ],
    instrument,
    audioEffectsChain: [
      ...(params.delay.isOn ? [delay] : []),
      ...(params.filter0.isOn ? [filter0] : []),
      ...(params.filter1.isOn ? [filter1] : []),
      ...(params.reverb.isOn ? [reverb] : []),
    ],
    volume: 0.3,
  };

  createTrack({ track: masterTrack, context });

  const instrumentHandleMidi = getHandleMidi({
    context,
    instrumentNode: instrument,
    ...params.synth,
  });

  // Output the last in the chain to the instrument
  if (masterTrack.midiEffectsChain.length > 0) {
    masterTrack.midiEffectsChain[
      masterTrack.midiEffectsChain.length - 1
    ].outputOnMidi = x => instrumentHandleMidi(x);
  }

  // TODO move to create track?
  const handleMidiEvent: IHandleMidi = signal => {
    if (masterTrack.midiEffectsChain.length < 1) {
      instrumentHandleMidi(signal);
      return;
    }
    // Signal the first in the chain
    masterTrack.midiEffectsChain[0].inputOnMidi(signal);
  };

  const midiDestructorPromise = MIDI.listen(
    handleMidiEvent,
    adjustContinuousControl,
  );
  const handleClickKey = OnScreenKeyboard.listen(handleMidiEvent);

  async function destruct() {
    context.close();

    const midiDestructor = await midiDestructorPromise;
    midiDestructor();

    // TODO make master track class w/ destructor
    masterTrack.midiEffectsChain.forEach(midiEffect => {
      midiEffect.destruct();
    });
  }

  return {
    handleClickKey,
    handleUnlatch: () => arpeggiator.unLatch(),
    destruct,
  };
}
