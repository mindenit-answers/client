<script lang="ts" setup>
import { NuxtLink } from '#components'
import type { Course, Test } from '@mindenit/answers-kit'
import { Badge } from '@mindenit/ui'

interface Props {
  test: Test
  course: Course | null
}

defineProps<Props>()
</script>

<template>
  <TheCard :as="NuxtLink" :to="`/test/${test.id}`" draggable="false">
    <div class="flex items-center gap-4">
      <div
        class="flex-shrink-0 flex items-center justify-center size-12 rounded-lg transition-transform duration-300 group-hover:rotate-3 dark:text-white"
      >
        <Icon name="lucide:bookmark" size="28px" />
      </div>
      <Heading
        size="tiny"
        class="mb-1 group-hover:text-royal-blue-600 dark:group-hover:text-royal-blue-400 transition-colors duration-300"
      >
        {{ test.name }}
      </Heading>
    </div>

    <div
      class="flex items-center max-sm:justify-center flex-wrap gap-2 mt-auto"
    >
      <Badge
        class="flex items-center text-sm py-1 px-3 rounded-full"
        variant="solid"
        color="default"
      >
        ID:
        {{ test.id }}
      </Badge>
      <Badge
        v-if="course"
        class="flex items-center text-sm py-1 px-3 rounded-full"
        variant="solid"
        color="primary"
      >
        <Icon name="lucide:graduation-cap" class="mr-1" /> Курс:
        {{ course?.number }}
      </Badge>
      <Badge
        class="flex items-center text-sm py-1 px-3 rounded-full"
        variant="solid"
        color="primary"
      >
        <Icon name="lucide:calendar" class="mr-1" /> Рік:
        {{ test.year }}
      </Badge>
      <VerifiedBadge v-if="test.isVerified" type="test" mobile-badge />
    </div>
  </TheCard>
</template>
