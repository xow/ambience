import { useContext } from 'react';
import { IDawSettings } from '../..';
import { SynthParametersContext } from '../../pages';
import PluginControl from './PluginControl';
import Select from '../Util/Select';

function Synth() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <PluginControl pluginName="Oscillator">
      <Select<IDawSettings['synth']['type']>
        label="Waveform"
        options={{
          sawtooth: 'Saw',
          sine: 'Sine',
          square: 'Square',
          triangle: 'Triangle',
        }}
        value={dawSettings.synth.type}
        onChange={value =>
          setDawSettings({
            ...dawSettings,
            synth: { ...dawSettings.synth, type: value },
          })
        }
      />
    </PluginControl>
  );
}

export default Synth;
