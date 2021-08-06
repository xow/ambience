/**
 * Create the impulse response for the convolver
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createImpulseResponse(
  context: AudioContext,
  duration: number,
  decay: number,
  reverse: boolean
) {
  const { sampleRate } = context;
  const length = sampleRate * duration;
  const impulse = context.createBuffer(2, length, sampleRate);
  const impulseL = impulse.getChannelData(0);
  const impulseR = impulse.getChannelData(1);

  for (let i = 0; i < length; i += 1) {
    const n = reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * (1 - n / length) ** decay;
    impulseR[i] = (Math.random() * 2 - 1) * (1 - n / length) ** decay;
  }
  return impulse;
}

export async function createReverb(context: AudioContext) {
  const convolver = context.createConvolver();

  // // load impulse response from file
  // const response = await fetch(
  //   "Rocksta Reactions Fender Twin Reverb SM57 A 2 3 3 45.wav"
  // );
  // const arraybuffer = await response.arrayBuffer();
  // convolver.buffer = await context.decodeAudioData(arraybuffer);

  convolver.buffer = createImpulseResponse(context, 1, 0.5, false);

  return convolver;
}
