import type { IHandleClickKey } from '../Controls/OnScreenKeyboard';
import { frequencies } from '../Instruments/Synth';
import Key from './Key';

interface IProps {
  handleClickKey: IHandleClickKey;
}
function Keyboard({ handleClickKey }: IProps) {
  return (
    <div className="m-auto shadow-2xl w-max">
      {(Object.keys(frequencies) as Array<keyof typeof frequencies>).map(
        note => (
          <Key key={note} note={note} handleClickKey={handleClickKey} />
        ),
      )}
    </div>
  );
}

export default Keyboard;
