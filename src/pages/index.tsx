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
      {handleClickKey && <Keyboard handleClickKey={handleClickKey} />}
    </>
  );
}

export default HomePage;
