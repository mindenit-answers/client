<script lang="ts" setup>
interface Props {
  id: number
  isVerified: boolean
}

interface Emits {
  share: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="flex items-center gap-2 justify-between">
    <div class="inline-flex items-center gap-2">
      <Text
        size="subtitle"
        class="dark:bg-fiord-800 bg-fiord-100 p-1.5 rounded-lg"
        >#{{ id }}</Text
      >
      <VerifiedBadge v-if="isVerified" type="question" />
    </div>
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger as-child>
          <IconButton
            icon="lucide:share-2"
            size="sm"
            variant="ghost"
            class="cursor-pointer"
            @click="$emit('share')"
          />
        </TooltipTrigger>
        <TooltipContent>Поділитись</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  </div>
</template>
