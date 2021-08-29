import { useContext } from 'react';
import { Patches, presets } from '../../DAW/Presets';
import { SynthParametersContext } from '../../pages';
import PluginControl from './PluginControl';
import Input from '../Util/Input';
import Select from '../Util/Select';

function General() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <>
      <PluginControl pluginName="General" defaultToOpen={true}>
        <Select<Patches>
          label="Patch"
          options={{
            init: presets.init.name,
            dronePad: presets.dronePad.name,
          }}
          value={dawSettings.id}
          onChange={value => setDawSettings(presets[value])}
        />
      </PluginControl>
      <PluginControl pluginName="Song">
        <div className="flex-col space-y-4">
          <div className="flex-grow w-36">
            <Input
              label="BPM"
              value={`${dawSettings.bpm}`}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  bpm: parseInt(value, 10),
                })
              }
            />
          </div>
          <div className="flex-grow w-36">
            <Input
              label="Time&nbsp;Signature&nbsp;X/4"
              value={`${dawSettings.timeSignature}`}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  timeSignature: parseInt(value, 10),
                })
              }
            />
          </div>
        </div>
      </PluginControl>
    </>
  );
}

export default General;
