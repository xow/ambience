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

/**
 * Returns a function that when called will play a certain note
 */
export function getPlayTone(context: AudioContext, node: AudioNode) {
  return (note: keyof typeof frequencies, octave: number, velocity: number) => {
    const frequency = frequencies[note] * 2 ** (octave - 4);

    const osc = context.createOscillator(); // instantiate an oscillator
    osc.type = "sawtooth"; // this is the default - also square, sawtooth, triangle
    osc.frequency.value = frequency; // Hz
    osc.start(); // start the oscillator
    osc.stop(context.currentTime + 0.3);

    const gain = context.createGain();
    gain.gain.value = velocity / 127;
    osc.connect(gain); // connect it to the next node
    gain.connect(node);
  };
}
