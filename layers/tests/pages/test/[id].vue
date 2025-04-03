<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { testOptions } from '../../queries'
import { useRouteParams } from '@vueuse/router'

const testId = useRouteParams('id')
const { data, isLoading } = useQuery(testOptions(+testId.value))

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
</script>

<template>
  <div v-if="!isLoading" class="flex flex-col gap-4 relative min-h-screen">
    <TestScrollbar />

    <header
      class="flex flex-col items-center max-w-7xl mx-auto gap-2 text-center"
    >
      <Heading size="medium">
        {{ data.name }}
      </Heading>
      <VerifiedBadge v-if="data?.isVerified" type="test" mobile-badge />
      <div class="flex gap-4 justify-center">
        <Text size="subtitle">{{ data?.questions.length }} питань</Text>
        <Text size="subtitle"
          >{{ verifiedQuestions }} верифікованих питань</Text
        >
      </div>
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
        <div class="flex flex-col gap-2">
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
