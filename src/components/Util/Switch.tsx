interface IProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ label, value, onChange }: IProps) {
  return (
    <div>
      <label className="font-semibold text-gray-600 mb-2">{label}</label>
      <div className="flex mt-2">
        <label className="relative w-12 h-6 flex select-none cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            onChange={event => {
              onChange(event.currentTarget.value !== 'on');
            }}
            value={value ? 'on' : 'off'}
          />
          <span
            className={`shadow-md absolute left-0 top-0 h-full w-full rounded-full transition-right duration-300 ease-in-out ${
              value ? 'bg-green-500' : 'bg-gray-500'
            } `}
          ></span>
          <span
            className={`shadow-md h-6 w-6 border-2 absolute z-10 rounded-full bg-white transition-right duration-300 ease-in-out flex justify-center items-center  ${
              value ? 'border-green-500 left-6' : 'border-gray-500 left-0'
            }`}
          ></span>
        </label>
      </div>
    </div>
  );
}

export default Switch;
