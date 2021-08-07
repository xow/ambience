import { AudioIO } from '.';

/**
 * Returns a filter
 * @param context Audio context we should create the filter under
 * @param cutoffFrequency Frequency of cutoff fot the filter
 * @param type Type of filter
 * @param qFactor Q-factor aka. resonance
 * @returns A biquadfilter representing the filter to be connected.
 */
export function createFilter(
  context: AudioContext,
  cutoffFrequency: number,
  type: BiquadFilterType,
  qFactor: number,
): AudioIO {
  const biquadFilter = context.createBiquadFilter();

  biquadFilter.type = type;
  biquadFilter.frequency.value = cutoffFrequency;
  biquadFilter.Q.value = qFactor;

  return { input: biquadFilter, output: biquadFilter };
}
