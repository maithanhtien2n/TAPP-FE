<script setup>
import { StoreApp } from "@/services/stores";

window.scrollTo(0, 0);

const { onGetterLoading: loading } = StoreApp();
</script>

<template>
  <!-- Loading -->
  <div v-show="loading.active" class="loading-overlay">
    <div class="loading-content">
      <ProgressSpinner />
      <span>{{ loading.message }}</span>
    </div>
  </div>

  <Dialog v-model:visible="loading.active" modal class="opacity-0" />
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.9;
  background-image: linear-gradient(to top, #dadada, var(--mainColor));
  z-index: 9999999999 !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-content {
  position: relative; /* Chỉnh lại position */
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
}
</style>
