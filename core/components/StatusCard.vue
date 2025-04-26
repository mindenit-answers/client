<script lang="ts" setup>
import { motion } from 'motion-v'

interface Props {
  type: 'error' | 'not-found'
  title?: string
  message: string
  showSupport?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSupport: false,
})

const config = useRuntimeConfig()

const typeConfig = {
  error: {
    emoji: '⚠️',
    bgClass: 'bg-amaranth-100 dark:bg-amaranth-950',
    borderClass: 'border-destructive',
    defaultTitle: 'Сталася помилка',
  },
  'not-found': {
    emoji: '🔍',
    bgClass: 'bg-fiord-100 dark:bg-fiord-900',
    borderClass: 'border-border',
    defaultTitle: 'Нічого не знайдено',
  },
}

const currentConfig = computed(() => typeConfig[props.type])

const displayTitle = computed(
  () => props.title ?? currentConfig.value.defaultTitle
)
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 20 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :exit="{ opacity: 0, y: 20 }"
    class="flex flex-col items-center gap-4 w-full max-w-lg"
  >
    <div
      :class="[
        'p-6 rounded-xl text-center w-full border transition-all duration-300',
        currentConfig.bgClass,
        currentConfig.borderClass,
      ]"
    >
      <div class="text-5xl mb-4 select-none">
        {{ currentConfig.emoji }}
      </div>

      <Heading size="tiny" class="mb-2">{{ displayTitle }}</Heading>

      <Text size="paragraph">
        {{ message }}
      </Text>

      <div
        v-if="$slots || showSupport"
        class="mt-4 flex flex-wrap gap-2 justify-center"
      >
        <slot />
        <Button v-if="showSupport" as="a" :href="config.public.supportUrl">
          <Icon name="ph:telegram-logo" size="16px" class="mr-1" /> Чат
          підтримки
        </Button>
      </div>
    </div>
  </motion.div>
</template>
