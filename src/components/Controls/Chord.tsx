import { useContext } from 'react';
import { SynthParametersContext } from '../../pages';
import PluginControl from './PluginControl';
import Switch from '../Util/Switch';

function Chord() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <PluginControl pluginName="Chord">
      <Switch
        label="On/Off"
        value={dawSettings.chord.isOn}
        onChange={value =>
          setDawSettings({
            ...dawSettings,
            chord: { ...dawSettings.chord, isOn: value },
          })
        }
      />
    </PluginControl>
  );
}

export default Chord;
