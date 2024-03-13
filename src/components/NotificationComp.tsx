import {
  Body2,
  Button,
  Divider,
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
  Title3,
  ToolbarButton,
} from "@fluentui/react-components";
import { Alert24Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  HubConnectionState,
  HubConnection,
} from "@microsoft/signalr";
import { baseUrl, get } from "../services/apiService";
import { useToast } from "../contexts/ToastConextProvider";
import { timeAgo } from "../helpers/timeAgo";

interface alertItem {
  id: number;
  alertType: string;
  message: string;
  url?: string;
  createdOn: Date;
  isSeen: boolean;
}

export const NotificationComp = () => {
  const [open, setOpen] = useState<boolean>();
  const [items, setItems] = useState<alertItem[]>([]);

  const [_, setHubConnection] = useState<HubConnection>();

  useEffect(() => {
    getNotifications();

    setUpSignalRConnection().then((con) => {
      //Do something with connection
    });
  }, []);

  const getNotifications = async () => {
    const res = await get<alertItem[]>("/alert");
    if (res) setItems(res.data);
  };

  var { showNotification } = useToast();

  const setUpSignalRConnection = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/alert-hub?uid=1&cli=uwfpcb`)
      .withAutomaticReconnect()
      .build();

    connection.on(
      "msgReceived",
      (message: string, type: string, id: number, url?: string) => {
        setItems([
          {
            isSeen: false,
            message,
            alertType: type,
            url,
            id,
            createdOn: new Date(),
          },
          ...items,
        ]);
        showNotification(message);
      }
    );

    try {
      await connection.start();
    } catch (err) {
      console.log(err);
    }

    if (connection.state === HubConnectionState.Connected) {
      // connection.invoke('SubscribeToBoard', boardId).catch((err: Error) => {
      //   return console.error(err.toString());
      // });
    }

    setHubConnection(connection);
  };

  const handleOpenChange: PopoverProps["onOpenChange"] = (_, data) =>
    setOpen(data.open || false);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <ToolbarButton icon={<Alert24Regular />}></ToolbarButton>
      </PopoverTrigger>

      <PopoverSurface style={{ maxWidth: "600px", width: "20%" }}>
        {items ? (
          <div>
            <Body2> Notifications</Body2>
            <Divider />
          </div>
        ) : (
          ""
        )}

        {items
          ? items.map((item) => {
              const date = new Date(item.createdOn);
              return (
                <div
                  className={`bg-gray-100 p-2 flex justify-between mt-2 border-r-41 ${
                    item.isSeen ? "bg-gray-100" : "bg-blue-50"
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
