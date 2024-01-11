<script setup>
import { userData } from "@/utils";
import { computed } from "vue";
import AccountInfoUser from "./components/AccountInfoUser.vue";
import AccountInfoAdmin from "./components/AccountInfoAdmin.vue";

const userRole = computed(() => userData.value.role);
</script>

<template>
  <div>
    <AccountInfoUser v-if="userRole === 'USER'" />

    <AccountInfoAdmin v-if="userRole === 'ADMIN'" />
  </div>
</template>
