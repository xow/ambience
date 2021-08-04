import "./styles.css";
import * as MIDI from "./MIDI";
import { playTone } from "./Music";

MIDI.listen(playTone);

// TODO don't use window
(window as any).playTone = playTone;
