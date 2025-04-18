<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { questionsSearchOptions } from '~/layers/questions/queries'
import { getPagesCount, getCourseById } from '~/core/utils'
import { PAGE_SIZE } from '~/core/constants'
import { motion } from 'motion-v'
import { testsOptions } from '~/layers/tests/queries'
import { coursesOptions } from '~/layers/courses/queries'

useSeoMeta({
  title: 'Пошук',
  description:
    'Пошук питань на платформі Mindenit Answers. На цій сторінці ви можете знайти питання, які вас цікавлять, та отримати на них відповіді.',
})

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 500)
const currentPage = ref(1)

const questions = useQuery(questionsSearchOptions(searchQuery))
const { data: tests } = useQuery(
  testsOptions({
    options: {
      limit: ref(3),
    },
  })
)
const { data: courses } = useQuery(coursesOptions())

watch(
  debouncedQuery,
  () => {
    questions.refetch()
    currentPage.value = 1
  },
  { immediate: false }
)

const hasResults = computed(
  () =>
    debouncedQuery.value.length > 0 &&
    questions.data.value &&
    questions.data.value.length > 0
)

const hasError = computed(() => questions.error.value)

const showNoResults = computed(
  () =>
    debouncedQuery.value.length > 0 &&
    questions.data.value?.length === 0 &&
    !questions.isFetching.value
)

const totalPages = computed(() =>
  questions.data.value ? getPagesCount(questions.data.value.length) : 0
)

const paginatedQuestions = computed(() => {
  if (!questions.data.value) return []

  const startIndex = (currentPage.value - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  return questions.data.value.slice(startIndex, endIndex)
})
</script>

<template>
  <div class="flex flex-col items-center min-h-[80vh] relative gap-8">
    <div
      class="md:w-3/4 w-full transition-all"
      :class="[hasResults ? 'mt-0' : 'mt-[25vh]']"
    >
      <div
        class="backdrop-blur-sm bg-fiord-100/20 dark:bg-fiord-700/5 border border-fiord-500/10 rounded-xl p-2"
      >
        <div
          class="flex flex-col items-center justify-center gap-4 dark:bg-fiord-900 bg-fiord-50 p-8 rounded-lg text-center"
        >
          <Heading size="medium">Яке питання ви шукаєте?</Heading>
          <SearchField
            v-model="searchQuery"
            placeholder="Введіть питання для пошуку..."
            autofocus
          />
        </div>
      </div>
    </div>

    <AnimatePresence v-if="showNoResults">
      <StatusCard
        type="not-found"
        message="Спробуйте змінити пошуковий запит або використати більш загальні
      слова."
      />
    </AnimatePresence>

    <AnimatePresence v-else-if="hasError">
      <StatusCard
        type="error"
        message="Не вдалося завантажити результати пошуку. Спробуйте пізніше або напишіть
      нам про це."
        show-support
      />
    </AnimatePresence>

    <AnimatePresence v-else-if="!hasResults && !hasError && !showNoResults">
      <motion.div
        class="flex flex-col gap-4 w-full items-center mt-[13vh]"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 20 }"
      >
        <Heading size="medium">Нове 🔥</Heading>
        <div class="grid grid-cols-3 max-md:grid-cols-1 gap-2">
          <TestCard
            v-for="test in tests?.data"
            :key="test.id"
            :test
            :course="getCourseById(courses!, test.courseId)"
          />
        </div>
      </motion.div>
    </AnimatePresence>

    <AnimatePresence v-else-if="hasResults">
      <motion.div
        class="flex flex-col gap-2 md:w-1/2 w-fit"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 20 }"
      >
        <QuestionCard
          v-for="question in paginatedQuestions"
          :key="question.id"
          :question="question"
          :show-test-info="true"
          :search-query="debouncedQuery"
        />
      </motion.div>
    </AnimatePresence>

    <div
      v-if="totalPages > 1"
      class="inline-flex w-full items-center justify-center"
    >
      <Pagination
        v-model:page="currentPage"
        :items-per-page="PAGE_SIZE"
        :total="questions.data.value?.length"
      />
    </div>
  </div>
</template>
