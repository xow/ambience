import { useContext, useState } from 'react';
import { Patches, presets } from '../../DAW/Presets';
import { SynthParametersContext } from '../../pages';
import PluginControl from './PluginControl';
import Input from '../Util/Input';
import Select from '../Util/Select';

function General() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  const [shownMessage, setShownMessage] = useState(false);

  return (
    <>
      <PluginControl pluginName="General" defaultToOpen={true}>
        <div className="flex-col space-y-4">
          <div className="flex-grow w-36">
            <Select<Patches>
              label="Patch"
              options={{
                init: presets.init.name,
                dronePad: presets.dronePad.name,
              }}
              value={dawSettings.id}
              onChange={value => {
                setDawSettings(presets[value]);
                setShownMessage(true);
              }}
            />
          </div>
          {!shownMessage && (
            <div className="flex-grow text-sm bg-green-100 rounded-md p-2 w-full">
              👆 Don't need a drone? Select a normal patch up here
            </div>
          )}
        </div>
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
