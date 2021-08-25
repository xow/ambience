import { useContext } from 'react';
import { SynthParametersContext } from '../../pages';
import PluginControl from '../PluginControl';
import Switch from '../Util/Switch';

function Chord() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <PluginControl pluginName="Transpose">
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
    </PluginControl>
  );
}

export default Chord;
