<script lang="ts" setup>
import type { Course, Subject, Test } from '@mindenit/answers-kit'

interface Props {
  // TODO: Change types here after updating the @answers-kit
  test: Test & { name: string }
  courses: Course[]
  subjects: Subject[]
}

const props = defineProps<Props>()

const course = computed(() =>
  props.courses.find((c) => c.id === props.test.courseId)
)

const subject = computed(() =>
  props.subjects.find((s) => s.id === props.test.subjectId)
)
</script>

<template>
  <NuxtLink
    :to="`/test/${test.id}`"
    class="block w-full duration-200 group focus:outline-none focus:ring-3 focus:ring-royal-blue-500/30 rounded-xl relative overflow-hidden border hover:bg-fiord-50 dark:hover:bg-fiord-900 border-fiord-300 dark:border-fiord-800 transition"
    draggable="false"
  >
    <div class="p-5">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-semibold text-fiord-900 dark:text-white">
              {{ test.name }}
            </h3>
          </div>
        </div>

        <VerifiedBadge v-if="test.isVerified" type="test" />
      </div>

      <div class="flex flex-wrap gap-4">
        <Text size="subtitle"> ID: {{ test.id }} </Text>

        <Text size="subtitle" class="flex items-center gap-2">
          <Icon name="lucide:graduation-cap" class="size-4" />
          Курс {{ course?.number }}
        </Text>

        <Text size="subtitle" class="flex items-center gap-2">
          <Icon name="lucide:calendar" class="size-4" />
          {{ test.year }}
        </Text>

        <Text size="subtitle" class="flex items-center gap-2">
          <Icon name="lucide:book" class="size-4" />
          {{ subject?.brief }}
        </Text>
      </div>
    </div>

    <div
      class="px-5 py-3 border-t flex justify-between items-center transition border-top border-inherit"
    >
      <div
        class="flex items-center gap-1 text-royal-blue-600 dark:text-royal-blue-400"
      >
        <span class="text-sm leading-0 font-medium">Перейти до тесту</span>
        <Icon
          name="lucide:arrow-right"
          class="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </div>
  </NuxtLink>
</template>
