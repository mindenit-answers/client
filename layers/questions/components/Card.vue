<script lang="ts" setup>
import type { Question } from '@mindenit/answers-kit'

interface Props {
  question: Omit<Question, 'publishedAt' | 'createdAt' | 'updatedAt'>
  showTestInfo?: boolean
  searchQuery?: string
}

const { shareUrl } = useShareQuestion()
const { markdown } = useMarkdown()
const config = useRuntimeConfig()

const props = withDefaults(defineProps<Props>(), {
  showTestInfo: false,
  searchQuery: '',
})

const questionData = shallowRef(props.question)

const titleParsed = computed(() => {
  const title = props.question.name.replace(/\n/g, '<br>')
  return markdown.render(title)
})

const answerParsed = computed(() => {
  const answer = props.question.answer.replace(/\n/g, '<br>')
  return markdown.render(answer)
})

const questionLink = computed(
  () =>
    `${config.public.baseUrl}/test/${questionData.value.testId}#${questionData.value.id}`
)

const copyQuestionLink = () => shareUrl(questionLink.value)
</script>

<template>
  <TheCard v-memo="[questionData.id]" :interactive="false">
    <QuestionHeader
      v-if="questionData.id"
      :id="props.question.id"
      :is-verified="questionData.isVerified"
      :test-id="questionData.testId"
      :show-test-info
      @share="copyQuestionLink"
    />

    <QuestionContent
      :title="titleParsed"
      :answer="answerParsed"
      :search-query="props.searchQuery"
    />
  </TheCard>
</template>
