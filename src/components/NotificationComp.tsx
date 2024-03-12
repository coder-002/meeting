import { Popover, PopoverProps, PopoverSurface, PopoverTrigger, ToolbarButton } from "@fluentui/react-components"
import { Alert24Regular } from "@fluentui/react-icons"
import { useEffect, useState } from "react"
import {
    HubConnectionBuilder,
    HubConnectionState,
    HubConnection
} from "@microsoft/signalr";
import { baseUrl, get } from "../services/apiService";
import { useToast } from "../contexts/ToastConextProvider";

interface alertItem {
    id: number,
    alertType: string,
    message: string,
    url?: string,
    createdOn: Date,
    isSeen: boolean
}

export const NotificationComp = () => {
    const [open, setOpen] = useState<boolean>();
    const [items, setItems] = useState<alertItem[]>([])

    const [_, setHubConnection] = useState<HubConnection>();    

    useEffect(() => {
        getNotifications();

        setUpSignalRConnection().then((con) => {
            //Do something with connection
        });
    }, []);

    const getNotifications = async () => {
        const res = await get<alertItem[]>('/alert');
        if(res) setItems(res.data);
    }

    var { showNotification } = useToast();

    const setUpSignalRConnection = async () => {
        const connection = new HubConnectionBuilder()
            .withUrl(`${baseUrl}/alert-hub?uid=1&cli=uwfpcb`)
            .withAutomaticReconnect()
            .build();

        connection.on('msgReceived', (message: string, type: string, id: number, url?: string) => {
            setItems([{ isSeen: false, message, alertType: type, url, id, createdOn: new Date() }, ...items])
            showNotification(message);
        });

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

    return <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
            <ToolbarButton icon={<Alert24Regular />}></ToolbarButton>
        </PopoverTrigger>

        <PopoverSurface style={{ maxWidth: "600px" }}>
            //eterate the list of notification here
        </PopoverSurface>
    </Popover>



} 