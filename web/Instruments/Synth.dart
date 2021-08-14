// import { MidiSignal } from '../MidiEffects';
// import { messageToOctaveAndNote } from '../Tools/Midi';
import 'dart:web_audio';
import 'dart:math';
import '../Tools/Midi.dart';

/// Convert human readable note to a frequency
final Map<String, num> frequencies = {
  'c': 440 / 1.681793,
  'db': 440 / 1.587401,
  'd': 440 / 1.498307,
  'eb': 440 / 1.414214,
  'e': 440 / 1.33484,
  'f': 440 / 1.259921,
  'gb': 440 / 1.189207,
  'g': 440 / 1.122462,
  'ab': 440 / 1.059463,
  'a': 440,
  'bb': 440 * 1.059463,
  'b': 440 * 1.122462,
};

typedef StopTone = void Function();

typedef IPlayTone = StopTone Function(
    {required int message, required int velocity});

/// Returns a function that when called will play a certain note
IPlayTone getPlayTone({
  required AudioContext context,
  required AudioNode instrumentNode,
}) {
  return ({required int message, required int velocity}) {
    final octaveAndNote = messageToOctaveAndNote(message);

    final note = octaveAndNote.note;
    final octave = octaveAndNote.octave;

    final frequency = (frequencies[note] ?? 0) * pow(2, (octave - 4));

    // Todo have set polyphony, reuse or discard unneeded nodes.
    final gain = context.createGain();
    gain.gain?.value = velocity / 127;

    // Todo make params
    final unison = 3;
    final type = 'sawtooth';
    final spread = 0.005;

    final oscillators = List.generate(unison, (i) {
      final num detune = ((i - (unison - 1) / 2) / (unison - 1)) * spread;

      final osc = context.createOscillator(); // instantiate an oscillator
      osc.type = type; // this is the default - also square, sawtooth, triangle
      osc.frequency?.value = frequency * (1 + detune); // Hz
      osc.start2(); // start the oscillator
      osc.connectNode(
          gain); // connect it to the gain node to give it correct velocity

      return osc;
    });

    gain.connectNode(instrumentNode);

    void stopTone() {
      oscillators.forEach((oscillator) {
        oscillator.stop(0);
      });
    }

    return stopTone;
  };
}
