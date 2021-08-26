import { useContext } from 'react';
import { SynthParametersContext } from '../../pages';
import PluginControl from './PluginControl';
import Switch from '../Util/Switch';
import Select from '../Util/Select';
import Radial from '../Util/Radial';

function Filter() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <>
      <PluginControl pluginName="Filter 1">
        <div className="flex-grow w-36">
          <Switch
            label="On/Off"
            value={dawSettings.filter0.isOn}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter0: { ...dawSettings.filter0, isOn: value },
              })
            }
          />
        </div>
        <div className="flex-grow w-36">
          <Select<BiquadFilterType>
            label="Waveform"
            options={{
              allpass: 'All pass',
              bandpass: 'Band pass',
              highpass: 'High pass',
              highshelf: 'High shelf',
              lowpass: 'Low pass',
              lowshelf: 'Low shelf',
              notch: 'Notch',
              peaking: 'Peaking',
            }}
            value={dawSettings.filter0.type}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter0: {
                  ...dawSettings.filter0,
                  type: value,
                },
              })
            }
          />
        </div>
        <div className="flex-grow w-36">
          <Radial
            label="Frequency"
            value={dawSettings.filter0.frequency}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter0: { ...dawSettings.filter0, frequency: value },
              })
            }
            min={10}
            max={22000}
            displayFunction={x => `${x}`}
            decimalPlaces={1}
          />
        </div>
      </PluginControl>
      <PluginControl pluginName="Filter 2">
        <div className="flex-grow w-36">
          <Switch
            label="On/Off"
            value={dawSettings.filter1.isOn}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter1: { ...dawSettings.filter1, isOn: value },
              })
            }
          />
        </div>
        <div className="flex-grow w-36">
          <Select<BiquadFilterType>
            label="Waveform"
            options={{
              allpass: 'All pass',
              bandpass: 'Band pass',
              highpass: 'High pass',
              highshelf: 'High shelf',
              lowpass: 'Low pass',
              lowshelf: 'Low shelf',
              notch: 'Notch',
              peaking: 'Peaking',
            }}
            value={dawSettings.filter1.type}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter1: {
                  ...dawSettings.filter1,
                  type: value,
                },
              })
            }
          />
        </div>
        <div className="flex-grow w-36">
          <Radial
            label="Frequency"
            value={dawSettings.filter1.frequency}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter1: { ...dawSettings.filter1, frequency: value },
              })
            }
            min={30}
            max={20000}
            displayFunction={x => `${x}`}
            decimalPlaces={1}
          />
        </div>
      </PluginControl>
    </>
  );
}

export default Filter;
