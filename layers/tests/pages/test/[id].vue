<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { testOptions } from '../../queries'
import { useRouteParams } from '@vueuse/router'
import { showError } from '#app'

const testId = useRouteParams('id')
const { data, isLoading, isError, error } = useQuery(
  testOptions(+testId!.value!)
)

const pageTitle = computed(() => {
  return data.value ? `Тест ${data.value.name}` : 'Тест'
})

const pageDescription = computed(() => {
  return data.value
    ? `Тест ${data.value.name} - відповіді на питання`
    : 'Тест - відповіді на питання'
})

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
})

const {
  activeQuestionId,
  registerQuestionRef,
  scrollToQuestion,
  updateActiveQuestion,
} = useActiveQuestion()

const { searchQuery, filteredQuestions } = useQuestionsSearch(
  computed(() => data.value?.questions)
)

const verifiedQuestions = computed(
  () => data.value?.questions.filter((q) => q.isVerified).length || 0
)

watch(
  useWindowScroll().y,
  () => data.value?.questions && updateActiveQuestion(data.value.questions)
)

watch([isError, error], () => {
  console.log('isError', isError.value)
  console.log(error.value)
  if (isError.value === true) {
    showError({
      statusCode: 404,
      message:
        'Тест за вказаним ID не знайдено. Спробуйте ще раз або перевірте правильність введеного ID.',
    })
  }
})
</script>

<template>
  <div v-if="!isLoading" class="flex flex-col gap-4 relative min-h-screen">
    <TestScrollbar />

    <header
      class="flex flex-col items-center max-w-7xl mx-auto gap-2 text-center"
    >
      <Heading size="medium">
        {{ data!.name }}
      </Heading>
      <VerifiedBadge v-if="data?.isVerified" type="test" mobile-badge />
      <Text size="subtitle">
        {{ verifiedQuestions }} / {{ data?.questions.length }} верифікованих
        питань</Text
      >
    </header>

    <SearchField
      v-model="searchQuery"
      placeholder="Введіть питання або відповідь..."
    />

    <div class="flex gap-4 flex-1 w-full relative">
      <TestSidebar
        :questions="filteredQuestions"
        :active-question-id="activeQuestionId"
        @question-click="scrollToQuestion"
      />

      <main class="flex-1 min-w-0">
        <div class="flex flex-col gap-4">
          <QuestionCard
            v-for="(question, index) in filteredQuestions"
            :key="question.id"
            :ref="
              (el) =>
                registerQuestionRef(
                  question.id,
                  el && '$el' in el ? el.$el : el
                )
            "
            :question="question"
            :data-question-index="index + 1"
          />
        </div>
      </main>
    </div>
  </div>
  <TheSpinner v-else />
</template>
