/**
 * Convert human readable note to a frequency
 */
export const frequencies = {
  c: 440 / 1.681793,
  db: 440 / 1.587401,
  d: 440 / 1.498307,
  eb: 440 / 1.414214,
  e: 440 / 1.33484,
  f: 440 / 1.259921,
  gb: 440 / 1.189207,
  g: 440 / 1.122462,
  ab: 440 / 1.059463,
  a: 440,
  bb: 440 * 1.059463,
  b: 440 * 1.122462,
};

const context = new window.AudioContext();

export function playTone(
  note: keyof typeof frequencies,
  octave: number,
  velocity: number
) {
  const frequency = frequencies[note] * 2 ** (octave - 4);

  const gain = context.createGain();
  gain.gain.value = velocity / 127;

  const osc = context.createOscillator(); // instantiate an oscillator
  osc.type = "sawtooth"; // this is the default - also square, sawtooth, triangle
  osc.frequency.value = frequency; // Hz
  osc.connect(context.destination); // connect it to the destination
  osc.start(); // start the oscillator
  osc.stop(context.currentTime + 0.3);
}

const convolver = context.createConvolver();
convolver.connect(context.destination);

/**
 * Reverb. TODO finsih & use
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function impulseResponse(duration: number, decay: number, reverse: boolean) {
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
