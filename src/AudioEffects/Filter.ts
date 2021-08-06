/**
 * Returns a filter
 * @param context Audio context we should create the filter under
 * @param cutoffFrequency Frequency of cutoff fot the filter
 * @returns A biquadfilter representing the filter to be connected.
 */
export function createFilter(context: AudioContext, cutoffFrequency: number) {
  const biquadFilter = context.createBiquadFilter();

  biquadFilter.type = 'lowpass';
  biquadFilter.frequency.value = cutoffFrequency;

  return biquadFilter;
}
