import type { playTone } from "./Music";

enum Commands {
  NOTE_ON = 144,
  NOT_OFF = 128,
}

export async function listen(playToneFunction: typeof playTone) {
  const midiAccess: WebMidi.MIDIAccess = await navigator.requestMIDIAccess();

  midiAccess.inputs.forEach(function (entry) {
    entry.onmidimessage = (event) => {
      const [command, note, velocity] = event.data;

      console.log(command);

      switch (command) {
        case Commands.NOTE_ON:
          playToneFunction("c0");
      }
    };
  });
}
