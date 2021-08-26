import type { initialise } from '../..';
import Delay from './Delay';
import Arpeggiator from './Arpeggiator';
import Chord from './Chord';
import Transpose from './Transpose';
import General from './General';
import Filter from './Filter';
import Synth from './Synth';
import Reverb from './Reverb';

interface IProps {
  controls: ReturnType<typeof initialise>;
}

function SynthControls({ controls }: IProps) {
  return (
    <div className="flex flex-wrap">
      <General />
      <Synth />
      <Arpeggiator controls={controls} />
      <Reverb />
      <Delay />
      <Chord />
      <Transpose />
      <Filter />
    </div>
  );
}

export default SynthControls;
