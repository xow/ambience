import { useState } from 'react';
import { IHandleClickKey } from '../Controls/OnScreenKeyboard';
import { frequencies } from '../Instruments/Oscillator';

interface IProps {
  handleClickKey: IHandleClickKey;
  note: keyof typeof frequencies;
}

function Key({ handleClickKey, note }: IProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <style jsx>{`
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
        .key.active {
          background: #0f3;
        }
        .key:nth-child(12n-10),
        .key:nth-child(12n-8),
        .key:nth-child(12n-5),
        .key:nth-child(12n-3),
        .key:nth-child(12n-1) {
          margin: -8px -38px;
          background-color: #000;
          vertical-align: top;
          height: 300px;
          width: 76px;
          border: none;
          position: relative;
        }
      `}</style>
      <div
        className={`key ${isActive && 'active'}`}
        onMouseDown={() => {
          setIsActive(true);
          handleClickKey?.({ note, octave: 4 });
        }}
        onMouseUp={() => {
          setIsActive(false);
        }}
      ></div>
    </>
  );
}

export default Key;
