<script setup>
import { userData, formatToVND } from "@/utils";
import IconTitle from "@/components/common/IconTitle.vue";
import { STORE_ACCOUNT } from "@/services/stores";
import { onMounted } from "vue";

const {
  onGetterBankAccountInfo: bankAccountInfo,
  onActionGetBankAccountDetail,
} = STORE_ACCOUNT.StoreAccount();

onMounted(() => {
  onActionGetBankAccountDetail("659bcf82a0027339a1e59fe5");
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <IconTitle icon="pi pi-check-circle" title="Nạp tiền" />
    <!-- Thông tin số dư -->
    <div class="flex-1">
      <div style="color: #fff" class="w-full p-3 bg-main-color">
        $ {{ formatToVND(userData.moneyBalance) }}
      </div>
    </div>

    <!-- Thông tin nạp tiền -->
    <div class="mt-3 w-full flex justify-content-center">
      <div
        style="max-width: 23rem"
        class="flex flex-column gap-2 align-items-center"
      >
        <img
          style="object-fit: contain"
          class="w-13rem h-13rem box-shadow-1"
          :src="bankAccountInfo?.imgQr"
          alt="Lỗi ảnh"
        />
        <span>{{ bankAccountInfo?.bankName }}</span>
        <span>{{ bankAccountInfo?.accountName }}</span>
        <span>{{ bankAccountInfo?.accountNumber }}</span>
      </div>
    </div>
  </div>
</template>
