import 'dart:html';
import 'dart:async';

import '../Tools/Midi.dart';

void render(HandleMidi handleMidi) {
  noteStrings.forEach((String note) {
    final key = DivElement();
    key.className = 'key';
    querySelector('.keyboard')?.children.add(key);
    key.onClick.listen((event) {
      final message = octaveAndNoteToMessage(note: note, octave: 4);
      final stopTone =
          handleMidi(command: Commands.NOTE_ON, message: message, value: 127);

      // Handle stopping the midi 400 ms later
      Timer(Duration(milliseconds: 400), () {
        stopTone();
      });
    });
  });
}
