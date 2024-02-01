import { AxiosInstance } from "@/services/api";

class ApiAccount {
  getListUser = async (args, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `user`,
      params: args,
      noLoading,
    });
  };

  getUserInfo = async (params, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `user/${params}`,
      noLoading,
    });
  };

  saveUserInfo = async (params, args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user?userId=${params}`,
      data: {
        avatar: args?.avatar
          ? args?.avatar?.base64.split(":")[0] === "data"
            ? args?.avatar
            : null
          : null,
        fullName: args?.fullName || "",
        phoneNumber: args?.phoneNumber || null,
        gender: args?.gender || "",
      },
    });
  };

  updateMoneyBalanceUser = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user/topup`,
      data: args,
    });
  };

  updateStatusUer = async (args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user/update-status`,
      data: args,
    });
  };

  getBankAccountDetail = async (params, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `bank-account/${params}`,
      noLoading,
    });
  };

  saveBankAccount = async (args) => {
    console.log(args);
    return await AxiosInstance({
      method: "PUT",
      url: `bank-account`,
      data: args,
    });
  };
}

export const API_ACCOUNT = new ApiAccount();
