<script lang="ts" setup>
import { highlightText } from '~/core/utils'

interface Props {
  title: string
  answer: string
  searchQuery?: string
}

const props = withDefaults(defineProps<Props>(), {
  searchQuery: '',
})
const { $sanitizeHTML } = useNuxtApp()

const highlightedTitle = computed(() => {
  if (!props.searchQuery) return props.title
  return highlightText(props.title, props.searchQuery)
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex items-center gap-2 dark:text-white overflow-scroll"
      v-html="$sanitizeHTML(highlightedTitle)"
    />

    <div
      class="relative bg-christi-600/30 dark:bg-christi-900/50 rounded-r-lg p-2 border dark:border-christi-800 border-christi-400"
    >
      <div
        class="absolute -left-0.5 top-0 bottom-0 w-1 bg-christi-600 rounded-l-lg"
      />
      <div class="flex-col sm:flex-row flex gap-2 dark:text-white">
        <Icon
          name="lucide:circle-check-big"
          class="size-4 dark:text-christi-400 text-christi-600 flex-shrink-0 mt-1.5"
        />
        <div v-html="$sanitizeHTML(answer)" />
      </div>
    </div>
  </div>
</template>
