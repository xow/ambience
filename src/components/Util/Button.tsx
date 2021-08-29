interface IProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: IProps) {
  return (
    <button
      className="w-32 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow-md"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

export default Button;
