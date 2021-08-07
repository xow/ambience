import { AudioIO } from '.';
import { createDryWet } from './DryWet';

/**
 * Returns a filter
 * @param context Audio context we should create the filter under
 * @param cutoffFrequency Frequency of cutoff fot the filter
 * @param type Type of filter
 * @param qFactor Q-factor aka. resonance
 * @param dryWet 0 (dry) to 1 (wet)
 * @returns A biquadfilter representing the filter to be connected.
 */
export function createFilter(
  context: AudioContext,
  cutoffFrequency: number,
  type: BiquadFilterType,
  qFactor: number,
  dryWet: number,
): AudioIO {
  const biquadFilter = context.createBiquadFilter();

  biquadFilter.type = type;
  biquadFilter.frequency.value = cutoffFrequency;
  biquadFilter.Q.value = qFactor;

  return createDryWet(context, biquadFilter, dryWet);
}
