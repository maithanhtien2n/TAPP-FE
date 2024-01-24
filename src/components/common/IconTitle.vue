<script setup>
const props = defineProps({
  icon: { type: String, required: false, default: "" },
  title: { type: String, required: false, default: "" },
});
</script>

<template>
  <div class="flex gap-2 align-items-center">
    <i :class="['text-700 text-2xl', icon]" />
    <span class="text-custom-1 text-800">
      {{ title }}
    </span>
  </div>
</template>
