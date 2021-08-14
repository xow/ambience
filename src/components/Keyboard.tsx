import type { IHandleClickKey } from '../Controls/OnScreenKeyboard';
import { frequencies } from '../Instruments/Oscillator';
import Key from './Key';

interface IProps {
  handleClickKey: IHandleClickKey;
}
function Keyboard({ handleClickKey }: IProps) {
  return (
    <>
      <style jsx>{`
        .keyboard {
          margin: auto;
          height: 512px;
          width: fit-content;
        }
      `}</style>
      <div className="keyboard">
        {(Object.keys(frequencies) as Array<keyof typeof frequencies>).map(
          note => (
            <Key key={note} note={note} handleClickKey={handleClickKey} />
          ),
        )}
      </div>
    </>
  );
}

export default Keyboard;
