<script lang="ts" setup>
import { NuxtLink } from '#components'
import type { Course, Test } from '@mindenit/answers-kit'

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
      <Badge variant="secondary" size="big">
        ID:
        {{ test.id }}
      </Badge>
      <Badge v-if="course" size="big">
        <Icon name="lucide:graduation-cap" /> Курс:
        {{ course?.number }}
      </Badge>
      <Badge size="big">
        <Icon name="lucide:calendar" /> Рік:
        {{ test.year }}
      </Badge>
      <VerifiedBadge
        v-if="test.isVerified"
        type="test"
        mobile-badge
        size="big"
      />
    </div>
  </TheCard>
</template>
