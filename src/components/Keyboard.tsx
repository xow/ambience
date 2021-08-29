import type { IHandleClickKey } from '../Controls/OnScreenKeyboard';
import { frequencies } from '../Instruments/Synth';
import Key from './Key';

interface IProps {
  handleClickKey: IHandleClickKey;
}
function Keyboard({ handleClickKey }: IProps) {
  return (
    <>
      <style jsx>{`
        .keyboard {
          height: 512px;
        }
      `}</style>
      <div className="keyboard m-auto shadow-2xl w-max min-w-min">
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
