interface IProps {
  pluginName: string;
  children: React.ReactNode;
}

function PluginControl({ children, pluginName }: IProps) {
  return (
    <fieldset className="m-4 max-w-lg flex-grow flex content-center items-center shadow-md p-4 border border-solid border-gray-300 flex-grow">
      <legend className="font-bold text-gray-700">{pluginName}</legend>
      {children}
    </fieldset>
  );
}

export default PluginControl;
