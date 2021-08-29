import { useState } from 'react';
import { IHandleClickKey } from '../Controls/OnScreenKeyboard';
import { frequencies } from '../Instruments/Synth';

interface IProps {
  handleClickKey: IHandleClickKey;
  note: keyof typeof frequencies;
}

function Key({ handleClickKey, note }: IProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [handleReleaseKey, setHandleReleaseKey] =
    useState<ReturnType<IHandleClickKey>['handleReleaseKey']>();

  const handlePress = () => {
    setIsActive(true);
    const { handleReleaseKey: handleReleaseKeyValue } = handleClickKey?.({
      note,
      octave: 4,
    });

    setHandleReleaseKey(() => handleReleaseKeyValue);
  };
  const handleRelease = () => {
    setIsActive(false);
    handleReleaseKey?.();
  };

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
          margin: 0px -8px;
        }
        .key:nth-child(12n-10),
        .key:nth-child(12n-8),
        .key:nth-child(12n-5),
        .key:nth-child(12n-3),
        .key:nth-child(12n-1) {
          margin: 0px -38px;
          background-color: #000;
          vertical-align: top;
          height: 300px;
          width: 76px;
          position: relative;
        }
        .key.active,
        .key:nth-child(12n-10).active,
        .key:nth-child(12n-8).active,
        .key:nth-child(12n-5).active,
        .key:nth-child(12n-3).active,
        .key:nth-child(12n-1).active {
          background: rgb(16, 185, 129);
        }
      `}</style>
      <div
        className={`key ${isActive && 'active'}`}
        onMouseDown={handlePress}
        onTouchStart={handlePress}
        onMouseUp={handleRelease}
        onMouseOut={handleRelease}
        onTouchEnd={handleRelease}
      ></div>
    </>
  );
}

export default Key;
