import 'dart:html';
// import 'dart:async';

import '../Tools/Midi.dart';
// import '../Instruments/Synth.dart';

void render(HandleMidi handleMidi) {
  noteStrings.forEach((String note) {
    final key = DivElement();
    key.className = 'key';
    querySelector('.keyboard')?.children.add(key);
    key.onClick.listen((event) {
      final message = octaveAndNoteToMessage(note: note, octave: 4);
      handleMidi(command: Commands.NOTE_ON, message: message, value: 127);
    });
  });
}

// Function listen(IPlayTone playTone) {
//   return ({required String note, required int octave}) {
//     handleMidi(command: Commands.NOTE_ON, message: message, velocity: 100);

//     // TODO handle stop tone
//   };
// }
