import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { initialise, IDawSettings } from '..';
import { defaultPreset } from '../DAW/Presets';
import Keyboard from '../components/Keyboard';
import SynthControls from '../components/SynthControls';

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
    if (controls) controls.destruct();
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
              <div>
                <SynthControls controls={controls} />
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
