<script setup>
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { STORE_ACCOUNT } from "@/services/stores";
import IconTitle from "@/components/common/IconTitle.vue";
import ImageValidate from "@/components/validation/ImageValidate.vue";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";
import { onMounted, reactive, watch } from "vue";

const {
  onGetterBankAccountInfo: bankAccountInfo,
  onActionGetBankAccountDetail,
  onActionSaveBankAccount,
} = STORE_ACCOUNT.StoreAccount();

const formData = reactive({
  imgQr: null,
  bankName: "",
  accountName: "",
  accountNumber: null,
});

const schema = Yup.object({
  imgQr: Yup.object().required("Vui lòng lòng chọn hình ảnh"),
  bankName: Yup.string().required("Vui lòng nhập tên ngân hàng"),
  accountName: Yup.string().required("Vui lòng nhập tên tài khoản"),
  accountNumber: Yup.string().required("Vui lòng nhập số tài khoản"),
});

const {
  values: infoData,
  resetForm,
  setFieldValue,
  handleSubmit,
} = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async () => {
  const res = await onActionSaveBankAccount(
    [infoData].map((item) => ({
      ...item,
      imgQr: item.imgQr.base64.split(":")[0] === "data" ? item.imgQr : null,
    }))[0]
  );
});

watch(bankAccountInfo, (newBankAccountInfo) => {
  resetForm({ values: Object.assign(formData, newBankAccountInfo) });

  if (newBankAccountInfo.imgQr) {
    setFieldValue("imgQr", {
      name: newBankAccountInfo?.imgQr.split("$")[1],
      base64: newBankAccountInfo?.imgQr,
    });
  }
});

onMounted(() => {
  onActionGetBankAccountDetail("659bcf82a0027339a1e59fe5");
});
</script>

<template>
  <div class="flex flex-column gap-4">
    <IconTitle icon="pi pi-check-circle" title="Thông tin nạp tiền" />

    <div class="flex flex-wrap-reverse gap-6">
      <div style="max-width: 25rem" class="flex-1 flex flex-column gap-3">
        <InputTextValidate
          label="Tên ngân hàng"
          name="bankName"
          class="w-full"
        />

        <InputTextValidate
          label="Tên tài khoản"
          name="accountName"
          class="w-full"
        />

        <InputTextValidate
          label="Số tài khoản"
          name="accountNumber"
          class="w-full"
          type="number"
        />

        <Button label="Lưu thông tin" @click="onSubmit" />
      </div>

      <div class="image-container w-25rem flex flex-column gap-3">
        <ImageValidate
          label="Ảnh QC"
          name="imgQr"
          class="image w-12rem h-12rem"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 670px) {
  .image-container {
    align-items: center;
  }
}
</style>
