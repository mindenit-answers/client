<script lang="ts" setup>
import TheBackground from '~/core/components/TheBackground.vue'
import { useBreakpoints } from '@vueuse/core'

const isDark = computed(() => useColorMode().value == 'dark')

const breakpoints = useBreakpoints({
  mobile: 768,
  desktop: 769,
})

const isMobile = breakpoints.smaller('desktop')
const dotsQuantity = computed(() => (isMobile.value ? 100 : 300))
</script>

<template>
  <div class="flex flex-col w-full relative">
    <div class="flex flex-col pt-5 min-h-dvh gap-5 px-4">
      <div class="container mx-auto">
        <TheNavbar />
      </div>
      <slot />
    </div>
    <TheFooter class="md:pb-5 pb-20" />
    <TheBackground
      class="absolute left-0 right-0 h-dvh -z-1"
      :quantity="dotsQuantity"
      :ease="100"
      :color="isDark ? '#FFF' : '#000'"
      :staticity="10"
      refresh
    />
  </div>
</template>
