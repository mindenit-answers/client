<script lang="ts" setup>
import type { Course, Test } from '@mindenit/answers-kit'
import { Badge } from '@mindenit/ui'

interface Props {
  test: Test
  course: Course | null
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/test/${test.id}`"
    class="w-full h-full block group focus:outline-none"
    draggable="false"
  >
    <div
      class="flex flex-col h-full w-full p-5 rounded-xl border border-fiord-300 dark:border-fiord-700 bg-fiord-100 dark:bg-fiord-900 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-focus:ring-2 group-focus:ring-royal-blue-500 group-focus:outline-none gap-2"
    >
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
    </div>
  </NuxtLink>
</template>
