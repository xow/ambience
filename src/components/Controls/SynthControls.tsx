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
      <Chord />
      <Arpeggiator controls={controls} />
      <Transpose />
      <Synth />
      <Delay />
      <Filter />
      <Reverb />
    </div>
  );
}

export default SynthControls;
