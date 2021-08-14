import { MidiEffect } from '.';

export function createTranspose({
  semiTones,
}: {
  semiTones: number;
}): MidiEffect {
  return {
    process: ({ command, message, value }) => {
      return { command, message: message + semiTones, value };
    },
  };
}
