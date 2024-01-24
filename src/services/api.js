import axios from "axios";
import { StoreApp } from "./stores";
import { accessToken, onDeleteAppLocalStorage } from "@/utils";

export * as API_CATEGORY from "@/views/category/services/api";
export * as API_ACCOUNT from "@/views/account/services/api";

class ApiApp {
  onApiLoginAccount = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/login",
      data: {
        userName: args?.userName || null,
        password: args?.password || null,
      },
    });
  };

  onApiRegisterAccount = async (args) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/register",
      data: {
        userName: args?.userName || null,
        password: args?.password || null,
      },
    });
  };

  onApiGetUserInfo = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "user",
      // noLoading: true,
    });
  };
}

export const API_APP = new ApiApp();

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

updateAuthorizationHeader(accessToken?.value);

AxiosInstance.interceptors.request.use((config) => {
  if (!config?.noLoading) StoreApp().onActionLoadingActive(true);
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    StoreApp().onActionLoadingActive(false);
    return response;
  },
  (error) => {
    if (
      [
        "Vui lòng đăng nhập để sử dụng tính năng này!",
        "Phiên đăng nhập đã hết hạn!",
        "Xác thực token thất bại!",
        "Tài khoản của bạn đã bị khóa!",
      ].includes(error.response.data.statusValue)
    ) {
      onDeleteAppLocalStorage();
    }

    StoreApp().onActionLoadingActive(false);
    return Promise.reject(error);
  }
);

export { AxiosInstance, updateAuthorizationHeader };
