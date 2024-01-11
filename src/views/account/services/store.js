import { defineStore } from "pinia";
import { API_ACCOUNT } from "@/services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export const StoreAccount = defineStore("StoreAccount", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_ACCOUNT.API_ACCOUNT;

  // State
  const listUser = ref({});
  const userInfo = ref({});
  const bankAccountInfo = ref({});

  // Getter
  const onGetterListUser = computed(() => listUser);
  const onGetterUserInfo = computed(() => userInfo);
  const onGetterBankAccountInfo = computed(() => bankAccountInfo);

  // Action
  const onActionGetListUser = async (args, noLoading) => {
    const res = await onResponse(API.getListUser(args, noLoading));
    listUser.value = res.data;
    return res;
  };

  const onActionGetUserInfo = async (params, noLoading) => {
    const res = await onResponse(API.getUserInfo(params, noLoading));
    userInfo.value = res.data;
    return res;
  };

  const onActionSaveUserInfo = async (params, args) => {
    const res = await onResponse(API.saveUserInfo(params, args), true);
    return res;
  };

  const onActionUpdateMoneyBalanceUser = async (args) => {
    const res = await onResponse(API.updateMoneyBalanceUser(args), true);
    return res;
  };

  const onActionUpdateStatusUser = async (args) => {
    const res = await onResponse(API.updateStatusUer(args), true);
    return res;
  };

  const onActionGetBankAccountDetail = async (params, noLoading) => {
    const res = await onResponse(API.getBankAccountDetail(params, noLoading));
    bankAccountInfo.value = res.data;
    return res;
  };

  const onActionSaveBankAccount = async (params, args) => {
    const res = await onResponse(API.saveBankAccount(params, args), true);
    return res;
  };

  return {
    // Getter
    onGetterListUser,
    onGetterUserInfo,
    onGetterBankAccountInfo,

    // Action
    onActionGetListUser,
    onActionGetUserInfo,
    onActionSaveUserInfo,
    onActionUpdateMoneyBalanceUser,
    onActionUpdateStatusUser,
    onActionGetBankAccountDetail,
    onActionSaveBankAccount,
  };
});
