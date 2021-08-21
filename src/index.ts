import * as MIDI from './Controls/MIDIKeyboard';
import * as OnScreenKeyboard from './Controls/OnScreenKeyboard';
import { getHandleMidi, IGetHandleMidiProps } from './Instruments/Synth';
import { createReverb } from './AudioEffects/Reverb';
import { createFilter, ICreateFilterParams } from './AudioEffects/Filter';
import { adjustContinuousControl } from './Controls/ContinuousControl';
import { createTrack, Track } from './DAW/Track';
import { createDelay } from './AudioEffects/Delay';
import { createTranspose } from './MidiEffects/Transpose';
import { IHandleMidi } from './Tools/Midi';
import { createArpeggiator } from './MidiEffects/Arpeggiator';
import { createChord } from './MidiEffects/Chord';

export interface IDawSettings {
  // Song
  bpm: number;
  timeSignature: number;

  // Synth
  type: IGetHandleMidiProps['type'];

  // Audio effects. TODO: dynamic array of synth settings
  reverb: {
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
  const chord = createChord({ noteOffsets: [-12, -5, 0, 2, 4, 7, 12] }); // 1, 5, 1, 2, 3, 5, 1
  const transpose = createTranspose({ semiTones: 12, shouldOutputDry: true });
  const arpeggiator = createArpeggiator({
    bpm: params.bpm,
    timeSignature: params.timeSignature,
    noteDenominator: 8,
    gate: 1,
    style: 'up',
    isLatchOn: true,
  });

  // Instrument

  const instrument = context.createGain();

  /**
   * Master Track
   */
  const masterTrack: Track = {
    audioEffectsChain: [delay, lowpassFilter, highpassFilter, reverb],
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
