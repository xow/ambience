import 'dart:web_audio';
import 'Instruments/Synth.dart';
import 'UI/OnScreenKeyboard.dart';

/// Main audio context
final context = AudioContext();

/// Instrument
final instrument = context.createGain();

final playTone = getPlayTone(context: context, instrumentNode: instrument);

void handleMidi(
    {required int command, required int message, required int value}) {
  playTone(message: message, velocity: value);
}

void main() {
  if (context.destination != null) {
    instrument.connectNode(context.destination!);
  }

  render(handleMidi);
}
