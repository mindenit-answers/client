<script lang="ts" setup>
import { motion } from 'motion-v'

interface Props {
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: true,
})

const isMobile = useMediaQuery('(max-width: 768px)')
const { isMobileSidebarOpen, closeMobileSidebar } = useSidebar()

const isLocked = computed(() => isMobile.value && isMobileSidebarOpen.value)
const isVisible = computed(() => {
  if (isMobile.value) {
    return isMobileSidebarOpen.value
  }
  return props.isOpen
})

const mobileVariants = {
  visible: {
    opacity: 1,
    x: 0,
    display: 'flex',
  },
  hidden: {
    opacity: 0,
    x: -200,
    display: 'none',
  },
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

const baseClasses = computed(() => {
  const common =
    'flex-col overflow-y-auto gap-4 bg-fiord-50 dark:bg-fiord-900 border border-border w-60 p-4'

  if (isMobile.value) {
    return `${common} fixed inset-y-0 left-0 z-40 h-full`
  } else {
    return `${common} flex shrink-0 sticky top-2 rounded-xl h-[88vh]`
  }
})

watch(isLocked, (locked) => {
  if (locked) {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
  } else {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
  }
})
</script>

<template>
  <motion.aside
    :variants="mobileVariants"
    :initial="false"
    :animate="isVisible ? 'visible' : 'hidden'"
    :transition="{
      duration: 0.3,
      ease: 'easeOut',
    }"
    :class="baseClasses"
  >
    <div v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <div class="flex-1 flex flex-col gap-2">
      <slot name="content"></slot>
    </div>

    <div v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </motion.aside>

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
</template>

<style scoped>
aside {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

aside::-webkit-scrollbar {
  display: none;
}
</style>
