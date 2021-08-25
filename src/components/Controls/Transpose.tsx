import { useContext } from 'react';
import { SynthParametersContext } from '../../pages';
import PluginControl from '../PluginControl';
import Radial from '../Util/Radial';
import Switch from '../Util/Switch';

function Transpose() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <PluginControl pluginName="Transpose">
      <div className="flex-grow w-36">
        <Switch
          label="On/Off"
          value={dawSettings.transpose.isOn}
          onChange={value =>
            setDawSettings({
              ...dawSettings,
              transpose: { ...dawSettings.transpose, isOn: value },
            })
          }
        />
      </div>
      <div className="flex-grow w-36">
        <Radial
          label="Semitones"
          value={dawSettings.transpose.semiTones}
          onChange={value =>
            setDawSettings({
              ...dawSettings,
              transpose: {
                ...dawSettings.transpose,
                semiTones: value,
              },
            })
          }
          min={-12}
          max={12}
          suffix=""
          decimalPlaces={0}
        />
      </div>
      <div className="flex-grow w-36">
        <Switch
          label="Output dry signal"
          value={dawSettings.transpose.shouldOutputDry}
          onChange={value =>
            setDawSettings({
              ...dawSettings,
              transpose: { ...dawSettings.transpose, shouldOutputDry: value },
            })
          }
        />
      </div>
    </PluginControl>
  );
}

export default Transpose;
