import { useContext } from 'react';

import Select from '../Util/Select';
import Switch from '../Util/Switch';
import Radial from '../Util/Radial';
import PluginControl from '../PluginControl';
import type { IDawSettings, initialise } from '../..';
import { SynthParametersContext } from '../../pages';
import Delay from './Delay';
import Arpeggiator from './Arpeggiator';
import Chord from './Chord';
import Transpose from './Transpose';
import General from './General';
import Filter from './Filter';

interface IProps {
  controls: ReturnType<typeof initialise>;
}

function SynthControls({ controls }: IProps) {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <div className="flex flex-wrap">
      <General />
      <PluginControl pluginName="Oscillator">
        <Select<IDawSettings['type']>
          label="Waveform"
          options={{
            sawtooth: 'Saw',
            sine: 'Sine',
            square: 'Square',
            triangle: 'Triangle',
          }}
          value={dawSettings.type}
          onChange={value => setDawSettings({ ...dawSettings, type: value })}
        />
      </PluginControl>
      <Arpeggiator controls={controls} />
      <PluginControl pluginName="Reverb">
        <div className="flex-grow w-36">
          <Switch
            label="On/Off"
            value={dawSettings.reverb.isOn}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                reverb: { ...dawSettings.reverb, isOn: value },
              })
            }
          />
        </div>
        <div className="flex-grow w-36">
          <Radial
            label="Decay"
            value={dawSettings.reverb.decay}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                reverb: { ...dawSettings.reverb, decay: value },
              })
            }
            min={0.1}
            max={15}
            suffix=""
            decimalPlaces={1}
          />
        </div>
        <div className="flex-grow w-36">
          <Radial
            label="Dry/Wet"
            value={dawSettings.reverb.dryWet * 100}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                reverb: { ...dawSettings.reverb, dryWet: value / 100 },
              })
            }
            min={0}
            max={100}
            suffix="%"
            decimalPlaces={0}
          />
        </div>
      </PluginControl>
      <Delay />
      <Chord />
      <Transpose />
      <Filter />
    </div>
  );
}

export default SynthControls;
