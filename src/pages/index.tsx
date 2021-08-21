import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { initialise, ISynthParameters } from '..';
import Keyboard from '../components/Keyboard';
import Select from '../components/Util/Select';
import Button from '../components/Util/Button';

export const SynthParametersContext = React.createContext<{
  params: ISynthParameters;
  setParams: (value: ISynthParameters) => void;
}>({
  params: {
    type: 'sawtooth',
  },
  setParams: () => {},
});

function HomePage() {
  const [params, setParams] = useState<ISynthParameters>({
    type: 'sawtooth',
  });
  const [controls, setControls] = useState<ReturnType<typeof initialise>>();

  useEffect(() => {
    const controlValue = initialise(params);

    // The initialise returns a function for handling click events, let's set it in state so we can call it when someone clicks.
    setControls(controlValue);
  }, [params]);

  return (
    <>
      <Head>
        <title>Online Ambience Generator</title>
      </Head>
      {controls && (
        <SynthParametersContext.Provider value={{ params, setParams }}>
          <div className="m-auto max-w-screen-lg">
            <div className="m-auto max-w-screen-sm">
              <h1 className="text-4xl text-center mb-2">
                Online Ambience Generator
              </h1>
              <h2 className="text-xl text-center mb-4">
                Click a key to generate a drone in that key.
              </h2>
              <div className="mb-4">
                <Select<ISynthParameters['type']>
                  label="Oscillator Waveform"
                  options={{
                    sawtooth: 'Saw',
                    sine: 'Sine',
                    square: 'Square',
                    triangle: 'Triangle',
                  }}
                  value={params.type}
                  onChange={value => setParams({ ...params, type: value })}
                />
                <Button onClick={() => controls.handleUnlatch()}>
                  Clear latch
                </Button>
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
