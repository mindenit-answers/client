<script lang="ts" setup>
interface Props {
  type: 'question' | 'test'
  size?: 'default' | 'big'
  mobileBadge?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mobileBadge: false,
  size: 'default',
})

const badgeText = computed(() => {
  return props.type === 'question'
    ? 'Відвовідь на це питання була верифікована адміністрацією'
    : 'Цей тест був верифікован адміністрацією'
})
</script>

<template>
  <Icon
    v-if="!mobileBadge"
    class="md:hidden flex dark:text-christi-400 text-christi-700"
    name="lucide:badge-check"
  />

  <TooltipProvider
    v-if="mobileBadge || !mobileBadge"
    :class="{ 'hidden md:block': !mobileBadge }"
  >
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="success" :size="size">Верифіковано</Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ badgeText }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
