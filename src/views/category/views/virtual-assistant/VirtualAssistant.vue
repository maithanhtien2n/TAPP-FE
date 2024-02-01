<script setup>
import { userData } from "@/utils";
import { useRouter } from "vue-router";

const ROUTER = useRouter();
</script>

<template>
  <div class="h-full flex justify-content-center align-items-center">
    <div class="flex flex-column gap-4">
      <img
        class="h-21rem"
        src="https://cdn-icons-png.flaticon.com/512/1698/1698535.png"
        alt="Lỗi ảnh"
      />
      <div class="flex gap-3">
        <button
          class="btn on-click bg-transparent"
          @click="ROUTER.push({ name: 'VirtualAssistantConfig' })"
        >
          Cấu hình cho bot
        </button>
        <button
          style="color: aliceblue"
          class="btn on-click bg-main-color"
          @click="
            ROUTER.push({
              name: 'VirtualAssistantChat',
              query: { id: userData._id },
            })
          "
        >
          Trò chuyện với bot
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item-active {
  background-color: #8f8f8f;
}
</style>
