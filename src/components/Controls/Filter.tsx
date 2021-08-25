import { useContext } from 'react';
import { SynthParametersContext } from '../../pages';
import PluginControl from '../PluginControl';
import Switch from '../Util/Switch';

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
      </PluginControl>
    </>
  );
}

export default Filter;
