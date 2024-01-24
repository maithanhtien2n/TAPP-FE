<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "@/TheHeader.vue";
import TheFooter from "@/TheFooter.vue";

const ROUTE = useRoute();

const isShowHeader = computed(() => +ROUTE.fullPath.split("/").length <= 2);
</script>

<template>
  <div class="flex flex-column h-screen">
    <!-- The header -->
    <TheHeader v-if="isShowHeader" />

    <div class="container p-3 flex-1">
      <router-view />
    </div>

    <!-- The footer -->
    <TheFooter />
  </div>
</template>

<style scoped></style>
