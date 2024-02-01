<script setup>
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { computed, onMounted, reactive, watch } from "vue";
import { appLocalStorage, userData, isValidPhoneNumber } from "@/utils";
import IconTitle from "@/components/common/IconTitle.vue";
import ImageValidate from "@/components/validation/ImageValidate.vue";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";
import DropdownValidate from "@/components/validation/DropdownValidate.vue";
import { STORE_ACCOUNT } from "@/services/stores";

const {
  onGetterUserInfo: userInfo,
  onActionGetUserInfo,
  onActionSaveUserInfo,
} = STORE_ACCOUNT.StoreAccount();

const formData = reactive({
  avatar: null,
  fullName: "",
  phoneNumber: null,
  gender: "",
});

const userId = computed(() => userData.value._id);

const schema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  phoneNumber: Yup.string()
    .test(
      "phoneNumber",
      "Vui lòng nhập đúng định dạng số điện thoại",
      (value) =>
        value.length >= 10 && value.length <= 12 && isValidPhoneNumber(value)
    )
    .required("Vui lòng nhập số điện thoại"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
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
  const res = await onActionSaveUserInfo(userId.value, infoData);
  if (res.success) {
    onActionGetUserInfo(userId.value, true).then((res) => {
      if (res.success) appLocalStorage.value.userData = res?.data;
    });
  }
});

watch(userInfo, (newValue) => {
  resetForm({ values: Object.assign(formData, newValue) });
  if (newValue.avatar) {
    setFieldValue("avatar", {
      name: newValue?.avatar.split("$")[1],
      base64: newValue?.avatar,
    });
  }
});

onMounted(() => {
  onActionGetUserInfo(userId.value);
});
</script>

<template>
  <div class="flex flex-column gap-4">
    <IconTitle icon="pi pi-user" title="Thông tin tài khoản" />

    <div class="flex flex-wrap-reverse gap-6">
      <div style="max-width: 25rem" class="flex-1 flex flex-column gap-3">
        <InputTextValidate
          label="Họ và tên"
          name="fullName"
          class="w-full"
          placeholder="Họ và tên"
        />

        <InputTextValidate
          label="Số điện thoại"
          name="phoneNumber"
          class="w-full"
          placeholder="Số điện thoại"
          type="number"
        />

        <DropdownValidate
          label="Giới tính"
          name="gender"
          :options="[
            { name: 'Nam', code: 'male' },
            { name: 'Nữ', code: 'female' },
            { name: 'Khác', code: 'other' },
          ]"
          placeholder="Giới tính"
        />

        <Button label="Lưu thông tin" @click="onSubmit" />
      </div>

      <div class="image-container w-25rem flex flex-column gap-3">
        <ImageValidate
          label="Ảnh đại diện"
          name="avatar"
          class="image w-10rem h-10rem"
          :required="false"
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
