import css from "./index.css";

var context = new (window.AudioContext || window.webkitAudioContext)();
var convolver = context.createConvolver();
convolver.connect(context.destination);
var soundSource, concertHallBuffer;

var frequencies = {
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

function playTone(selector) {
  var osc = context.createOscillator(); // instantiate an oscillator
  osc.type = "sawtooth"; // this is the default - also square, sawtooth, triangle
  osc.frequency.value = frequencies[selector.substr(1)]; // Hz
  osc.connect(context.destination); // connect it to the destination
  osc.start(); // start the oscillator
  osc.stop(context.currentTime + 0.3); // stop 2 seconds after the current time
}

function impulseResponse(duration, decay, reverse) {
  var sampleRate = audioContext.sampleRate;
  var length = sampleRate * duration;
  var impulse = audioContext.createBuffer(2, length, sampleRate);
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

// TODO don't use window
window.playTone = playTone;
