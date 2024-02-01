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
  const onActionGetListTool = async (noLoading) => {
    const res = await onResponse(API.getListTool(noLoading));
    listTool.value = res.data;
    return res.data;
  };

  const onActionGetToolDetail = async (param) => {
    const res = await onResponse(API.getToolDetail(param));
    toolDetail.value = res.data;
    return res;
  };

  const onActionPlusAmountTool = async (param) => {
    const res = await onResponse(API.plusAmountTool(param));
    return res;
  };

  const onActiveSaveTool = async (args) => {
    const res = await onResponse(API.saveTool(args), true);
    return res;
  };

  const onActionDeleteTool = async (params) => {
    const res = await onResponse(API.deleteTool(params), true);
    return res;
  };

  const onActionCheckProTool = async (toolId) => {
    const res = await onResponse(API.checkProTool(toolId));
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
    onActiveSaveTool,
    onActionDeleteTool,
    onActionCheckProTool,
  };
});
