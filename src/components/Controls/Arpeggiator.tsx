import { useContext } from 'react';
import { initialise } from '../..';
import {
  ArpeggiatorRates,
  ArpeggiatorStyles,
} from '../../MidiEffects/Arpeggiator';
import { SynthParametersContext } from '../../pages';
import PluginControl from '../PluginControl';
import Button from '../Util/Button';
import Radial from '../Util/Radial';
import Select from '../Util/Select';
import Switch from '../Util/Switch';

interface IProps {
  controls: ReturnType<typeof initialise>;
}

function Arpeggiator({ controls }: IProps) {
  const { dawSettings, setDawSettings } = useContext(SynthParametersContext);
  return (
    <PluginControl pluginName="Arpeggiator">
      <div className="flex-grow">
        <div className="flex mb-4">
          <div className="flex-grow w-36">
            <Switch
              label="On/Off"
              value={dawSettings.arpeggiator.isOn}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  arpeggiator: { ...dawSettings.arpeggiator, isOn: value },
                })
              }
            />
          </div>
          <div className="flex-grow w-36">
            <Switch
              label="Latch"
              value={dawSettings.arpeggiator.isLatchOn}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  arpeggiator: {
                    ...dawSettings.arpeggiator,
                    isLatchOn: value,
                  },
                })
              }
            />
          </div>
          <div className="flex-grow w-36">
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
        </div>
        <div className="flex">
          <div className="flex-grow w-36">
            <Select<`${ArpeggiatorRates}`>
              label="Rate"
              options={{
                '1': '1/1',
                '2': '1/2',
                '3': '1/3',
                '4': '1/4',
                '6': '1/6',
                '8': '1/8',
                '12': '1/12',
                '16': '1/16',
                '18': '1/18',
                '24': '1/24',
                '32': '1/32',
              }}
              value={`${dawSettings.arpeggiator.noteDenominator}`}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  arpeggiator: {
                    ...dawSettings.arpeggiator,
                    noteDenominator: parseInt(value, 10) as
                      | 1
                      | 2
                      | 3
                      | 4
                      | 6
                      | 8
                      | 12
                      | 16
                      | 18
                      | 24
                      | 32,
                  },
                })
              }
            />
          </div>
          <div className="flex-grow w-36">
            <Radial
              label="Gate"
              value={dawSettings.arpeggiator.gate * 100}
              onChange={value =>
                setDawSettings({
                  ...dawSettings,
                  arpeggiator: {
                    ...dawSettings.arpeggiator,
                    gate: value / 100,
                  },
                })
              }
              min={0}
              max={100}
              suffix="%"
              decimalPlaces={0}
            />
          </div>
          <div className="flex-grow w-36">
            <Button onClick={() => controls.handleUnlatch()}>
              Clear latch
            </Button>
          </div>
        </div>
      </div>
    </PluginControl>
  );
}

export default Arpeggiator;
