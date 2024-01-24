import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_APP as API } from "./api";
import { Utils } from "@/utils/response";

export * as STORE_CATEGORY from "@/views/category/services/store";
export * as STORE_ACCOUNT from "@/views/account/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  // Các hàm khác
  const { onResponse } = Utils();

  // State
  const loading = ref({
    active: false,
    message: "",
  });
  const userInfo = ref({});

  // Getter
  const onGetterLoading = computed(() => loading);
  const onGetterUserInfo = computed(() => userInfo);

  // Action
  const onActionLoadingActive = (active, message = "Đang tải...") => {
    loading.value = { active, message };
  };

  // Đăng nhập
  const onActionLoginAccount = async (args) => {
    return await onResponse(API.onApiLoginAccount(args));
  };

  // Đăng ký
  const onActionRegisterAccount = async (args) => {
    return await onResponse(API.onApiRegisterAccount(args), true);
  };

  // Thông tin người dùng
  const onActionGetUserInfo = async (args) => {
    const res = await onResponse(API.onApiGetUserInfo(args));
    userInfo.value = res?.data;
    return res;
  };

  return {
    // Getter
    onGetterLoading,
    onGetterUserInfo,

    // Action
    onActionLoadingActive,
    onActionLoginAccount,
    onActionRegisterAccount,
    onActionGetUserInfo,
  };
});
