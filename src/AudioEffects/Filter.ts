import { AudioEffect } from '.';
import { createDryWet } from './DryWet';

export interface ICreateFilterParams {
  frequency: number;
  type: BiquadFilterType;
  qFactor: number;
  dryWet: number;
}

/**
 * Returns a filter
 * @param context Audio context we should create the filter under
 * @param frequency Frequency of cutoff fot the filter
 * @param type Type of filter
 * @param qFactor Q-factor aka. resonance
 * @param dryWet 0 (dry) to 1 (wet)
 * @returns A biquadfilter representing the filter to be connected.
 */
export function createFilter({
  context,
  frequency,
  type,
  qFactor,
  dryWet,
}: ICreateFilterParams & { context: AudioContext }): AudioEffect {
  const biquadFilter = context.createBiquadFilter();

  biquadFilter.type = type;
  biquadFilter.frequency.value = frequency;
  biquadFilter.Q.value = qFactor;

  return createDryWet(context, biquadFilter, dryWet);
}
