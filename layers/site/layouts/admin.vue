<script setup>
import { ref } from 'vue'
import { motion } from 'motion-v'

const isMobileSidebarOpen = ref(false)

function toggleMobileSidebar() {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const variants = {
  visible: {
    opacity: 1,
    x: 0,
    display: 'flex',
    inset: 'y-0',
    left: 0,
  },
  hidden: { opacity: 0, x: -200, display: 'none' },
}

const bgVariants = {
  visible: { opacity: 1, display: 'flex' },
  hidden: { opacity: 0, display: 'none' },
}

const links = [
  {
    name: 'Головна',
    href: '/admin',
  },
  {
    name: 'Питання',
    href: '/admin/questions',
  },
  {
    name: 'Курси',
    href: '/admin/courses',
  },
  {
    name: 'Тести',
    href: '/admin/tests',
  },
  {
    name: 'Предмети',
    href: '/admin/subjects',
  },
  {
    name: 'Факультети',
    href: '/admin/faculties',
  },
  {
    name: 'Університети',
    href: '/admin/universities',
  },
]
</script>

<template>
  <div class="flex flex-col w-full relative">
    <div class="flex h-dvh">
      <motion.aside
        class="flex-col w-64 bg-white dark:bg-fiord-900 border-r border-gray-200 dark:border-fiord-700 h-full overflow-y-auto hidden md:flex z-40 fixed"
        :variants="variants"
        :initial="false"
        :animate="isMobileSidebarOpen ? 'visible' : 'hidden'"
        :transition="{
          duration: 0.3,
          ease: 'easeOut',
        }"
      >
        <div class="p-4">
          <Heading size="tiny" class="text-center">Адмін-панель</Heading>
        </div>
        <nav class="flex-1 px-2 py-4 space-y-1">
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.href"
            active-class="bg-fiord-200 dark:bg-fiord-800"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-fiord-800 transition text-black dark:text-white"
            @click="isMobileSidebarOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>
      </motion.aside>

      <motion.div
        class="fixed inset-0 z-30 bg-fiord-50/50 dark:bg-fiord-950/50 backdrop-blur-md"
        :variants="bgVariants"
        :initial="false"
        :animate="isMobileSidebarOpen ? 'visible' : 'hidden'"
        :transition="{
          duration: 0.3,
          ease: 'easeOut',
        }"
        @click="toggleMobileSidebar"
      ></motion.div>

      <div class="flex flex-col pt-5 container mx-auto px-4 h-dvh gap-5">
        <TheNavbar>
          <IconButton
            variant="ghost"
            icon="lucide:menu"
            size="sm"
            @click="toggleMobileSidebar"
          />
        </TheNavbar>
        <div class="flex flex-col md:pb-5 pb-24 gap-5">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
