import { ReactNode } from "react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import AuthContextProvider from "../contexts/AuthContextProvider";
import ToastContextProvider from "../contexts/ToastConextProvider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
interface Props {
  children: ReactNode;
}
const queryClient = new QueryClient();
const Providers = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <FluentProvider theme={teamsLightTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <ToastContextProvider>{children}</ToastContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </FluentProvider>
    </BrowserRouter>
  );
};

export default Providers;
