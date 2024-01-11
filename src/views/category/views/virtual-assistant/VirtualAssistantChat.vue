<script setup>
import { computed, onMounted, ref, watch } from "vue";
import UserChat from "./components/UserChat.vue";
import { STORE_CATEGORY } from "@/services/stores";
import { useRoute, useRouter } from "vue-router";
import { userData, accessToken } from "@/utils";
import ButtonBack from "./components/ButtonBack.vue";
import { ToastService } from "@/utils/toast";

const TOAST = ToastService();

const ROUTE = useRoute();
const ROUTER = useRouter();

const {
  onGetterMessages: messages,
  onActionChat,
  onActionCheckLinkChat,
  onActionGetVirtualAssistant,
} = STORE_CATEGORY.StoreVirtualAssistant();

const question = ref("");
const isSearchLoading = ref(false);
const isWritingMessage = ref(false);

const userId = computed(() => ROUTE.query.id);

const onSetScrollTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 1);
};

const onReturnInfoUser = (role) => {
  switch (role) {
    case "user":
      return {
        image: "/images/avatar-you.png",
        name: "Bạn",
      };
    case "assistant":
      return {
        image: "/images/avatar-bot.jpg",
        name: "Bot",
      };
    default:
      return "";
  }
};

const onClickButtonBack = () => {
  if (!accessToken.value) {
    ROUTER.replace({ name: "Home" });
    return;
  }

  messages.value = [];
  ROUTER.replace({ name: "VirtualAssistant" });
};

const onChat = async () => {
  if (isSearchLoading.value) {
    return;
  }

  let contentReq = "";
  contentReq = question.value;
  question.value = "";
  messages.value.push({ role: "user", content: contentReq });
  onSetScrollTop();
  isSearchLoading.value = true;

  onActionChat({
    userId: userId.value,
    content: contentReq,
  })
    .then((res) => {
      messages.value.push(res.data);
      onSetScrollTop();
      isSearchLoading.value = false;
    })
    .catch(() => {
      isSearchLoading.value = false;
    });
};

watch(isSearchLoading, (v) => {
  if (v) {
    setTimeout(() => {
      isWritingMessage.value = true;
      onSetScrollTop();
    }, 600);
  } else {
    isWritingMessage.value = false;
  }
});

onMounted(async () => {
  const resCheckLinkChat = await onActionCheckLinkChat(userId.value);
  if (!resCheckLinkChat.success) {
    ROUTER.replace({ name: "NotFound" });
    return;
  } else {
    userData.value.fullName = resCheckLinkChat?.data?.fullName || "";
    userData.value.userName = resCheckLinkChat?.data?.userName || "";
  }

  onSetScrollTop();

  if (!accessToken.value) {
    return;
  }

  const resGetVirtualAssistant = await onActionGetVirtualAssistant(
    userId.value,
    true
  );

  if (
    !resGetVirtualAssistant.data?.system ||
    !resGetVirtualAssistant.data?.assistant
  ) {
    TOAST.info("Bot không thể hoạt động khi chưa được cấu hình!");
    ROUTER.replace({ name: "VirtualAssistant" });
    return;
  }
});
</script>

<template>
  <ButtonBack @onClick="onClickButtonBack" />
  <br /><br />
  <div
    style="max-width: 40rem"
    class="flex flex-column gap-4 m-auto w-full h-full pb-6"
  >
    <!-- You -->
    <UserChat
      v-for="(item, index) in messages"
      :key="index"
      :image="onReturnInfoUser(item.role).image"
      :name="onReturnInfoUser(item.role).name"
      :message="item.content"
    />

    <UserChat
      v-if="isWritingMessage"
      image="/images/avatar-bot.jpg"
      name="Bot"
    />

    <div
      v-if="!messages.length"
      class="flex h-full justify-content-center align-items-center"
    >
      <div class="flex flex-column gap-3 align-items-center">
        <img
          class="w-10rem h-10rem"
          src="https://cdn-icons-png.flaticon.com/512/1698/1698535.png"
          alt="Lỗi ảnh"
        />
        <span class="text-center line-height-2">
          Chào bạn, tôi là chat bot do
          <span class="text-main-color">
            {{ userData.fullName || userData.userName }}
          </span>
          tạo ra!
        </span>
      </div>
    </div>
  </div>

  <!-- Input chat -->
  <div style="bottom: 1.8rem" class="fixed z-5 left-0 right-0 px-3 bg-white">
    <div
      style="max-width: 50rem"
      class="p-3 border-round-3xl box-shadow-1 flex bg-white m-auto flex-1"
    >
      <input
        v-model="question"
        type="text"
        class="w-full border-none outline-none"
        placeholder="Bạn muốn hỏi gì?"
        @keypress.enter="onChat"
      />

      <div style="padding-left: 0.7rem" class="border-left-1 text-400">
        <i v-if="isSearchLoading" class="pi pi-spin pi-spinner text-900" />
        <i
          v-else
          class="pi pi-angle-right text-900 on-click"
          :class="{ 'p-disabled': !question }"
          @click="onChat"
        />
      </div>
    </div>
  </div>
</template>
