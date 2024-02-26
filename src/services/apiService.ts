import axios, { AxiosError } from "axios";
import { redirectToLogin } from "./authService";
import { getToken } from "../contexts/AuthContextProvider";
let baseUrl = "http://168.119.14.23:8002";

const instance = axios.create({
  baseURL: `${baseUrl}/api`,
});

instance.interceptors.request.use(function (config) {
  const accessToken = getToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    switch (error.response?.status) {
      case 401: {
        redirectToLogin();
      }
      case 500: {
        return "Something went wrong";
      }
      default:
        return error;
    }
  }
);

export const get = async <T>(url: string, headers?: any, onError?: any) => {
  const res = await instance.get<T>(url, headers).catch((err) => {
    if (onError) onError(err);
  });
  if (res) {
    return res;
  }
};
export const deleteReq = async (url: string, headers?: any, onError?: any) => {
  const res = await instance.delete(url, headers).catch((err) => {
    if (onError) onError(err);
  });
  if (res) {
    return res;
  }
};
export const post = async (
  url: string,
  body: {},
  headers?: any,
  onError?: any
) => {
  try {
    const res = await instance.post(url, body, headers);
    if (res.status >= 200 || res.status <= 300) {
      return res;
    } else throw res;
  } catch (err) {
    if (onError) {
      if (typeof err === "string") {
        onError(err);
      } else if (err instanceof AxiosError) {
        onError((err as AxiosError<any>)?.response?.data.Message);
      }
    }
  }
};
export const put = async (
  url: string,
  body: {},
  headers?: any,
  onError?: any
) => {
  const res = await instance
    .put(url, body, headers)
    .catch((err) => onError(err));
  if (res) {
    return res;
  }
};

export { baseUrl };
export default instance;
