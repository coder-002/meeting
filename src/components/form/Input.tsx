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
  Path,
} from "react-hook-form";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "500px",
  },
});

const Input = <T extends FieldValues>({
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
}: IInput<T>) => {
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
interface IInput<TFieldValues extends FieldValues> extends InputProps {
  register: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions;
  contentBefore?: any;
  contentAfter?: any;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  error?: string | FieldError;
  name: Path<TFieldValues>;
  width?: string;
}

export default Input;
