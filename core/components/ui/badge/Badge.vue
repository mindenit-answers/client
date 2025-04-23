<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { cn } from '@/core/utils'
import { Primitive } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { type BadgeVariants, badgeVariants } from '.'

const props = defineProps<
  PrimitiveProps & {
    variant?: BadgeVariants['variant']
    size?: BadgeVariants['size']
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant, size }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
