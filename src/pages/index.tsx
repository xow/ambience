import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { initialise, ISynthParameters } from '..';
import Keyboard from '../components/Keyboard';
import { IHandleClickKey } from '../Controls/OnScreenKeyboard';
import Select from '../components/Util/Select';

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
    type: 'triangle',
  });
  const [handleClickKey, setHandleClickKey] = useState<IHandleClickKey>();
  useEffect(() => {
    const { handleClickKey: handleClickKeyValue } = initialise(params);
    // The initialise returns a function for handling click events, let's set it in state so we can call it when someone clicks.
    setHandleClickKey(() => handleClickKeyValue);
  }, []);

  return (
    <>
      <Head>
        <title>Online Synthesizer</title>
      </Head>
      <SynthParametersContext.Provider value={{ params, setParams }}>
        <div className="m-auto max-w-screen-lg">
          <h1 className="text-4xl text-center mb-4">Online Synthesizer</h1>
          <Select<ISynthParameters['type']>
            label="Oscillator Waveform"
            options={{
              custom: 'Custom',
              sawtooth: 'Saw',
              sine: 'Sine',
              square: 'Square',
              triangle: 'Triangle',
            }}
            value={params.type}
            onChange={value => setParams({ ...params, type: value })}
          />
          {handleClickKey && <Keyboard handleClickKey={handleClickKey} />}
        </div>
      </SynthParametersContext.Provider>
    </>
  );
}

export default HomePage;
