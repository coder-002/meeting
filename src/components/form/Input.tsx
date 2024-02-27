import {
  shorthands,
  makeStyles,
  Input as FluentInput,
  InputProps,
  Field,
} from "@fluentui/react-components";
import {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  FieldError,
} from "react-hook-form";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "500px",
  },
});

interface IInput<TFieldValues extends FieldValues = FieldValues>
  extends InputProps {
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  contentBefore?: any;
  contentAfter?: any;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  error?: string | FieldError;
  name: string;
  width?: string;
}
const Input = ({
  contentBefore,
  contentAfter,
  placeholder,
  disabled,
  rules,
  register,
  label,
  required,
  name,
  error,
  type,
  width,
  ...rest
}: IInput) => {
  const styles = useStyles();

  return (
    <Field
      required={required}
      label={label}
      validationState={error ? "error" : "none"}
    >
      <div className={styles.root}>
        <FluentInput
          type={type}
          contentBefore={contentBefore}
          contentAfter={contentAfter}
          disabled={disabled}
          placeholder={placeholder}
          width={width}
          {...register(name, rules)}
          {...rest}
        />
      </div>
    </Field>
  );
};

export default Input;
