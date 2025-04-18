<script lang="ts" setup>
interface Props {
  id: number
  brief: string
  name: string
}

defineProps<Props>()
</script>

<template>
  <TheCard>
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
  </TheCard>
</template>
