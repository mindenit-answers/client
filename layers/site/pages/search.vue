<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { questionsSearchOptions } from '~/layers/questions/queries'
import { getPagesCount, getCourseById } from '~/core/utils'
import { PAGE_SIZE } from '~/core/constants'
import { motion } from 'motion-v'
import { testsOptions } from '~/layers/tests/queries'
import { coursesOptions } from '~/layers/courses/queries'

useSeoMeta({
  title: 'Пошук відповідей на тести',
  description:
    'Знаходьте питання і відповіді до тестів ХНУРЕ та інших університетів України на платформі Mindenit Answers. Швидкий пошук потрібної інформації за ключовими словами та предметами.',
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

          <div class="relative w-full items-center">
            <Input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Введіть питання для пошуку..."
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <Icon name="lucide:search" class="size-6 text-muted-foreground" />
            </span>
          </div>
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
        class="flex flex-col gap-4 w-full items-center mt-[13vh] max-sm:mt-[8vh]"
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
        class="flex flex-col gap-2 md:w-1/2 w-full"
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
        v-slot="{ page }"
        :items-per-page="PAGE_SIZE"
        :total="questions.data.value?.length"
        :sibling-count="1"
        show-edges
        :default-page="1"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-9 h-9 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
