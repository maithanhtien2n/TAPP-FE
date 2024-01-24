import { defineStore } from "pinia";
import { API_CATEGORY } from "@/services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export * from "../views/convert-image-to-text/services/store";
export * from "../views/virtual-assistant/services/store";

export const StoreCategory = defineStore("StoreCategory", () => {
  // Các hàm khác
  const { onResponse } = Utils();
  const API = API_CATEGORY.API_CATEGORY;

  // State
  const listTool = ref([]);
  const toolDetail = ref({});

  // Getter
  const onGetterListTool = computed(() => listTool);
  const onGetterToolDetail = computed(() => toolDetail);

  // Action
  const onActionGetListTool = async () => {
    const res = await onResponse(API.getListTool());
    listTool.value = res.data;
    return res.data;
  };

  const onActionGetToolDetail = async (param) => {
    const res = await onResponse(API.getToolDetail(param));
    toolDetail.value = res.data;
    return res.data;
  };

  const onActionPlusAmountTool = async (param) => {
    const res = await onResponse(API.plusAmountTool(param));
    return res;
  };

  return {
    // Getter
    onGetterListTool,
    onGetterToolDetail,

    // Action
    onActionGetListTool,
    onActionGetToolDetail,
    onActionPlusAmountTool,
  };
});
