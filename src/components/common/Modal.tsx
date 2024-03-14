import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  DialogTriggerChildProps,
  makeStyles,
} from "@fluentui/react-components";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  btnText: string;
  title: string;
  submitButtonText?: string;
  resetButtonText?: string;
  submitHandler?: () => void;
  handleSubmit?: () => void;
  closeDialog?: () => void;
}

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
});

const CustomDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  { btnText: string } & DialogTriggerChildProps
>(({ btnText, ...props }, ref) => {
  return (
    <Button {...props} ref={ref}>
      {btnText}
    </Button>
  );
});
const Modal = ({
  children,
  btnText,
  title,
  submitHandler,
  handleSubmit,
  submitButtonText,
  resetButtonText,
  closeDialog,
}: Props) => {
  const styles = useStyles();

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <CustomDialogTrigger btnText={btnText} />
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler?.();
          }}
        >
          <DialogBody>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className={styles.content}>{children}</DialogContent>
          </DialogBody>
          <DialogActions className="mt-2">
            {submitButtonText && (
              <Button type="submit" appearance="primary" onClick={handleSubmit}>
                {submitButtonText}
              </Button>
            )}
            {resetButtonText && (
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" onClick={closeDialog}>
                  {resetButtonText}
                </Button>
              </DialogTrigger>
            )}
          </DialogActions>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default Modal;
