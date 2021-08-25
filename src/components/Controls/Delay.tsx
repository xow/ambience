import { useContext } from 'react';
import { DelayRates } from '../../AudioEffects/Delay';
import { SynthParametersContext } from '../../pages';
import PluginControl from '../PluginControl';
import Radial from '../Util/Radial';
import Select from '../Util/Select';
import Switch from '../Util/Switch';

function Delay() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <PluginControl pluginName="Delay">
      <div className="flex-grow w-36">
        <Switch
          label="On/Off"
          value={dawSettings.delay.isOn}
          onChange={value =>
            setDawSettings({
              ...dawSettings,
              delay: { ...dawSettings.delay, isOn: value },
            })
          }
        />
      </div>
      <div className="flex-grow w-36">
        <Select<`${DelayRates}`>
          label="Rate"
          options={{
            '1': '1/1',
            '2': '1/2',
            '3': '1/3',
            '4': '1/4',
            '6': '1/6',
            '8': '1/8',
            '12': '1/12',
            '16': '1/16',
            '18': '1/18',
            '24': '1/24',
            '32': '1/32',
          }}
          value={`${dawSettings.delay.noteDenominator}`}
          onChange={value =>
            setDawSettings({
              ...dawSettings,
              delay: {
                ...dawSettings.delay,
                noteDenominator: parseInt(value, 10) as
                  | 1
                  | 2
                  | 3
                  | 4
                  | 6
                  | 8
                  | 12
                  | 16
                  | 18
                  | 24
                  | 32,
              },
            })
          }
        />
      </div>
      <div className="flex-grow w-36">
        <Radial
          label="Feedback"
          value={dawSettings.delay.feedback * 100}
          onChange={value =>
            setDawSettings({
              ...dawSettings,
              delay: { ...dawSettings.delay, feedback: value / 100 },
            })
          }
          min={0}
          max={100}
          suffix="%"
          decimalPlaces={0}
        />
      </div>
      <div className="flex-grow w-36">
        <Radial
          label="Dry/Wet"
          value={dawSettings.delay.dryWet * 100}
          onChange={value =>
            setDawSettings({
              ...dawSettings,
              delay: { ...dawSettings.delay, dryWet: value / 100 },
            })
          }
          min={0}
          max={100}
          suffix="%"
          decimalPlaces={0}
        />
      </div>
    </PluginControl>
  );
}

export default Delay;
