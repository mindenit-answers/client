<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { testOptions } from '../../queries'
import { useRouteParams } from '@vueuse/router'
import { showError } from '#app'

const { enableSidebar } = useSidebar()
enableSidebar()
const testId = useRouteParams('id')
const route = useRoute()

const { data, isLoading, isError, error } = useQuery(
  testOptions(+testId!.value!),
)

const pageTitle = computed(() => {
  return data.value ? `Тест ${data.value.name} – відповіді ХНУРЕ` : 'Тест'
})

const pageDescription = computed(() => {
  return data.value
    ? `Правильні відповіді на тест ${data.value.name}, ${data.value.subject.name}`
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

const { markdown } = useMarkdown()
const { $sanitizeHTML } = useNuxtApp()

const { searchQuery, filteredQuestions } = useQuestionsSearch(
  computed(() => data.value?.questions),
)

const verifiedQuestions = computed(
  () => data.value?.questions.filter((q) => q.isVerified).length || 0,
)

const handleScrollToAnchor = async () => {
  if (route.hash && data.value && !isLoading.value) {
    const questionIdFromHash = parseInt(route.hash.substring(1), 10)
    if (!isNaN(questionIdFromHash)) {
      await nextTick()
      scrollToQuestion(questionIdFromHash)
    }
  }
}

const formatQuestionForSidebar = (questionName: string) => {
  return $sanitizeHTML(markdown.render(questionName))
}

watch(isLoading, (newIsLoading, oldIsLoading) => {
  if (oldIsLoading === true && newIsLoading === false) {
    handleScrollToAnchor()
  }
})

onMounted(() => {
  if (!isLoading.value && route.hash) {
    handleScrollToAnchor()
  }
})

watch(
  useWindowScroll().y,
  () => data.value?.questions && updateActiveQuestion(data.value.questions),
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
      <VerifiedBadge v-if="data?.isVerified" mobile-badge />
      <Text size="subtitle">
        {{ verifiedQuestions }} / {{ data?.questions.length }} верифікованих
        питань</Text
      >
    </header>

    <div class="relative w-full items-center">
      <Input
        id="search"
        v-model="searchQuery"
        type="text"
        placeholder="Введіть питання або відповідь..."
        class="pl-10"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon name="lucide:search" class="size-6 text-muted-foreground" />
      </span>
    </div>

    <div class="flex gap-4 flex-1 w-full relative">
      <TheSidebar>
        <template #content>
          <SidebarLink
            v-for="(question, index) in filteredQuestions"
            :key="question.id"
            :index
            :is-question="true"
            :question-id="question.id"
            :active="activeQuestionId === question.id"
            :html="formatQuestionForSidebar(question.name)"
            @click="scrollToQuestion"
          />
        </template>
      </TheSidebar>

      <main class="flex-1 min-w-0">
        <div class="flex flex-col gap-4">
          <QuestionCard
            v-for="(question, index) in filteredQuestions"
            :key="question.id"
            :ref="
              (el) =>
                registerQuestionRef(
                  question.id,
                  el && '$el' in el ? el.$el : el,
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
