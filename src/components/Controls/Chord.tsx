import { useContext } from 'react';
import { SynthParametersContext } from '../../pages';
import PluginControl from './PluginControl';
import Switch from '../Util/Switch';
import NoteSelector from '../Util/NotesSelector';

function Chord() {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <PluginControl pluginName="Chord">
      <div className="flex-grow w-36">
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
      </div>
      <div className="flex-grow w-32">
        <NoteSelector
          label="Notes"
          notes={dawSettings.chord.noteOffsets}
          onChange={value =>
            setDawSettings({
              ...dawSettings,
              chord: { ...dawSettings.chord, noteOffsets: value },
            })
          }
        />
      </div>
    </PluginControl>
  );
}

export default Chord;
