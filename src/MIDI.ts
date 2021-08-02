import type { playTone } from "./Music";

enum Commands {
  NOTE_ON = 144,
  NOT_OFF = 128,
}

const note = [
  "c",
  "db",
  "d",
  "eb",
  "e",
  "f",
  "gb",
  "g",
  "ab",
  "a",
  "bb",
  "b",
] as const;

export async function listen(playToneFunction: typeof playTone) {
  const midiAccess: WebMidi.MIDIAccess = await navigator.requestMIDIAccess();

  midiAccess.inputs.forEach(function (entry) {
    entry.onmidimessage = (event) => {
      const [command, noteValue, velocity] = event.data;

      const noteIndex = noteValue % 12;
      const octave = Math.floor(noteValue / 12);

      switch (command) {
        case Commands.NOTE_ON:
          playToneFunction(note[noteIndex], octave);
      }
    };
  });
}
