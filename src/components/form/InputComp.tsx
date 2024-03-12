import {
  shorthands,
  makeStyles,
  Input as FluentInput,
  InputProps,
  Field,
} from "@fluentui/react-components";
import { forwardRef, ForwardedRef, RefObject } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type FluentInputProps<T extends FieldValues> = {
  required?: boolean;
  label?: string;
  disabled?: boolean;
  contentBefore?: React.ReactNode;
  contentAfter?: React.ReactNode;
  name: Path<T>;
  control: Control<T, unknown>;
  onIconClick?: () => void;
} & InputProps;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "500px",
  },
});

const Input = <T extends FieldValues>(
  {
    required,
    label,
    disabled,
    contentBefore,
    contentAfter,
    onIconClick,
    placeholder,
    name,
    control,
    type,
    ...rest
  }: FluentInputProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  const styles = useStyles();

  return (
    <Field
      required={required}
      label={label}
      validationState={error ? "error" : "none"}
    >
      <div className={styles.root}>
        <FluentInput
          {...rest}
          {...field}
          ref={ref}
          type={type}
          contentAfter={contentAfter}
          contentBefore={contentBefore}
        />
      </div>
    </Field>
  );
};

// there isn't any way to properly type generic components
// in forwardRef without type assertion
export default forwardRef(Input) as <T extends FieldValues>(
  props: FluentInputProps<T> & { ref?: RefObject<HTMLInputElement> }
) => JSX.Element;
