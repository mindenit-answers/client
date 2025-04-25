<script lang="ts" setup>
const { progress } = useScrollProgress()
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-1 z-50">
    <div
      class="h-full bg-primary transition-all duration-300"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>
