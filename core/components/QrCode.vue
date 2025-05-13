<script setup lang="ts">
const config = useRuntimeConfig()
const { $rybbit } = useNuxtApp()

const handleClick = () => {
  $rybbit.event('qr_code_clicked')
}
</script>

<template>
  <NuxtLink
    :to="config.public.jarUrl"
    target="_blank"
    class="block fixed bottom-20 md:bottom-10 right-2 md:right-1"
    @click="handleClick"
  >
    <NuxtImg
      src="/qr.webp"
      alt="QR code"
      class="w-32 md:w-48 pointer-events-none drop-shadow-xl"
    />
  </NuxtLink>
</template>
