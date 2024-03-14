import { ReactNode } from "react";
import AuthContextProvider from "../contexts/AuthContextProvider";
import ToastContextProvider from "../contexts/ToastConextProvider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ThemeProvider from "../contexts/ThemeContextProvider";
import AlertContextProvider from "../contexts/AlertContext";

interface Props {
  children: ReactNode;
}
const queryClient = new QueryClient();
const Providers = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <ToastContextProvider>
              <div className="h-screen">{children}</div>
            </ToastContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Providers;
