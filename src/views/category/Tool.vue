<script setup>
import ToolCard from "./components/ToolCard.vue";
import { STORE_CATEGORY } from "@/services/stores";
import { computed, onMounted } from "vue";
import IconTitle from "@/components/common/IconTitle.vue";

const { onGetterListTool, onActionGetListTool } =
  STORE_CATEGORY.StoreCategory();

const listTool = computed(() => onGetterListTool.value);

onMounted(() => {
  onActionGetListTool();
});
</script>

<template>
  <div class="flex flex-column gap-4">
    <IconTitle icon="pi pi-microsoft" title="Ứng dụng" />

    <div style="gap: 2%" class="card-container flex flex-wrap">
      <ToolCard v-for="(item, index) in listTool" :key="index" :value="item" />
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 1170px) {
  .card {
    width: 32% !important;
  }
}

@media only screen and (max-width: 850px) {
  .card {
    width: 49% !important;
  }
}

@media only screen and (max-width: 570px) {
  .card {
    width: 100% !important;
    margin-bottom: 3% !important;
  }
}
</style>
