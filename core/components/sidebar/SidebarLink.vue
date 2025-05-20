<script lang="ts" setup>
interface Props {
  active?: boolean
  to?: string
  icon?: string
  isQuestion?: boolean
  index?: number
  variant?: 'default' | 'subtle'
  questionId?: number
  html?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  to: undefined,
  icon: undefined,
  isQuestion: false,
  index: -1,
  variant: 'default',
  questionId: undefined,
  html: undefined,
})

const emit = defineEmits(['click'])
const { closeMobileSidebar } = useSidebar()
const { $sanitizeHTML } = useNuxtApp()

const handleClick = () => {
  if (props.isQuestion && props.questionId !== undefined) {
    emit('click', props.questionId)
  } else {
    emit('click')
  }
  closeMobileSidebar()
}

const isLink = computed(() => {
  return !!props.to
})

const baseClasses = computed(() => [
  'flex items-center px-4 py-2 max-h-14 rounded-lg text-sm focus:outline-none truncate gap-2 group hover:translate-x-0.5',
  'transition-all duration-200 ease-in-out',
  isLink.value ? '' : 'w-full text-left cursor-pointer relative',
])

const stateClasses = computed(() => {
  if (props.active) {
    return props.variant === 'default'
      ? 'bg-gradient-to-r dark:from-royal-blue-500/100 from-royal-blue-300/100 to-transparent'
      : 'bg-secondary/50 font-medium'
  }

  return (
    'before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 ' +
    (props.variant === 'default'
      ? 'before:bg-gradient-to-r dark:before:from-fiord-700 before:from-fiord-300 before:to-transparent'
      : 'before:bg-secondary/30 before:hover:text-foreground text-muted-foreground hover:text-foreground') +
    ' before:transition-opacity before:duration-200 before:rounded-lg before:-z-10'
  )
})

const sanitizedHtml = computed(() => {
  if (!props.html) {
    return
  }
  const sanitizeHTML = $sanitizeHTML(props.html)
  return sanitizeHTML.replace(/<br\s*\/?>/gi, ' ')
})
</script>

<template>
  <NuxtLink
    v-if="isLink"
    :to
    :class="[...baseClasses, stateClasses]"
    @click="handleClick"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="transition-transform duration-200 !size-4"
    />
    <span v-if="isQuestion && index >= 0" class="mr-2 text-muted-foreground">
      {{ index + 1 }}.
    </span>
    <span v-if="html" v-html="sanitizedHtml"></span>
    <slot v-else></slot>
  </NuxtLink>

  <button v-else :class="[...baseClasses, stateClasses]" @click="handleClick">
    <Icon
      v-if="icon"
      :name="icon"
      class="transition-transform duration-200 !size-4"
    />
    <span v-if="isQuestion && index >= 0" class="mr-2 text-muted-foreground">
      {{ index + 1 }}.
    </span>
    <span
      v-if="html"
      class="flex items-center overflow-hidden text-ellipsis whitespace-nowrap gap-2"
      v-html="sanitizedHtml"
    ></span>
    <slot v-else></slot>
  </button>
</template>
