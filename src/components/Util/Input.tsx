interface IProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function Input({ label, value, onChange }: IProps) {
  return (
    <div>
      <label className="font-bold text-gray-700">{label}</label>
      <div className="mt-1">
        <input
          className="w-32 h-10 p-2 shadow-md border-2 rounded text-gray-800 "
          value={value}
          onChange={event => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;
