import { defineStore } from "pinia";
import { API_CATEGORY } from "@/services/api";
import { computed, ref } from "vue";
import { Utils } from "@/utils/response";

export const StoreConvertImageToText = defineStore(
  "StoreConvertImageToText",
  () => {
    // Các hàm khác
    const { onResponse } = Utils();
    const API = API_CATEGORY.API_CONVERT_IMAGE_TO_TEXT;

    // State
    const textResult = ref("");

    // Getter
    const onGetterTextResult = computed(() => textResult);

    // Action
    const onActionConvertImageToText = async (args) => {
      const res = await onResponse(API.convertImageToText(args));
      textResult.value = res.data;
      return res;
    };

    return {
      // Getter
      onGetterTextResult,

      // Action
      onActionConvertImageToText,
    };
  }
);
