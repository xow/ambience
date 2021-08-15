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
          margin: auto;
          height: 512px;
          width: fit-content;
        }
      `}</style>
      <div className="keyboard shadow-2xl w-max m-auto">
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
