import {
  shorthands,
  makeStyles,
  Textarea as FluentTextArea,
  TextareaProps,
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
  extends TextareaProps {
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
const Textarea = ({
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
        <FluentTextArea
          disabled={disabled}
          placeholder={placeholder}
          {...register(name, rules)}
          {...rest}
        />
      </div>
    </Field>
  );
};

export default Textarea;
