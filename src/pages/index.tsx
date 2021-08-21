import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { initialise, IDawSettings } from '..';
import Keyboard from '../components/Keyboard';
import Select from '../components/Util/Select';
import Button from '../components/Util/Button';
import Input from '../components/Util/Input';
import { defaultPreset } from '../DAW/Presets';

export const SynthParametersContext = React.createContext<{
  dawSettings: IDawSettings;
  setDawSettings: (value: IDawSettings) => void;
}>({
  dawSettings: defaultPreset,
  setDawSettings: () => {},
});

function HomePage() {
  const [dawSettings, setDawSettings] = useState<IDawSettings>(defaultPreset);
  const [controls, setControls] = useState<ReturnType<typeof initialise>>();

  useEffect(() => {
    const controlValue = initialise(dawSettings);

    // The initialise returns a function for handling click events, let's set it in state so we can call it when someone clicks.
    setControls(controlValue);
  }, [dawSettings]);

  return (
    <>
      <Head>
        <title>Online Ambience Generator</title>
      </Head>
      {controls && (
        <SynthParametersContext.Provider
          value={{ dawSettings, setDawSettings }}
        >
          <div className="m-auto max-w-screen-lg">
            <div className="m-auto max-w-screen-sm">
              <h1 className="text-4xl text-center mb-2">
                Online Ambience Generator
              </h1>
              <h2 className="text-xl text-center mb-4">
                Click a key to generate a drone in that key.
              </h2>
              <div className="mb-4 flex content-center items-center">
                <div className="flex-grow">
                  <Select<IDawSettings['type']>
                    label="Oscillator Waveform"
                    options={{
                      sawtooth: 'Saw',
                      sine: 'Sine',
                      square: 'Square',
                      triangle: 'Triangle',
                    }}
                    value={dawSettings.type}
                    onChange={value =>
                      setDawSettings({ ...dawSettings, type: value })
                    }
                  />
                </div>
                <div className="flex-grow">
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
                <div className="flex-grow">
                  <Button onClick={() => controls.handleUnlatch()}>
                    Clear latch
                  </Button>
                </div>
              </div>
            </div>
            <Keyboard handleClickKey={controls.handleClickKey} />
          </div>
        </SynthParametersContext.Provider>
      )}
    </>
  );
}

export default HomePage;
