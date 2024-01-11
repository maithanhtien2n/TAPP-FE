<script setup>
const emits = defineEmits(["onClick"]);
</script>

<template>
  <div class="fixed z-5 left-0 right-0 top-0 bg-main-color">
    <div
      style="max-width: 52rem"
      class="m-auto flex justify-content-between align-items-center py-2 px-3"
    >
      <div
        style="background-color: rgb(255, 255, 255)"
        class="flex align-items-center gap-1 on-click px-3 py-2 border-round-3xl"
        @click="emits('onClick')"
      >
        <i class="pi pi-angle-left" />
        <span>Trở lại</span>
      </div>

      <div>Chatbot 1.0</div>
    </div>
  </div>
</template>
