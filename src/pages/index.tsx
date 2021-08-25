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
        <title>{dawSettings.name}</title>
      </Head>
      {controls && (
        <SynthParametersContext.Provider
          value={{ dawSettings, setDawSettings }}
        >
          <div className="m-auto">
            <div className="shadow-md border-t-8 border-blue-500 p-2 mb-8">
              <h1 className="text-2xl text-center font-bold text-gray-600">
                {dawSettings.name}
              </h1>
              <h2 className="text-center text-gray-500">
                {dawSettings.description}
              </h2>
            </div>
            <Keyboard handleClickKey={controls.handleClickKey} />
            <div>
              <SynthControls controls={controls} />
            </div>
          </div>
        </SynthParametersContext.Provider>
      )}
    </>
  );
}

export default HomePage;
