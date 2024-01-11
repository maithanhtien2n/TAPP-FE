<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ToastService } from "@/utils/toast";
import { STORE_CATEGORY } from "@/services/stores";
import { formatNumberIntl, accessToken } from "@/utils";

const { onActionPlusAmountTool } = STORE_CATEGORY.StoreCategory();

const TOAST = ToastService();

const ROUTER = useRouter();

const props = defineProps({
  value: { type: Object, required: false, default: () => {} },
});

const tool = computed(() => props.value);

const onClickTitleToolCard = (toolId, routeName) => {
  if (!accessToken.value) {
    TOAST.info("Vui lòng đăng nhập để thực hiện tính năng này!");
    return;
  }

  const routes = ROUTER.getRoutes().map(({ name }) => name);

  if (routes.includes(routeName)) {
    onActionPlusAmountTool(toolId).then((res) => {
      if (res.success) ROUTER.push({ name: routeName });
    });
  } else {
    TOAST.info("Tính năng chưa phát triển!");
  }
};
</script>

<template>
  <div style="width: 23.5%; margin-bottom: 2%" class="card h-7rem flex gap-2">
    <img class="w-5rem h-full" :src="tool?.image" alt="Lỗi ảnh" />
    <div class="flex flex-column gap-2">
      <span
        class="line-height-2 on-click"
        @click="onClickTitleToolCard(tool?._id, tool?.routeName)"
      >
        {{ tool?.title }}
      </span>
      <span class="text-custom-mini text-700">
        Đã có {{ formatNumberIntl(tool?.amount) }} lượt sử dụng
      </span>
    </div>
  </div>
</template>
