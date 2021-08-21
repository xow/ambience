interface IProps<T> {
  options: Record<string, string>;
  label: string;
  value: T;
  onChange: (value: T) => void;
}

function Select<T extends string>({
  options,
  label,
  value,
  onChange,
}: IProps<T>) {
  return (
    <div>
      <label className="font-bold text-gray-700 ">{label}</label>
      <div>
        <select
          className="w-48 p-2 shadow-md border-2 rounded text-gray-800 "
          value={value}
          onChange={event => onChange(event.target.value as T)}
        >
          {Object.entries(options).map(([optionValue, optionText]) => (
            <option value={optionValue} key={optionValue}>
              {optionText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
