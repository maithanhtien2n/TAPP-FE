<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  accessToken,
  onDeleteAppLocalStorage,
  userData,
  formatToVND,
} from "@/utils";

const ROUTE = useRoute();
const ROUTER = useRouter();

const selectMenu = ref(ROUTE.name);

const listMenu = [
  {
    name: "Thông tin tài khoản",
    code: "ACCOUNT_INFO",
  },
  {
    name: "Nạp tiền",
    code: "TOPUP",
  },
];

const isShowSetting = ref(false);

const onClickIconSetting = () => {
  isShowSetting.value = true;
};

const onClickMenuItem = (code) => {
  if (code === selectMenu.value) {
    return;
  }

  switch (code) {
    case "ACCOUNT_INFO":
      ROUTER.push({ name: "AccountInfo" });
      break;
    case "TOPUP":
      ROUTER.push({ name: "Topup" });
      break;
    default:
      break;
  }

  isShowSetting.value = false;
  selectMenu.value = code;
};

const onClickLogout = () => {
  onDeleteAppLocalStorage();
  isShowSetting.value = false;
};

watchEffect(() => {
  switch (ROUTE.name) {
    case "AccountInfo":
      selectMenu.value = "ACCOUNT_INFO";
      break;
    case "Topup":
      selectMenu.value = "TOPUP";
      break;
    default:
      selectMenu.value = "";
      break;
  }
});
</script>

<template>
  <Sidebar v-model:visible="isShowSetting" class="w-17rem">
    <div class="flex flex-column h-full justify-content-between">
      <div class="flex flex-column">
        <span
          v-for="(item, index) in listMenu"
          :key="index"
          class="p-3 on-click"
          :class="{
            'active-item': item.code === selectMenu,
            'menu-item': item.code !== selectMenu && item.code !== 'LOG_OUT',
          }"
          @click="onClickMenuItem(item.code)"
        >
          {{ item.name }}
        </span>
      </div>

      <span
        style="color: rgb(219, 9, 9)"
        class="p-3 on-click"
        @click="onClickLogout"
      >
        Đăng xuất
      </span>
    </div>
  </Sidebar>

  <div class="box-shadow-1 bg-white">
    <div
      class="container h-4rem flex align-items-center justify-content-between"
    >
      <div
        class="text-2xl font-bold text-main-color on-click"
        @click="ROUTER.push({ name: 'Home' })"
      >
        T a p p
      </div>

      <div v-if="accessToken" class="flex gap-2 align-items-center">
        <img
          class="avatar object-fit-cover"
          :src="userData.avatar || '/images/avatar.jpg'"
          onerror="this.onerror=null; this.src='/images/avatar.jpg';"
        />
        <div class="flex flex-column gap-1">
          <span>{{ userData.userName }}</span>
          <div>
            <span
              v-if="userData.role === 'ADMIN'"
              class="text-custom-mini text-center py-1 px-2 bg-main-color border-round-3xl"
            >
              Quản trị viên
            </span>
          </div>
          <span v-if="userData.role === 'USER'" class="text-custom-mini">
            $ {{ formatToVND(userData.moneyBalance) }}
          </span>
        </div>

        <i
          class="pi pi-spin pi-cog text-2xl on-click"
          @click="onClickIconSetting"
        />
      </div>

      <div v-else class="flex gap-4">
        <span class="on-click" @click="ROUTER.push({ name: 'Login' })">
          Đăng nhập
        </span>
        <span class="on-click" @click="ROUTER.push({ name: 'Register' })">
          Đăng ký
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: #4caf4f71;
}

.active-item {
  color: #4caf50;
}
</style>
