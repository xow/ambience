// TODO add groups
// type NodeGroup = AudioNode[];

type PossibleNode = AudioNode;

type AudioChain = PossibleNode[];

export interface Track {
  chain: AudioChain;
  volume: number;
}

interface ICreateTrackProps {
  track: Track;
  context: AudioContext;
}

export function createTrack({ track, context }: ICreateTrackProps) {
  // Apply volume as final node
  const gain = context.createGain();
  gain.gain.value = track.volume;
  gain.connect(context.destination);

  let nextNode: AudioNode = gain;
  track.chain.forEach((node: PossibleNode) => {
    node.connect(nextNode);
    nextNode = node;
  });
}
