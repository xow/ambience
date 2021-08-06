function noise(amount: number) {
  return Math.random() * amount - amount / 2;
}

/**
 * Create the impulse response for the convolver
 */
function createImpulseResponse(
  context: AudioContext,
  duration: number,
  decay: number,
) {
  const { sampleRate } = context;
  const length = sampleRate * duration;
  const impulse = context.createBuffer(2, length, sampleRate);
  const impulseL = impulse.getChannelData(0);
  const impulseR = impulse.getChannelData(1);

  for (let i = 0; i < length; i += 1) {
    impulseL[i] = noise(2) * (1 - i / length) ** decay;
    impulseR[i] = noise(2) * (1 - i / length) ** decay;
  }

  return impulse;
}

/**
 * Returns a reverb
 * @param context Audio context we should create the reverb under
 * @param decayTime Number of seconds the reverb tail should last
 * @returns A convolver representing the reverb to be connected.
 */
export function createReverb(context: AudioContext, decayTime: number) {
  const convolver = context.createConvolver();

  convolver.buffer = createImpulseResponse(context, decayTime, 4);

  return convolver;
}
