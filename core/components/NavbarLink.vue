<script lang="ts" setup>
interface Props {
  to: string
  icon: string
  title: string
}

const props = defineProps<Props>()

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

<template>
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <NuxtLink :to="to" :title="title" :aria-label="title">
          <div
            :class="{ 'bg-fiord-200 dark:bg-fiord-800 rounded-lg': isActive }"
          >
            <IconButton variant="ghost" :icon="icon" />
          </div>
        </NuxtLink>
      </TooltipTrigger>
      <TooltipContent>{{ title }}</TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
</template>
