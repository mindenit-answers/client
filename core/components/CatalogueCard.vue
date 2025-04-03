<script lang="ts" setup>
interface Props {
  id: number
  brief: string
  name: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="w-full h-full block group hover:cursor-pointer focus:outline-none"
    tabindex="0"
    role="button"
  >
    <div
      class="flex flex-col h-full w-full p-5 rounded-xl border border-fiord-200 dark:border-fiord-700 bg-fiord-50 dark:bg-fiord-900 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-focus:ring-2 group-focus:ring-royal-blue-500 group-focus:outline-none gap-2"
    >
      <div class="inline-flex justify-between w-full items-center">
        <Heading
          size="small"
          class="group-hover:text-royal-blue-600 dark:group-hover:text-royal-blue-400 transition-colors duration-300"
        >
          {{ brief }}
        </Heading>
        <Badge
          class="flex items-center text-sm py-1 px-3 rounded-full"
          variant="solid"
          color="default"
        >
          ID:
          {{ id }}
        </Badge>
      </div>
      <Text size="subtitle" class="mt-auto">{{ name }}</Text>
    </div>
  </div>
</template>
