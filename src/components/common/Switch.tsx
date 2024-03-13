import { Switch as FluentSwitch } from "@fluentui/react-components";
interface ISwitch {
  value: boolean;
  toggleSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

const Switch = ({ value, toggleSwitch, disabled }: ISwitch) => {
  return (
    <FluentSwitch disabled={disabled} checked={value} onChange={toggleSwitch} />
  );
};

export default Switch;
