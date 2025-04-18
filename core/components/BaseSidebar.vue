<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  links: Array<{ name: string; href: string; icon: string }>
  variant: 'desktop' | 'mobile'
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['close', 'linkClick'])

const handleLinkClick = (link: unknown) => {
  emit('linkClick', link)
  if (props.variant === 'mobile') {
    emit('close')
  }
}

const baseClasses =
  'flex-col w-64 bg-white dark:bg-fiord-900 border border-gray-200 dark:border-fiord-700 h-full overflow-y-auto'

const variantClasses = computed(() => {
  return props.variant === 'mobile'
    ? 'fixed inset-y-0 left-0 z-40 border-r'
    : 'rounded-xl shrink-0'
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
</script>

<template>
  <div>
    <template v-if="variant === 'mobile'">
      <motion.aside
        :class="[baseClasses, variantClasses]"
        :variants="mobileVariants"
        :initial="false"
        :animate="isOpen ? 'visible' : 'hidden'"
        :transition="{
          duration: 0.3,
          ease: 'easeOut',
        }"
      >
        <div class="p-4">
          <slot name="header">
            <Heading size="tiny" class="text-center">Адмін-панель</Heading>
          </slot>
        </div>
        <nav class="flex-1 p-4 space-y-1">
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.href"
            active-class="bg-fiord-200 dark:bg-fiord-800"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-fiord-800 transition text-black dark:text-white gap-3"
            @click="handleLinkClick(link)"
          >
            <Icon :name="link.icon" size="18px" />
            {{ link.name }}
          </NuxtLink>
        </nav>
        <slot name="footer"></slot>
      </motion.aside>
    </template>

    <template v-else>
      <aside :class="[baseClasses, variantClasses]">
        <div v-if="$slots.header" class="p-4">
          <slot name="header"></slot>
        </div>
        <nav class="flex-1 p-4 space-y-1">
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.href"
            active-class="bg-fiord-200 dark:bg-fiord-800"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-fiord-800 transition text-black dark:text-white gap-3"
            @click="handleLinkClick(link)"
          >
            <Icon :name="link.icon" size="18px" />
            {{ link.name }}
          </NuxtLink>
        </nav>
        <slot name="footer"></slot>
      </aside>
    </template>
  </div>
</template>
