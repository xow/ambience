import { useState } from 'react';

interface IProps {
  pluginName: string;
  children: React.ReactNode;
  defaultToOpen?: boolean;
}

function PluginControl({ children, pluginName, defaultToOpen }: IProps) {
  const [isOpen, setIsOpen] = useState(defaultToOpen !== false);
  return (
    <fieldset className="bg-white m-4 shadow-md p-4 rounded-lg">
      <div
        className="text-gray-400 cursor-pointer w-full text-xs uppercase mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {pluginName}
      </div>
      <div className="flex content-center items-start">
        {isOpen && children}
      </div>
    </fieldset>
  );
}

export default PluginControl;
