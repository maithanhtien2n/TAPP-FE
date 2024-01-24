<script setup>
import { useRouter } from "vue-router";

const ROUTER = useRouter();
</script>

<template>
  <div
    class="h-full flex justify-content-center align-items-center flex-column gap-3"
  >
    <span class="text-3xl font-bold text-main-color text-center line-height-2">
      WELCOME TO TAPP !
    </span>
    <span class="max-w-30rem text-center line-height-3 text-700">
      Nơi cung cấp công cụ hỗ trợ cho thành công của bạn, khám phá ngay để trải
      nghiệm sự tiện lợi và mạnh mẽ!
    </span>

    <div class="flex gap-3">
      <button
        style="border: 1px solid #969696"
        class="p-3 border-round-3xl bg-transparent on-click text-700"
      >
        Tìm hiểu thêm
      </button>

      <button
        style="color: #fff"
        class="p-3 border-none border-round-3xl on-click bg-main-color"
        @click="ROUTER.push({ name: 'Tool' })"
      >
        Bắt đầu ngay
      </button>
    </div>
  </div>
</template>
