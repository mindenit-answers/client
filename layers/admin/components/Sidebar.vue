<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  variant: 'desktop' | 'mobile'
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'linkClick'])

const { logout } = useAuth()

const handleLinkClick = (link: unknown) => {
  emit('linkClick', link)
  if (props.variant === 'mobile') {
    emit('close')
  }
}

const baseClasses = 'flex-col w-64 overflow-y-auto gap-4'

const variantClasses = computed(() => {
  return props.variant === 'mobile'
    ? 'fixed inset-y-0 left-0 z-40 border-r h-full bg-fiord-50 dark:bg-fiord-900 border border-border p-4'
    : 'flex shrink-0 sticky top-5 h-fit'
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
        <slot name="header">
          <Heading size="tiny" class="text-center">Адмін-панель</Heading>
        </slot>
        <nav class="flex-1 space-y-1">
          <AdminSidebarLink
            v-for="link in links"
            :key="link.name"
            :link="link"
            @click="handleLinkClick"
          />
        </nav>
        <slot name="footer">
          <Button class="w-full" @click="logout"> Вийти </Button>
        </slot>
      </motion.aside>
    </template>

    <template v-else>
      <aside :class="[baseClasses, variantClasses]">
        <div v-if="$slots.header">
          <slot name="header"></slot>
        </div>
        <nav class="flex-1 space-y-1">
          <AdminSidebarLink
            v-for="link in links"
            :key="link.name"
            :link="link"
            @click="handleLinkClick"
          />
          <slot name="footer">
            <Button class="mt-8 w-full" @click="logout"> Вийти </Button>
          </slot>
        </nav>
      </aside>
    </template>
  </div>
</template>
