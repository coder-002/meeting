import { createContext, useContext, useEffect, useState } from "react";
import {
    HubConnectionBuilder,
    HubConnectionState,
    HubConnection,
} from "@microsoft/signalr";
import { baseUrl, get } from "../services/apiService";
import { useToast } from "../contexts/ToastConextProvider";

interface alertItem {
    id: number;
    alertType: string;
    message: string;
    url?: string;
    createdOn: Date;
    isSeen: boolean;
}

type AlertContextProps = {
    hub?: HubConnection,
    notifications: alertItem[]
};
const AlertContext = createContext<AlertContextProps>({ notifications: [] });

const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [hubConnection, setHubConnection] = useState<HubConnection>()
    const [items, setItems] = useState<alertItem[]>([]);

    var { showNotification } = useToast();

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

    return (
        <AlertContext.Provider
            value={{ hub: hubConnection, notifications: items }}
        >
            {children}
        </AlertContext.Provider>
    );

}

export const useAlert = () => useContext(AlertContext);
export default AlertContextProvider;
