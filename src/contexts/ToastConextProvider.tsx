import {
  Link,
  Spinner,
  Toast,
  ToastBody,
  ToastTitle,
  ToastTrigger,
  Toaster,
  useId,
  useToastController,
} from "@fluentui/react-components";
import { AlertOnRegular } from "@fluentui/react-icons";
import { createContext, useContext } from "react";

type ToastContextProps = {
  notifySuccess: (message?: string, title?: string) => void;
  notifyWarning: (message: string, title?: string) => void;
  notifyError: (message?: string, title?: string) => void;
  notifyLoading: (message?: string, title?: string) => void;
  showNotification: (message: string, title?: string) => void;
};

const ToastContext = createContext<ToastContextProps>({
  notifyError: () => console.log("Function not implemented"),
  notifySuccess: () => console.log("Function not implemented"),
  notifyWarning: () => console.log("Function not implemented"),
  notifyLoading: () => console.log("Function not implemented"),
  showNotification: () => console.log("Function not implemented")
});

const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const toasterId = useId("toaster");
  const { dispatchToast, dismissAllToasts, updateToast } =
    useToastController(toasterId);

  const notify = (
    message: string,
    type: "success" | "error" | "warning" | "loading",
    title?: string
  ) => {
    if (type == "loading") {
      dispatchToast(
        <Toast appearance="inverted">
          <ToastTitle media={<Spinner size="tiny" />}>
            {title || "Processing your request"}
          </ToastTitle>
          <ToastBody subtitle="Subtitle">{message}</ToastBody>
        </Toast>,
        { position: "top", timeout: 900000 }
      );
    } else {
      if (!title) {
        switch (type) {
          case "error":
            title = "Task failed.";
            break;
          case "success":
            title = "Task completed.";
            break;
        }
      }

      dismissAllToasts(); //first remove existing toasts
      dispatchToast(
        <Toast appearance="inverted">
          <ToastTitle
            action={
              <ToastTrigger>
                <Link>Dismiss</Link>
              </ToastTrigger>
            }
          >
            {title}
          </ToastTitle>
          <ToastBody>{message}</ToastBody>
        </Toast>,
        { intent: type, position: "top", timeout: 3000 }
      );
    }
  };

  const notifySuccess = (message?: string, title?: string) => {
    notify(message || "Task completed successfully", "success", title);
  };

  const notifyError = (message?: string, title?: string) => {
    notify(message || "Could not complete your request", "error", title);
  };

  const notifyWarning = (message: string, title?: string) => {
    notify(message, "warning", title);
  };

  const notifyLoading = (message?: string, title?: string) => {
    notify(message || "Please wait...", "loading", title);
  };

  const showNotification = (message: string, title?: string) => {
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle media={<AlertOnRegular />}>
          {title || "New Notification"}
        </ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      { position: "bottom-end", timeout: 6000 }
    );
}

  return (
    <ToastContext.Provider
      value={{ notifyError, notifyLoading, notifySuccess, notifyWarning, showNotification }}
    >
      <Toaster toasterId={toasterId} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
export default ToastContextProvider;
