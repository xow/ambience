// TODO add groups
// type NodeGroup = AudioNode[];

type PossibleNode = AudioNode;

type AudioChain = PossibleNode[];

export interface Track {
  chain: AudioChain;
  volume: number;
  instrument: AudioNode;
}

interface ICreateTrackProps {
  track: Track;
  context: AudioContext;
}

export function createTrack({ track, context }: ICreateTrackProps) {
  const gain = context.createGain();
  gain.gain.value = track.volume;

  let nextNode: AudioNode = context.destination;
  [...track.chain, track.instrument, gain].forEach((node: PossibleNode) => {
    node.connect(nextNode);
    nextNode = node;
  });
}
