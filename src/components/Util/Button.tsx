import { ReactChildren } from 'react';

interface IProps {
  children: ReactChildren | string;
  onClick: () => void;
}

function Button({ children, onClick }: IProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

export default Button;
