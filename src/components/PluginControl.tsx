interface IProps {
  pluginName: string;
  children: React.ReactNode;
}

function PluginControl({ children, pluginName }: IProps) {
  return (
    <fieldset className="mb-4 flex content-center items-center shadow-md p-4 border border-solid border-gray-300 flex-grow w-96">
      <legend className="font-bold text-gray-700">{pluginName}</legend>
      {children}
    </fieldset>
  );
}

export default PluginControl;
