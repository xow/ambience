import "./styles.css";
import * as MIDI from "./MIDI";
import { getPlayTone } from "./Oscillator";
import { createReverb } from "./Reverb";

(async () => {
  /**
   * Main audio context
   */
  const context = new window.AudioContext();

  const reverb = await createReverb(context);

  reverb.connect(context.destination);

  const playTone = getPlayTone(context, reverb);

  MIDI.listen(playTone);

  // TODO don't use window
  (window as any).playTone = playTone;
})();
