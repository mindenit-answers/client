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

const links = [
  {
    name: 'Головна',
    href: '/admin',
    icon: 'lucide:home',
  },
  {
    name: 'Питання',
    href: '/admin/questions',
    icon: 'lucide:file-question',
  },
  {
    name: 'Курси',
    href: '/admin/courses',
    icon: 'lucide:book-open',
  },
  {
    name: 'Тести',
    href: '/admin/tests',
    icon: 'lucide:layout-list',
  },
  {
    name: 'Предмети',
    href: '/admin/subjects',
    icon: 'lucide:book',
  },
  {
    name: 'Факультети',
    href: '/admin/faculties',
    icon: 'lucide:graduation-cap',
  },
  {
    name: 'Університети',
    href: '/admin/universities',
    icon: 'lucide:university',
  },
]
</script>

<template>
  <div class="flex flex-col w-full relative">
    <BaseSidebar
      variant="mobile"
      class="md:hidden"
      :is-open="isMobileSidebarOpen"
      :links="links"
      @close="closeMobileSidebar"
    />

    <motion.div
      class="fixed inset-0 z-30 bg-fiord-50/50 dark:bg-fiord-950/50 backdrop-blur-md md:hidden"
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
          <IconButton
            variant="ghost"
            icon="lucide:menu"
            class="md:hidden"
            @click="toggleMobileSidebar"
          />
        </TheNavbar>

        <div class="flex flex-1 md:pb-5 pb-24">
          <BaseSidebar
            variant="desktop"
            :links="links"
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
