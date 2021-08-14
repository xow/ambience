import { useEffect, useState } from 'react';
import { frequencies } from '../Instruments/Oscillator';
import { initialise } from '..';
import { IOnClickKey } from '../Controls/OnScreenKeyboard';

function HomePage() {
  const [onClickKey, setOnClickKey] = useState<IOnClickKey>();
  useEffect(() => {
    const { onClickKey: onClickKeyValue } = initialise();
    setOnClickKey(() => onClickKeyValue);
  }, []);

  return (
    <>
      <style jsx>{`
        .keyboard {
          margin: auto;
          height: 512px;
          width: fit-content;
        }
        .key {
          box-sizing: border-box;
          display: inline-block;
          background-color: #fff;
          height: 512px;
          width: 128px;
          border: 8px solid black;
          border-bottom-right-radius: 16px;
          border-bottom-left-radius: 16px;
          margin: -8px;
        }
        div:nth-child(12n-10),
        div:nth-child(12n-8),
        div:nth-child(12n-5),
        div:nth-child(12n-3),
        div:nth-child(12n-1) {
          margin: -8px -38px;
          background-color: #000;
          vertical-align: top;
          height: 300px;
          width: 76px;
          border: none;
          position: relative;
        }
      `}</style>
      <div className="keyboard">
        {(Object.keys(frequencies) as Array<keyof typeof frequencies>).map(
          key => (
            <div
              key={key}
              className="key"
              onClick={() => onClickKey?.({ note: key, octave: 4 })}
            ></div>
          ),
        )}
      </div>
    </>
  );
}

export default HomePage;
