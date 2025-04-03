<script lang="ts" setup>
interface Props {
  id: number
  isVerified: boolean
  showTestInfo?: boolean
  testId?: number
}

interface Emits {
  share: []
}

withDefaults(defineProps<Props>(), {
  showTestInfo: false,
  testId: 0,
})

defineEmits<Emits>()
</script>

<template>
  <div class="flex items-center gap-2 justify-between">
    <div class="inline-flex items-center gap-2">
      <Badge
        class="flex items-center text-sm py-1 px-3 rounded-full"
        variant="solid"
        color="default"
      >
        ID:
        {{ id }}
      </Badge>
      <VerifiedBadge v-if="isVerified" type="question" mobile-badge />
    </div>

    <div class="inline-flex gap-1">
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger as-child>
            <NuxtLink v-if="showTestInfo" :to="`/test/${testId}`" class="flex">
              <IconButton
                icon="lucide:link"
                size="sm"
                class="cursor-pointer"
                as="div"
              />
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent>Перейти до тесту</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>

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
  </div>
</template>
