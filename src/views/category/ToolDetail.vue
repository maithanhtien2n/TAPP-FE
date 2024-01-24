<script setup>
import { STORE_CATEGORY } from "@/services/stores";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const ROUTE = useRoute();
const ROUTER = useRouter();

const { onGetterToolDetail, onActionGetToolDetail } =
  STORE_CATEGORY.StoreCategory();

const isShowExit = computed(() => +ROUTE.fullPath.split("/").length === 3);

const toolDetail = computed(() => onGetterToolDetail.value);

onMounted(() => {
  // onActionGetToolDetail(ROUTE.query.toolId);
});
</script>

<template>
  <div class="flex flex-column gap-3 h-full pb-6">
    <router-view />
  </div>

  <div
    v-if="isShowExit"
    style="right: 2rem; bottom: 2rem; color: #fff"
    class="fixed z-5 py-2 px-4 border-round-3xl on-click box-shadow-1 bg-main-color"
    @click="ROUTER.replace({ name: 'Tool' })"
  >
    Thoát
  </div>
</template>
