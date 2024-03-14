import {
  Body2,
  Divider,
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
  ToolbarButton,
} from "@fluentui/react-components";
import { Alert24Regular } from "@fluentui/react-icons";
import { useState } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { useAlert } from "../contexts/AlertContext";

export const NotificationComp = () => {
  const [open, setOpen] = useState<boolean>();
  const { notifications } = useAlert();


  const handleOpenChange: PopoverProps["onOpenChange"] = (_, data) =>
    setOpen(data.open || false);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <ToolbarButton icon={<Alert24Regular />}></ToolbarButton>
      </PopoverTrigger>

      <PopoverSurface style={{ maxWidth: "600px", width: "20%" }}>
        {notifications ? (
          <div>
            <Body2> Notifications</Body2>
            <Divider />
          </div>
        ) : (
          ""
        )}

        {notifications
          ? notifications.map((item) => {
            const date = new Date(item.createdOn);
            return (
              <div
                className={`bg-gray-100 p-2 flex justify-between mt-2 border-r-41 ${item.isSeen ? "bg-gray-100" : "bg-blue-50"
                  } `}
                key={item.id}
              >
                <div>{item.message}</div>
                <div>{timeAgo(date)}</div>
              </div>
            );
          })
          : "No notification"}
      </PopoverSurface>
    </Popover>
  );
};
