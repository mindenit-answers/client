<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/core/utils'

const textVariants = cva(
  'selection:bg-royal-blue-200 dark:selection:bg-royal-blue-900',
  {
    variants: {
      size: {
        lead: 'text-xl font-normal leading-7 dark:text-white',
        large: 'text-lg font-semibold leading-7 dark:text-white',
        paragraph: 'font-regular text-base leading-7 dark:text-white',
        small: 'text-sm font-medium leading-[14px] dark:text-white',
        subtitle:
          'text-sm font-medium leading-[14px] text-fiord-500 dark:text-fiord-400',
      },
    },
    defaultVariants: {
      size: 'paragraph',
    },
  }
)

type TextVariants = VariantProps<typeof textVariants>

interface TextProps {
  size: TextVariants['size']
  class?: HTMLAttributes['class']
}

const props = defineProps<TextProps>()
</script>

<template>
  <p :class="cn(textVariants({ size }), props.class)"><slot /></p>
</template>
