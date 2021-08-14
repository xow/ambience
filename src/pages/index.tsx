import { useEffect, useState } from 'react';
import { initialise } from '..';
import Keyboard from '../components/Keyboard';
import { IHandleClickKey } from '../Controls/OnScreenKeyboard';

function HomePage() {
  const [handleClickKey, setHandleClickKey] = useState<IHandleClickKey>();
  useEffect(() => {
    const { handleClickKey: handleClickKeyValue } = initialise();
    setHandleClickKey(() => handleClickKeyValue);
  }, []);

  return <>{handleClickKey && <Keyboard handleClickKey={handleClickKey} />}</>;
}

export default HomePage;
