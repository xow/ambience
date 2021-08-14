import { useEffect, useState } from 'react';
import Head from 'next/head';

import { initialise } from '..';
import Keyboard from '../components/Keyboard';
import { IHandleClickKey } from '../Controls/OnScreenKeyboard';

function HomePage() {
  const [handleClickKey, setHandleClickKey] = useState<IHandleClickKey>();
  useEffect(() => {
    const { handleClickKey: handleClickKeyValue } = initialise();
    setHandleClickKey(() => handleClickKeyValue);
  }, []);

  return (
    <>
      <Head>
        <title>Online Synthesizer</title>
      </Head>
      <div className="m-auto max-w-screen-lg">
        <h1 className="text-4xl text-center mb-4">Online Synthesizer</h1>
        {handleClickKey && <Keyboard handleClickKey={handleClickKey} />}
      </div>
    </>
  );
}

export default HomePage;
