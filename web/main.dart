import 'dart:html';
import 'dart:web_audio';
import 'Instruments/Synth.dart';
import 'Tools/Midi.dart';

void onClickKey({required String note, required int octave}) {
  window.alert(note);
}

void main() {
  /// Main audio context
  final context = AudioContext();

  /// Instrument
  final instrument = context.createGain();

  final playTone = getPlayTone(context: context, instrumentNode: instrument);

  noteStrings.forEach((String note) {
    final key = DivElement();
    key.className = 'key';
    querySelector('.keyboard')?.children.add(key);
    key.onClick.listen((event) {
      playTone(message: 96, velocity: 127);
      onClickKey(note: note, octave: 4);
    });
  });
}
