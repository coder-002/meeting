import instance, { baseUrl } from "../services/apiService";
import axios from "axios";

interface LoginResponse {
  token: string;
}

export const redirectToLogin = async () => {
  if (process.env.NODE_ENV === "development")
    location.href = `http://auth.premiumtech.com.np/login?clientId=uwfpcb&returnUrl=${location.href}`;
  else {
    const res = await axios.get(
      `${baseUrl}/login-url?returnUrl=${location.href}`
    );
    if (res) location.href = res.data;
  }
};

export async function refresh(refreshToken: string | string[] | undefined) {
  await instance
    .get<LoginResponse>("/login", { headers: { R: refreshToken } })
    .then((res) => {
      localStorage.setItem("access-token", res.data.token);
      window.location.href = "/";
    });
}

export const logOut = () => {
  localStorage.removeItem("access-token");
  redirectToLogin();
};
