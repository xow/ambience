export const frequencies = {
  c0: 440 / 1.681793,
  db0: 440 / 1.587401,
  d0: 440 / 1.498307,
  eb0: 440 / 1.414214,
  e0: 440 / 1.33484,
  f0: 440 / 1.259921,
  gb0: 440 / 1.189207,
  g0: 440 / 1.122462,
  ab0: 440 / 1.059463,
  a0: 440,
  bb0: 440 * 1.059463,
  b0: 440 * 1.122462,
};

const context = new window.AudioContext();

export function playTone(note: keyof typeof frequencies) {
  var osc = context.createOscillator(); // instantiate an oscillator
  osc.type = "sawtooth"; // this is the default - also square, sawtooth, triangle
  osc.frequency.value = frequencies[note]; // Hz
  osc.connect(context.destination); // connect it to the destination
  osc.start(); // start the oscillator
  osc.stop(context.currentTime + 0.3); // stop 2 seconds after the current time
}

const convolver = context.createConvolver();
convolver.connect(context.destination);

function impulseResponse(duration: number, decay: number, reverse: boolean) {
  var sampleRate = context.sampleRate;
  var length = sampleRate * duration;
  var impulse = context.createBuffer(2, length, sampleRate);
  var impulseL = impulse.getChannelData(0);
  var impulseR = impulse.getChannelData(1);

  if (!decay) decay = 2.0;
  for (var i = 0; i < length; i++) {
    var n = reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }
  return impulse;
}
