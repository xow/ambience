export enum Commands {
  NOTE_ON = 144,
  NOTE_OFF = 128,
  CONTINUOUS_CONTROL = 176,
}

export const noteStrings = [
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
] as const;

export function messageToOctaveAndNote(message: number) {
  return {
    note: noteStrings[message % 12],
    octave: Math.floor(message / 12),
  };
}

export function octaveAndNoteToMessage({
  note,
  octave,
}: {
  note: typeof noteStrings[number];
  octave: number;
}) {
  return noteStrings.indexOf(note) + octave * 12;
}

export interface MidiSignal {
  command: number;
  message: number;
  value: number;
}

/**
 * A function to begin playing a tone
 * @returns An object with a stopTone function to stop the tone playing
 */
export type IHandleMidi = (data: MidiSignal) => void;
