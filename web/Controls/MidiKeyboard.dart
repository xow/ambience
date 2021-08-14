import 'dart:html';

import '../Instruments/Synth.dart';
import '../Tools/Midi.dart';

void listen({required IPlayTone playTone}) async {
  final midiAccess = await window.navigator.requestMidiAccess() as MidiAccess;

  var stopTones = <num, void Function()>{};

  midiAccess.inputs?.forEach((String name, dynamic entry) {
    final midiInput = entry as MidiInput;

    midiInput.onMidiMessage.listen((event) {
      if (event.data == null) return;

      final command = event.data![0];
      final message = event.data![1];
      final value = event.data![2];

      switch (command) {
        case Commands.NOTE_ON:
          stopTones[message] = playTone(message: message, velocity: value);
          break;
        case Commands.NOTE_OFF:
          if (stopTones[message] == null) return;
          stopTones[message]!();
          break;
        default:
          break;
      }
    });
  });
}
