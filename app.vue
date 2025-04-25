<script setup lang="ts">
import { Toaster } from '@/core/components/ui/sonner'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster richColors position="top-right" />
  <NuxtLoadingIndicator color="#6368f2" />
  <NuxtRouteAnnouncer />
</template>
