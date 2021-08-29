import { useContext } from 'react';
import { IDawSettings } from '../..';
import { SynthParametersContext } from '../../pages';
import PluginControl from './PluginControl';
import Select from '../Util/Select';
import Radial from '../Util/Radial';

function Synth() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <PluginControl pluginName="Oscillator" defaultToOpen={true}>
      <div className="flex-grow">
        <div className="flex mb-4">
          <div className="flex-grow w-36">
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
          </div>
          <div className="flex-grow w-36">
            <Radial
              label="Unison"
              value={dawSettings.synth.unison}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  synth: { ...dawSettings.synth, unison: value },
                })
              }
              min={1}
              max={16}
              displayFunction={x => `${x.toFixed(0)}`}
              decimalPlaces={0}
            />
          </div>
          <div className="flex-grow w-36">
            <Radial
              label="Spread"
              value={dawSettings.synth.spread}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  synth: { ...dawSettings.synth, spread: value },
                })
              }
              min={0}
              max={0.1}
              displayFunction={x => `${x.toFixed(3)}`}
              decimalPlaces={10}
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex-grow w-36">
            <Radial
              label="Attack"
              value={dawSettings.synth.attack ** (1 / 3)}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  synth: { ...dawSettings.synth, attack: value ** 3 },
                })
              }
              min={0}
              max={5 ** (1 / 3)}
              displayFunction={x => `${(x ** 3).toFixed(2)}s`}
              decimalPlaces={10}
            />
          </div>
          <div className="flex-grow w-36">
            <Radial
              label="Delay"
              value={dawSettings.synth.delay ** (1 / 3)}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  synth: { ...dawSettings.synth, delay: value ** 3 },
                })
              }
              min={0.01 ** (1 / 3)}
              max={5 ** (1 / 3)}
              displayFunction={x => `${(x ** 3).toFixed(2)}s`}
              decimalPlaces={10}
            />
          </div>
          <div className="flex-grow w-36">
            <Radial
              label="Sustain"
              value={dawSettings.synth.sustain}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  synth: { ...dawSettings.synth, sustain: value },
                })
              }
              min={0}
              max={1}
              displayFunction={x => `${(x * 100).toFixed(1)}%`}
              decimalPlaces={5}
            />
          </div>
          <div className="flex-grow w-36">
            <Radial
              label="Release"
              value={dawSettings.synth.release ** (1 / 3)}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  synth: { ...dawSettings.synth, release: value ** 3 },
                })
              }
              min={0}
              max={5 ** (1 / 3)}
              displayFunction={x => `${(x ** 3).toFixed(2)}s`}
              decimalPlaces={10}
            />
          </div>
        </div>
      </div>
    </PluginControl>
  );
}

export default Synth;
