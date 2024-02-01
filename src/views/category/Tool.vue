<script setup>
import * as Yup from "yup";
import { useForm, useField } from "vee-validate";
import ToolCard from "./components/ToolCard.vue";
import { STORE_CATEGORY } from "@/services/stores";
import { computed, onMounted, ref, reactive, watch } from "vue";
import IconTitle from "@/components/common/IconTitle.vue";
import ImageValidate from "@/components/validation/ImageValidate.vue";
import DropdownValidate from "@/components/validation/DropdownValidate.vue";
import InputTextValidate from "@/components/validation/InputTextValidate.vue";
import { useRouter } from "vue-router";
import { userData } from "@/utils";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

const ROUTER = useRouter();
const {
  onGetterListTool,
  onGetterToolDetail,
  onActionGetListTool,
  onActionGetToolDetail,
  onActiveSaveTool,
  onActionDeleteTool,
} = STORE_CATEGORY.StoreCategory();

const listTool = computed(() => onGetterListTool.value);

const formData = reactive({
  image: null,
  title: "",
  routeName: "",
  isProTool: false,
});

const visible = ref(false);
const dialogTitle = ref("Thêm ứng dụng");

const appRoutes = computed(() =>
  ROUTER.options.routes
    .find(({ name }) => name === "App")
    .children.find(({ name }) => name === "ToolDetail")
    .children.filter((item) => item.path.split("/").length === 2)
    .map((item) => ({
      name: item.path,
      code: item.name,
    }))
);

const userRole = computed(() => userData.value.role);

const schema = Yup.object({
  image: Yup.object().required("Vui lòng chọn ảnh"),
  title: Yup.string().required("Vui lòng nhập tên ứng dụng"),
  routeName: Yup.string().required("Vui lòng nhập đường dẫn"),
});

const {
  values: infoData,
  resetForm,
  setFieldValue,
  handleSubmit,
} = useForm({
  validationSchema: schema,
  keepValuesOnUnmount: true,
});

const { value: isProTool } = useField("isProTool");

const onClickOpenUpdatePopup = async (toolId) => {
  const res = await onActionGetToolDetail(toolId);
  if (res.success) {
    dialogTitle.value = "Cập nhật ứng dụng";
    visible.value = true;
  }
};

const onClickDelete = async (toolId) => {
  confirm.require({
    message: "Bạn có chắc xóa ứng dụng này?",
    header: "Xác nhận",
    acceptLabel: "Đồng ý",
    acceptClass: "p-button-danger",
    rejectLabel: "Hủy bỏ",
    rejectClass: "p-button-outlined",
    accept: async () => {
      const res = await onActionDeleteTool(toolId);
      if (res.success) {
        onActionGetListTool(true);
      }
    },
  });
};

const onSubmit = handleSubmit(async () => {
  const res = await onActiveSaveTool(infoData);
  if (res.success) {
    visible.value = false;
    onActionGetListTool(true);
  }
});

watch(onGetterToolDetail, (newValue) => {
  resetForm({ values: Object.assign(formData, newValue) });
  if (newValue.image) {
    setFieldValue("image", {
      name: newValue?.image.split("$")[1],
      base64: newValue?.image,
    });
  }
});

onMounted(() => {
  onActionGetListTool();
});
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="dialogTitle" class="w-25rem">
    <div class="flex gap-2">
      <ImageValidate name="image" class="image w-8rem h-8rem" />

      <div class="w-full flex flex-column gap-1">
        <InputTextValidate
          name="title"
          class="w-full"
          placeholder="Tên ứng dụng"
        />

        <DropdownValidate
          name="routeName"
          :options="appRoutes"
          placeholder="Tên đường dẫn"
          :required="false"
        />

        <div class="flex gap-2 align-items-center mt-2">
          <Checkbox v-model="isProTool" :binary="true" />
          <span>Áp dụng trả phí</span>
        </div>
      </div>
    </div>

    <Button label="Thêm ứng dụng" class="w-full mt-5" @click="onSubmit" />
  </Dialog>

  <div class="flex flex-column gap-4">
    <IconTitle icon="pi pi-microsoft" title="Ứng dụng" />

    <div style="gap: 2%" class="card-container flex flex-wrap">
      <ToolCard
        v-if="userRole === 'ADMIN'"
        @onCreate="
          () => {
            visible = true;
            resetForm({ values: {} });
          }
        "
        :isCreate="true"
      />

      <ToolCard
        v-for="(item, index) in listTool"
        :key="index"
        :value="item"
        :role="userRole"
        @onUpdate="onClickOpenUpdatePopup"
        @onDelete="onClickDelete"
      />
    </div>
  </div>

  <ConfirmDialog />
</template>

<style scoped>
@media only screen and (max-width: 1170px) {
  .card {
    width: 32% !important;
  }
}

@media only screen and (max-width: 850px) {
  .card {
    width: 49% !important;
  }
}

@media only screen and (max-width: 570px) {
  .card {
    width: 100% !important;
    margin-bottom: 3% !important;
  }
}
</style>
