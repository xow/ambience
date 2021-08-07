import { AudioIO } from '.';
import { createDryWet } from './DryWet';

/**
 * Creates a delay effect node
 * @param context Audio context to create the effect
 * @param bpm Beats per minute
 * @param timeSignature Time signature top half, e.g. 4 = 4/4
 * @param noteDenominator Note denominator, e.g. 4 = quarter note
 * @param dryWet 0 (dry) to 1 (wet)
 * @returns
 */
export function createDelay(
  context: AudioContext,
  bpm: number,
  timeSignature: number,
  noteDenominator: number,
  dryWet: number,
): AudioIO {
  const delay = context.createDelay();

  delay.delayTime.value = ((60 / bpm) * timeSignature) / noteDenominator;

  return createDryWet(context, delay, dryWet);
}