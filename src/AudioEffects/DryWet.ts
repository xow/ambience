import { AudioIO } from '.';

/**
 * Creates a node that will be split between dry and wet by the given amount
 * @param context Base audio context
 * @param wetness 0 (dry) to 1 (wet)
 * @returns
 */
export function createDryWet(
  context: AudioContext,
  wet: AudioNode,
  wetness: number,
): AudioIO {
  // Ensure wetness is between 0 and 1
  const cleanWetnessValue = Math.min(Math.max(wetness, 0), 1);

  const input = context.createGain(); // An audio node made to route into dry & wet

  const wetGain = context.createGain();
  const dryGain = context.createGain();

  wetGain.gain.value = cleanWetnessValue;
  dryGain.gain.value = 1 - cleanWetnessValue;

  input.connect(dryGain);
  wet.connect(wetGain); // Connect it to a gain node so we can effect the volume
  input.connect(wet); // This is the actual effect

  const output = context.createGain();
  dryGain.connect(output);
  wetGain.connect(output);

  return { input, output };
}
