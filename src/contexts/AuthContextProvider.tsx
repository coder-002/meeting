import React, { createContext, useContext, useEffect, useState } from "react";
import { isRunningOnLocalhost } from "../helpers/urlHelper";
import { redirectToLogin } from "../services/authService";
import { get } from "../services/apiService";
import Loading from "../components/Loading";

type AuthContextProps = {};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const getToken = () => {
  if (window !== undefined) return localStorage.getItem("access-token");
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loginCheck = async () => {
      const res = await get("/login/ping", null);
      if (res) setIsAuthorized(true);
    };
    const searchParams = new URLSearchParams(window.location.search);

    let token = getToken();
    if (searchParams.has("token")) {
      token = searchParams.get("token") || "";
      const returnUrl = searchParams.get("returnUrl");
      localStorage.setItem("access-token", token);
      if (returnUrl) {
        if (isRunningOnLocalhost(returnUrl.toString() ?? "")) {
          window.location.href = `${returnUrl}?token=${token}`;
          return;
        } else {
          window.location.href = `${returnUrl}`;
          return;
        }
      } else {
        window.location.href = "/";
        return;
      }
    }

    if (!token && !searchParams.has("token")) {
      redirectToLogin();
    } else loginCheck();
  }, []);
  return (
    <AuthContext.Provider value={isAuthorized}>
      {isAuthorized ? children : <Loading />}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
