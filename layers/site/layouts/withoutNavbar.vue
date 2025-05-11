<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <div class="flex flex-col w-full relative">
    <div class="flex flex-col pt-5 container mx-auto px-4 h-dvh gap-5">
      <div class="flex flex-col md:pb-5 pb-24 gap-5">
        <slot />
      </div>
    </div>
    <NuxtLink
      :to="config.public.jarUrl"
      target="_blank"
      class="block fixed bottom-20 md:bottom-10 right-2 md:right-1"
    >
      <NuxtImg
        src="/qr.webp"
        alt="QR code"
        class="w-32 md:w-48 pointer-events-none drop-shadow-xl"
      />
    </NuxtLink>
  </div>
</template>
