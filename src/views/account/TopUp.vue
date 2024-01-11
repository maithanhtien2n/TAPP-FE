<script setup>
import { userData } from "@/utils";
import { computed } from "vue";
import TopUpUser from "./components/TopUpUser.vue";
import TopUpAdmin from "./components/TopUpAdmin.vue";

const userRole = computed(() => userData.value.role);
</script>

<template>
  <div>
    <TopUpUser v-if="userRole === 'USER'" />

    <TopUpAdmin v-if="userRole === 'ADMIN'" />
  </div>
</template>
