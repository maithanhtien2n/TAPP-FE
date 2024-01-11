<script setup>
import * as Yup from "yup";
import { reactive } from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";
import { onValidAccountName, onValidPassword } from "@/utils";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";
import TheFooterVue from "@/TheFooter.vue";

const ROUTER = useRouter();

const { onActionRegisterAccount } = StoreApp();

const formData = reactive({
  userName: "",
  password: "",
  passwordConfirm: "",
});

const schema = Yup.object({
  userName: Yup.string()
    .test(
      "userName",
      "Phải có ít nhất 6 ký tự, gồm số và không viết hoa",
      (v) => onValidAccountName(v)
    )
    .required("Vui lòng nhập tên tài khoản"),
  password: Yup.string()
    .test(
      "password",
      "Phải có ít nhất 6 ký tự, gồm số và ký tự đặc biệt",
      (v) => onValidPassword(v)
    )
    .required("Vui lòng nhập mật khẩu"),
  passwordConfirm: Yup.string()
    .when("password", (v, schema, { value }) => {
      return schema.test(
        "",
        "Mật khẩu xác nhận không khớp",
        () => v[0] === value
      );
    })
    .required("Vui lòng nhập mật khẩu xác nhận"),
});

const { values: infoData, handleSubmit } = useForm({
  initialValues: formData,
  validationSchema: schema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async () => {
  const res = await onActionRegisterAccount(infoData);
  if (res.success) ROUTER.replace({ name: "Home" });
});
</script>
<template>
  <div
    class="h-screen flex flex-column justify-content-center align-items-center"
  >
    <div class="w-20rem flex flex-column gap-3">
      <InputTextValidate
        name="userName"
        class="w-full"
        placeholder="Tên tài khoản"
        @keypress.enter="onSubmit"
      />

      <InputTextValidate
        name="password"
        type="password"
        class="w-full"
        placeholder="Mật khẩu"
        @keypress.enter="onSubmit"
      />

      <InputTextValidate
        name="passwordConfirm"
        type="password"
        class="w-full"
        placeholder="Mật khẩu xác nhận"
        @keypress.enter="onSubmit"
      />

      <Button label="Đăng ký" @click="onSubmit" />

      <div class="flex gap-3 align-items-center">
        <span class="flex-1 border-top-1 text-300" />
        <span class="text-700">hoặc</span>
        <span class="flex-1 border-top-1 text-300" />
      </div>

      <Button
        label="Bạn đã có tài khoản?"
        class="w-full"
        outlined
        @click="ROUTER.replace({ name: 'Login' })"
      />
    </div>
  </div>

  <TheFooterVue />
</template>
