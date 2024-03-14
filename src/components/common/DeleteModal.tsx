import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Checkbox,
  CheckboxOnChangeData,
} from "@fluentui/react-components";
import { Delete16Filled } from "@fluentui/react-icons";
import { useState } from "react";

interface DeleteModal {
  handleClick?: () => void;
  title: string;
  message: string;
  consent: string;
}

export const DeleteModal = ({
  handleClick,
  title,
  message,
  consent,
}: DeleteModal) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: CheckboxOnChangeData
  ) => {
    setChecked(Boolean(data.checked));
  };
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary" icon={<Delete16Filled />}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <p>{message}</p>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              label={consent}
            />
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                disabled={!checked}
                appearance="primary"
                onClick={handleClick}
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => setChecked(false)}>
                Cancel
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
