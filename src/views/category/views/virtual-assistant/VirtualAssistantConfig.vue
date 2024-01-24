<script setup>
import { userData } from "@/utils";
import { useRouter } from "vue-router";
import { watch, onMounted, reactive } from "vue";
import { STORE_CATEGORY } from "@/services/stores";
import ButtonBack from "./components/ButtonBack.vue";

const ROUTER = useRouter();

const {
  onGetterVirtualAssistant: virtualAssistant,
  onActionGetVirtualAssistant,
  onActionSaveVirtualAssistant,
} = STORE_CATEGORY.StoreVirtualAssistant();

const data = reactive({
  userId: userData.value._id,
  system: "",
});

const onClickSave = async () => {
  const res = await onActionSaveVirtualAssistant(data);
  if (res.success) {
    onActionGetVirtualAssistant(data.userId, true);
  }
};

watch(virtualAssistant, (newValue) => {
  Object.assign(data, newValue);
});

onMounted(() => {
  onActionGetVirtualAssistant(data.userId);
});
</script>

<template>
  <ButtonBack @onClick="ROUTER.replace({ name: 'VirtualAssistant' })" />
  <br /><br />
  <div class="h-full">
    <div class="flex flex-column gap-2 align-items-center">
      <span class="text-custom-1 flex">Cấu hình bot</span>
      <span style="max-width: 30rem" class="text-700 line-height-2 text-center">
        Bạn hãy cung cấp thông tin chuẩn xác để bot có thể học và trả lời tự
        nhiên và đúng nhất.
      </span>
    </div>
    <br />
    <div class="w-full text-right mb-3">
      <Button label="Lưu cấu hình" @click="onClickSave" />
    </div>

    <Editor
      v-model="data.system"
      style="height: 15rem"
      placeholder="Cung cấp thông tin cho bot..."
    >
      <template v-slot:toolbar>
        <span class="ql-formats">
          <button v-tooltip.bottom="'Bold'" class="ql-bold" />
          <button v-tooltip.bottom="'Italic'" class="ql-italic" />
          <button v-tooltip.bottom="'Underline'" class="ql-underline" />
        </span>
      </template>
    </Editor>
  </div>
</template>
