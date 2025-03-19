<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { questionsSearchOptions } from '~/layers/questions/queries'
import { PAGE_SIZE, getPagesCount } from '~/core/utils'

const config = useRuntimeConfig()

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 500)
const currentPage = ref(1)
const animationComplete = ref(false)

const getQueryOptions = () => ({
  ...questionsSearchOptions(searchQuery),
})

const questions = useQuery(getQueryOptions())

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

watch(hasResults, (newHasResults) => {
  if (!newHasResults) {
    animationComplete.value = false
  }
})

const handleAnimationEnd = () => {
  if (hasResults.value) {
    animationComplete.value = true
  }
}

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
      :class="[
        'md:w-3/4 w-full transition-all duration-500 ease-in-out',
        hasResults ? 'mt-0' : 'mt-[25vh]',
      ]"
      @transitionend="handleAnimationEnd"
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

    <div v-if="showNoResults" class="flex flex-col items-center gap-4 max-w-lg">
      <div
        class="p-6 bg-fiord-100/30 dark:bg-fiord-800/30 border border-fiord-300 dark:border-fiord-700 rounded-lg text-fiord-700 dark:text-fiord-300 text-center w-full"
      >
        <div class="text-5xl mb-4">🔍</div>
        <div class="font-bold text-lg mb-2">Нічого не знайдено</div>
        <div>
          Спробуйте змінити пошуковий запит або використати більш загальні
          слова.
        </div>
      </div>
    </div>

    <div
      v-if="hasError"
      class="flex flex-col items-center gap-4 w-full max-w-lg"
    >
      <div
        class="p-6 bg-amaranth-100 dark:bg-amaranth-950 border border-amaranth-300 dark:border-amaranth-700 rounded-lg text-fiord-700 dark:text-fiord-300 text-center w-full"
      >
        <div class="text-5xl mb-4">⚠️</div>
        <div class="font-bold text-lg mb-2">Сталася помилка</div>
        <div>
          Не вдалося завантажити результати пошуку. Спробуйте пізніше або
          напишіть нам про це.
        </div>
        <Button class="mt-2" as="a" :href="config.public.supportUrl"
          ><Icon name="ph:telegram-logo" size="16px" /> Чат підтримки</Button
        >
      </div>
    </div>

    <div
      v-if="hasResults"
      class="flex flex-col gap-2 md:w-1/2 w-fit"
      :class="{
        'opacity-0 translate-y-4': !animationComplete,
        'opacity-100 translate-y-0 transition-all duration-500 ease-in-out': true,
      }"
    >
      <QuestionCard
        v-for="question in paginatedQuestions"
        :key="question.id"
        :question="question"
        :show-test-info="true"
      />
    </div>
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
