<script setup>
import { useForm } from "vee-validate";
import ImageValidate from "@/components/validation/ImageValidate.vue";
import { reactive, watch } from "vue";
import { STORE_CATEGORY } from "@/services/stores";

const { onGetterTextResult, onActionConvertImageToText } =
  STORE_CATEGORY.StoreConvertImageToText();

const formData = reactive({
  image: null,
  text: "",
});

const { values: formInfo, handleSubmit } = useForm({ initialValues: formData });

const onClickRemoveImage = () => {
  formData.text = "";
};

watch(onGetterTextResult, (newValue) => {
  formData.text = newValue;
});

const onSubmit = handleSubmit(async () => {
  const res = await onActionConvertImageToText(formInfo);
  if (res.success) formData.text = res.data;
});
</script>

<template>
  <div class="flex justify-content-center align-items-center h-full">
    <div class="w-full">
      <div class="flex w-full h-full gap-3 flex-wrap">
        <!-- Hình ảnh -->
        <div
          style="min-width: 18rem"
          class="image-container flex flex-column flex-1 gap-3"
        >
          <span>Nhập hình ảnh chuyển đổi</span>
          <div
            style="height: 340px"
            class="image-container flex flex-column justify-content-between gap-3"
          >
            <ImageValidate
              name="image"
              class="image w-full h-18rem"
              @onRemove="onClickRemoveImage"
            />
            <Button
              label="Chuyển đổi"
              class="btn-convert"
              @click="onSubmit"
              :disabled="!formInfo.image"
            />
          </div>
        </div>

        <!-- Văn bản -->
        <div
          style="min-width: 18rem"
          class="editor-container flex flex-column flex-1 gap-3"
        >
          <span>Văn bản sau khi chuyển đổi</span>
          <Editor
            v-model="formData.text"
            class="editor"
            style="height: 300px"
            :class="{ 'p-disabled': !formData.text }"
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
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 620px) {
  .image-container,
  .editor-container {
    gap: 0.3rem !important;
  }

  .image-container {
    justify-content: start !important;
  }

  .btn-convert {
    margin-top: 0.8rem;
  }

  .editor {
    height: 200px !important;
    margin-bottom: 2.4rem;
  }
}
</style>
