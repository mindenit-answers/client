<script lang="ts" setup>
import { motion } from 'motion-v'

const isMobileSidebarOpen = ref(false)

function toggleMobileSidebar() {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

function closeMobileSidebar() {
  isMobileSidebarOpen.value = false
}

const bgVariants = {
  visible: {
    opacity: 1,
    display: 'flex',
  },
  hidden: {
    opacity: 0,
    display: 'none',
  },
}
</script>

<template>
  <div class="flex flex-col w-full relative">
    <AdminSidebar
      variant="mobile"
      class="md:hidden"
      :is-open="isMobileSidebarOpen"
      @close="closeMobileSidebar"
    />

    <motion.div
      class="fixed inset-0 z-30 bg-background/50 backdrop-blur-md md:hidden"
      :variants="bgVariants"
      :initial="false"
      :animate="isMobileSidebarOpen ? 'visible' : 'hidden'"
      :transition="{
        duration: 0.3,
        ease: 'easeOut',
      }"
      @click="closeMobileSidebar"
    ></motion.div>

    <div class="flex h-dvh">
      <div class="flex flex-col pt-5 container mx-auto px-4 h-dvh gap-5">
        <TheNavbar>
          <Button
            variant="ghost"
            class="md:hidden"
            @click="toggleMobileSidebar"
          >
            <Icon size="18px" name="lucide:menu"></Icon>
          </Button>
        </TheNavbar>

        <div class="flex flex-1 md:pb-5 pb-24 gap-4">
          <AdminSidebar
            variant="desktop"
            :is-open="true"
            class="hidden md:flex"
          />

          <div class="flex-1 overflow-auto">
            <div class="flex flex-col gap-5">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
