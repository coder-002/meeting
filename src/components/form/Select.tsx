import {
  Field,
  Select as FluentSelect,
  SelectProps,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface ISelect<TFieldValues extends FieldValues = FieldValues>
  extends SelectProps {
  placeholder?: string;
  options: ISelectOption[];
  label?: string;
  name: string;
  error?: string;
  required?: boolean;
  register: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions;
}
interface ISelectOption {
  label: string;
  value: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "500px",
  },
});
const Select = ({
  placeholder,
  options,
  label,
  required,
  error,
  name,
  rules,
  register,
  ...rest
}: ISelect) => {
  const styles = useStyles();
  return (
    <Field
      required={required}
      label={label}
      validationState={error ? "error" : "none"}
    >
      <div className={styles.root}>
        <FluentSelect {...register(name, rules)} {...rest}>
          {placeholder && <option>{placeholder}</option>}
          {options.map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </FluentSelect>
      </div>
    </Field>
  );
};

export default Select;
