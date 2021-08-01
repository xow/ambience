import "./styles.css";
import * as MIDI from "./MIDI";
import { frequencies, playTone } from "./Music";

MIDI.listen(playTone);

// TODO don't use window
(window as any).playTone = playTone;
