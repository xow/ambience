import { useState } from 'react';

interface IProps {
  pluginName: string;
  children: React.ReactNode;
  defaultToOpen?: boolean;
}

function PluginControl({ children, pluginName, defaultToOpen }: IProps) {
  const [isOpen, setIsOpen] = useState(!!defaultToOpen);
  return (
    <fieldset className="m-4 max-w-lg flex-grow flex content-center items-start shadow-md p-4 border border-solid border-gray-300 rounded">
      <legend
        className="font-bold text-gray-700 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {pluginName}
      </legend>
      {isOpen && children}
    </fieldset>
  );
}

export default PluginControl;
