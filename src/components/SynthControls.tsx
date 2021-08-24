import { useContext } from 'react';

import Select from '../components/Util/Select';
import Switch from '../components/Util/Switch';
import Radial from '../components/Util/Radial';
import Button from '../components/Util/Button';
import Input from '../components/Util/Input';
import PluginControl from '../components/PluginControl';
import type { IDawSettings, initialise } from '..';
import { SynthParametersContext } from '../pages';
import { ArpeggiatorStyles } from '../MidiEffects/Arpeggiator';

interface IProps {
  controls: ReturnType<typeof initialise>;
}

function SynthControls({ controls }: IProps) {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <>
      <PluginControl pluginName="Song">
        <div className="flex-grow min-w-min">
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
        <div className="flex-grow min-w-min">
          <Input
            label="Time Signature X/4"
            value={`${dawSettings.timeSignature}`}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                timeSignature: parseInt(value, 10),
              })
            }
          />
        </div>
      </PluginControl>
      <PluginControl pluginName="Oscillator">
        <Select<IDawSettings['type']>
          label="Waveform"
          options={{
            sawtooth: 'Saw',
            sine: 'Sine',
            square: 'Square',
            triangle: 'Triangle',
          }}
          value={dawSettings.type}
          onChange={value => setDawSettings({ ...dawSettings, type: value })}
        />
      </PluginControl>
      <PluginControl pluginName="Arpeggiator">
        <div className="flex-grow min-w-min">
          <Button onClick={() => controls.handleUnlatch()}>Clear latch</Button>
        </div>
        <div className="flex-grow min-w-min">
          <Select<ArpeggiatorStyles>
            label="Pattern"
            options={{
              up: 'Up',
              trigger: 'Trigger',
            }}
            value={dawSettings.arpeggiator.style}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                arpeggiator: { ...dawSettings.arpeggiator, style: value },
              })
            }
          />
        </div>
      </PluginControl>
      <PluginControl pluginName="Reverb">
        <div className="flex-grow min-w-min">
          <Switch
            label="On/Off"
            value={dawSettings.reverb.isOn}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                reverb: { ...dawSettings.reverb, isOn: value },
              })
            }
          />
        </div>
        <div className="flex-grow min-w-min">
          <Radial
            label="Decay"
            value={dawSettings.reverb.decay}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                reverb: { ...dawSettings.reverb, decay: value },
              })
            }
            min={0.1}
            max={15}
            suffix=""
            decimalPlaces={1}
          />
        </div>
        <div className="flex-grow min-w-min">
          <Radial
            label="Dry/Wet"
            value={dawSettings.reverb.dryWet * 100}
            onChange={value =>
              setDawSettings({
                ...dawSettings,
                reverb: { ...dawSettings.reverb, dryWet: value / 100 },
              })
            }
            min={0}
            max={100}
            suffix="%"
            decimalPlaces={0}
          />
        </div>
      </PluginControl>
    </>
  );
}

export default SynthControls;
