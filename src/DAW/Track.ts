import { AudioEffect } from '../AudioEffects';
import { MidiEffect } from '../MidiEffects';

export interface Track {
  audioEffectsChain: AudioEffect[];
  midiEffectsChain: MidiEffect[];
  volume: number;
  instrument: AudioNode;
}

interface ICreateTrackProps {
  track: Track;
  context: AudioContext;
}

export function createTrack({ track, context }: ICreateTrackProps) {
  const trackVolumeNode = context.createGain();
  trackVolumeNode.gain.value = track.volume;

  const nodeConnectionChain: AudioEffect[] = [
    { input: null, output: track.instrument },
    ...track.audioEffectsChain,
    { input: trackVolumeNode, output: trackVolumeNode },
    { input: context.destination, output: null },
  ];

  nodeConnectionChain.forEach((currentNode: AudioEffect, i) => {
    // Final node, don't need to connect
    if (i + 1 > nodeConnectionChain.length - 1) return;

    const nextNode = nodeConnectionChain[i + 1];
    currentNode.output.connect(nextNode.input);
  });
}
