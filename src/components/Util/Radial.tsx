interface IProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  displayFunction: (value: number | string) => string;
  decimalPlaces: number;
}

const MOVEABLE_RANGE = 315;

function valueToDegrees(value: number, min: number, max: number): number {
  const percentage = (value - min) / (max - min);
  const degrees = percentage * MOVEABLE_RANGE;
  return degrees;
}

function Radial({
  label,
  value,
  onChange,
  min,
  max,
  displayFunction,
  decimalPlaces,
}: IProps) {
  const degrees = valueToDegrees(value, min, max);
  return (
    <label className="font-bold text-gray-700">
      {label}
      <div className="mt-1 relative">
        <div className="w-14 h-14 shadow-md rounded-full p-0 border-2 select-none">
          <div
            className="w-14 h-14 rounded-full p-0"
            style={{ transform: `rotate(${degrees - MOVEABLE_RANGE / 2}deg)` }}
          >
            <div className="h-5 w-0 border-l border-2 border-gray-400 m-auto"></div>
          </div>
        </div>
        <input
          value={value * 10 ** decimalPlaces}
          min={min * 10 ** decimalPlaces}
          max={max * 10 ** decimalPlaces}
          onChange={event =>
            onChange(parseInt(event.target.value, 10) * 0.1 ** decimalPlaces)
          }
          type="range"
          className="w-20 h-14 shadow-md rounded-full absolute top-0 -left-3 opacity-0"
        />
        <span>{displayFunction(value.toFixed(decimalPlaces))}</span>
      </div>
    </label>
  );
}

export default Radial;
