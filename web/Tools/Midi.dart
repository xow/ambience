import '../Instruments/Synth.dart';

typedef HandleMidi = StopTone Function(
    {required int command, required int message, required int value});

class Commands {
  static final int NOTE_ON = 144;
  static final int NOTE_OFF = 128;
  static final int CONTINUOUS_CONTROL = 176;
}

const List<String> noteStrings = [
  'c',
  'db',
  'd',
  'eb',
  'e',
  'f',
  'gb',
  'g',
  'ab',
  'a',
  'bb',
  'b',
];

class OctaveAndNote {
  final String note;
  final int octave;

  OctaveAndNote(this.note, this.octave);
}

OctaveAndNote messageToOctaveAndNote(int message) {
  return OctaveAndNote(noteStrings[message % 12], (message / 12).floor());
}

int octaveAndNoteToMessage({
  required String note,
  required int octave,
}) {
  return noteStrings.indexOf(note) + octave * 12;
}
