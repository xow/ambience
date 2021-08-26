import { useContext } from 'react';
import { SynthParametersContext } from '../../pages';
import PluginControl from './PluginControl';
import Switch from '../Util/Switch';
import Radial from '../Util/Radial';

function Reverb() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
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
          displayFunction={x => x.toFixed(1)}
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
          displayFunction={x => `${x}%`}
          decimalPlaces={0}
        />
      </div>
    </PluginControl>
  );
}

export default Reverb;
