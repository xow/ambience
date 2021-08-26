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
            value={dawSettings.filter0.frequency ** 0.1}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter0: { ...dawSettings.filter0, frequency: value ** 10 },
              })
            }
            min={1.4051158265}
            max={2.7179550379}
            displayFunction={x => `${(x ** 10).toFixed(0)}hz`}
            decimalPlaces={10}
          />
        </div>
        <div className="flex-grow w-36">
          <Radial
            label="Q"
            value={dawSettings.filter0.qFactor ** (1 / 2)}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter0: { ...dawSettings.filter0, qFactor: value ** 2 },
              })
            }
            min={0.1 ** (1 / 2)}
            max={18 ** (1 / 2)}
            displayFunction={x => `${(x ** 2).toFixed(2)}`}
            decimalPlaces={10}
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
            value={dawSettings.filter1.frequency ** 0.1}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter1: { ...dawSettings.filter1, frequency: value ** 10 },
              })
            }
            min={1.4051158265}
            max={2.7179550379}
            displayFunction={x => `${(x ** 10).toFixed(0)}hz`}
            decimalPlaces={10}
          />
        </div>
        <div className="flex-grow w-36">
          <Radial
            label="Q"
            value={dawSettings.filter1.qFactor ** (1 / 2)}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                filter1: { ...dawSettings.filter1, qFactor: value ** 2 },
              })
            }
            min={0.1 ** (1 / 2)}
            max={18 ** (1 / 2)}
            displayFunction={x => `${(x ** 2).toFixed(2)}`}
            decimalPlaces={10}
          />
        </div>
      </PluginControl>
    </>
  );
}

export default Filter;
