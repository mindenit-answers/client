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
      <Badge variant="secondary">
        ID:
        {{ id }}
      </Badge>
      <VerifiedBadge v-if="isVerified" type="question" mobile-badge />
    </div>

    <div class="inline-flex gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button as-child>
              <NuxtLink
                v-if="showTestInfo"
                :to="`/test/${testId}`"
                class="flex"
              >
                <Icon name="lucide:link" size="16px" />
              </NuxtLink>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Перейти до тесту</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" @click="$emit('share')">
              <Icon name="lucide:share-2" size="16px" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Поділитись</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
