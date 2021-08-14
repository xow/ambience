import * as MIDI from './Controls/MIDIKeyboard';
import * as OnScreenKeyboard from './Controls/OnScreenKeyboard';
import { getPlayTone, IPlayTone } from './Instruments/Oscillator';
import { createReverb } from './AudioEffects/Reverb';
import { createFilter } from './AudioEffects/Filter';
import { adjustContinuousControl } from './Controls/ContinuousControl';
import { createTrack, Track } from './DAW/Track';
import { createDelay } from './AudioEffects/Delay';
import { MidiSignal } from './MidiEffects';
import { createTranspose } from './MIDIEffects/Transpose';

export function initialise() {
  const bpm = 120;
  const timeSignature = 4;

  /**
   * Main audio context
   */
  const context = new window.AudioContext();

  // Audio Effects
  const reverb = createReverb(context, 6, 0.5);
  const filter = createFilter(context, 5000, 'lowpass', 1, 1);
  const delay = createDelay(context, bpm, timeSignature, 4, 0.4, 0.4);

  // Midi Effects
  const transpose = createTranspose({ semiTones: -12 });

  // Instrument

  const instrument = context.createGain();

  /**
   * Master Track
   */
  const masterTrack: Track = {
    audioEffectsChain: [delay, filter, reverb],
    midiEffectsChain: [transpose],
    volume: 0.6,
    instrument,
  };

  createTrack({ track: masterTrack, context });

  const playTone = getPlayTone({ context, instrumentNode: instrument });

  const handleMidiEvent: IPlayTone = signal => {
    const processedSignal = masterTrack.midiEffectsChain.reduce<MidiSignal>(
      (currentSignal, midiEffect): MidiSignal => {
        return midiEffect.process(currentSignal);
      },
      signal,
    );
    return playTone(processedSignal);
  };

  MIDI.listen(handleMidiEvent, adjustContinuousControl);
  const onClickKey = OnScreenKeyboard.listen(handleMidiEvent);

  return { onClickKey };
}
