import * as MIDI from './Controls/MIDIKeyboard';
import * as OnScreenKeyboard from './Controls/OnScreenKeyboard';
import { getHandleMidi, IGetHandleMidiProps } from './Instruments/Synth';
import { createReverb } from './AudioEffects/Reverb';
import { createFilter } from './AudioEffects/Filter';
import { adjustContinuousControl } from './Controls/ContinuousControl';
import { createTrack, Track } from './DAW/Track';
import { createDelay } from './AudioEffects/Delay';
import { createTranspose } from './MidiEffects/Transpose';
import { IHandleMidi } from './Tools/Midi';
import { createArpeggiator } from './MidiEffects/Arpeggiator';

export interface ISynthParameters {
  type: IGetHandleMidiProps['type'];
}

export function initialise(params: ISynthParameters) {
  const bpm = 120;
  const timeSignature = 4;

  /**
   * Main audio context
   */
  const context = new window.AudioContext();

  // Audio Effects
  const reverb = createReverb(context, 6, 0.5);
  const filter = createFilter(context, 3000, 'lowpass', 1, 1);
  const delay = createDelay(context, bpm, timeSignature, 4, 0.4, 0.4);

  // Midi Effects
  const transpose = createTranspose({ semiTones: -12 });
  const arpeggiator = createArpeggiator({
    bpm,
    timeSignature,
    noteDenominator: 8,
    gate: 0.5,
    style: 'up',
  });

  // Instrument

  const instrument = context.createGain();

  /**
   * Master Track
   */
  const masterTrack: Track = {
    audioEffectsChain: [delay, filter, reverb],
    midiEffectsChain: [transpose, arpeggiator],
    volume: 0.6,
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

  return { handleClickKey };
}
