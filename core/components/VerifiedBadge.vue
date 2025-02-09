<script lang="ts" setup>
interface Props {
  type: 'question' | 'test'
  mobileBadge?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mobileBadge: false,
})

const badgeText = computed(() => {
  return props.type === 'question'
    ? 'Відвовідь на це питання була верифікована адміністрацією'
    : 'Цей тест був верифікован адміністрацією'
})
</script>
<template>
  <template v-if="props.mobileBadge === false">
    <div class="hidden md:block">
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger class="cursor-default">
            <Badge
              color="success"
              class="!border-christi-500 !text-christi-800 bg-christi-200 dark:bg-christi-900 dark:!text-christi-200 dark:!border-christi-700"
              >Верифіковано</Badge
            >
          </TooltipTrigger>
          <TooltipContent>{{ badgeText }}</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    </div>
    <div class="md:hidden flex items-center justify-center">
      <Icon
        class="dark:text-christi-400 text-christi-700"
        name="lucide:badge-check"
      />
    </div>
  </template>

  <template v-else>
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger class="cursor-default">
          <Badge color="success" class="!border-christi-600 !text-christi-600"
            >Верифіковано</Badge
          >
        </TooltipTrigger>
        <TooltipContent>{{ badgeText }}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  </template>
</template>
