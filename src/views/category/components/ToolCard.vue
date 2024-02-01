<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { ToastService } from "@/utils/toast";
import { STORE_CATEGORY } from "@/services/stores";
import { formatNumberIntl, accessToken } from "@/utils";

const { onActionPlusAmountTool, onActionCheckProTool } =
  STORE_CATEGORY.StoreCategory();

const TOAST = ToastService();

const ROUTER = useRouter();

const props = defineProps({
  value: { type: Object, required: false, default: () => {} },
  role: { type: String, required: false, default: "USER" },
  isCreate: { type: Boolean, required: false, default: false },
});

const emits = defineEmits(["onCreate", "onUpdate", "onDelete"]);

const tool = computed(() => props.value);

const onClickTitleToolCard = async (toolId, routeName) => {
  if (!accessToken.value) {
    TOAST.info("Vui lòng đăng nhập để thực hiện tính năng này!");
    return;
  }

  const res = await onActionCheckProTool(toolId);
  if (!res.success) {
    return;
  }

  const routes = ROUTER.getRoutes().map(({ name }) => name);

  if (routes.includes(routeName)) {
    onActionPlusAmountTool(toolId).then((res) => {
      if (res.success) {
        ROUTER.push({ name: routeName, params: { id: props.value._id } });
      }
    });
  } else {
    TOAST.info("Tính năng chưa phát triển!");
  }
};
</script>

<template>
  <div
    style="width: 23.5%; margin-bottom: 2%; overflow: hidden"
    class="relative card h-7rem"
  >
    <div
      v-if="role === 'ADMIN'"
      style="background-color: #4caf4f9c"
      class="action-bg absolute z-5 top-0 left-0 right-0 bottom-0 flex gap-2 justify-content-center align-items-center"
    >
      <i
        style="background-color: #059669"
        class="pi pi-pencil on-click p-3 border-circle"
        @click="emits('onUpdate', tool?._id)"
      />
      <i
        style="background-color: #dc2626"
        class="pi pi-delete-left on-click p-3 border-circle"
        @click="emits('onDelete', tool?._id)"
      />
    </div>

    <div
      v-if="isCreate"
      class="h-full flex align-items-center justify-content-center gap-2"
    >
      <i
        class="pi pi-plus text-2xl text-600 border-1 p-2 on-click border-circle"
        @click="emits('onCreate')"
      />
    </div>

    <div v-else class="flex gap-2">
      <i
        v-show="tool?.isProTool"
        style="right: 1rem"
        class="absolute pi pi-bolt text-main-color"
      />
      <img
        style="border-left: 3px solid #4caf50; object-fit: contain"
        class="w-5rem h-5rem"
        :src="tool?.image"
        alt="Lỗi ảnh"
      />
      <div class="flex h-full flex-column gap-2">
        <span
          class="line-height-2 on-click text-800 fixed-text"
          @click="onClickTitleToolCard(tool?._id, tool?.routeName)"
        >
          {{ tool?.title }}
        </span>
        <span class="text-custom-mini text-700">
          Đã có {{ formatNumberIntl(tool?.amount) }} lượt sử dụng
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action-bg {
  opacity: 0;
  transition: all 0.3s ease;
}

.action-bg:hover {
  opacity: 1;
}
</style>
