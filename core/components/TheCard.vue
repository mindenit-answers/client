<script lang="ts" setup>
import type { Component } from 'vue'

interface Props {
  as?: string | Component
  interactive?: boolean
}

withDefaults(defineProps<Props>(), {
  as: 'div',
  interactive: true,
})
</script>

<template>
  <component
    :is="as"
    :class="[
      'w-full h-full block group focus:outline-none',
      { 'hover:cursor-pointer': interactive },
    ]"
    tabindex="0"
    role="button"
    v-bind="$attrs"
  >
    <div
      :class="[
        'flex flex-col h-full w-full rounded-xl border border-border bg-fiord-50 dark:bg-fiord-900 transition-all duration-300 group-focus:outline-none gap-2',
        {
          'p-5 group-focus:ring-2 group-focus:ring-ring group-hover:shadow-lg group-hover:-translate-y-1':
            interactive,
          'p-3': !interactive,
        },
      ]"
    >
      <slot />
    </div>
  </component>
</template>
