import {
  RadioProps,
  RadioGroup,
  Radio as FluentRadio,
  Field,
} from "@fluentui/react-components";
import { RegisterOptions, UseFormRegister, FieldValues } from "react-hook-form";

interface IRadio<TFieldValues extends FieldValues = FieldValues>
  extends RadioProps {
  options: IRadioOption[];
  label?: string;
  error?: string;
  name: string;
  register: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions;
  disabled?: boolean;
  required?: boolean;
  layout?: "horizontal" | "vertical";
}
interface IRadioOption {
  label: string;
  value: string;
}
const Radio = ({
  label,
  name,
  options,
  disabled,
  required,
  layout,
  error,
  rules,
  register,
  ...rest
}: IRadio) => {
  return (
    <Field
      required={required}
      label={label}
      validationState={error ? "error" : "none"}
    >
      <RadioGroup disabled={disabled} layout={layout}>
        {options.map(({ label, value }) => (
          <FluentRadio
            label={label}
            value={value}
            {...register(name, rules)}
            {...rest}
          />
        ))}
      </RadioGroup>
    </Field>
  );
};

export default Radio;
