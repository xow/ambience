interface IProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ label, value, onChange }: IProps) {
  return (
    <div>
      <label className="font-bold text-gray-700 mb-2">{label}</label>
      <div className="flex items-center justify-center ">
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
            className={`absolute left-0 top-0 h-full w-full rounded-full ${
              value ? 'bg-green-500' : 'bg-gray-500'
            } `}
          ></span>
          <span
            className={`h-6 w-6 border-2 absolute z-10 rounded-full bg-white transition-transform duration-300 ease-in-out flex justify-center items-center  ${
              value ? 'border-green-500 right-0' : 'border-gray-500'
            }`}
          ></span>
        </label>
      </div>
    </div>
  );
}

export default Switch;
