import type { Question } from '@mindenit/answers-kit'
import { ref, computed } from 'vue'

export function useQuestionsSearch(questions: Ref<Question[] | undefined>) {
  const searchQuery = ref('')

  const filteredQuestions = computed(() => {
    if (!questions.value) return []
    if (!searchQuery.value) return questions.value

    const query = searchQuery.value.toLowerCase()
    return questions.value.filter(
      (question) =>
        question.name.toLowerCase().includes(query) ||
        question.answer.toLowerCase().includes(query)
    )
  })

  return {
    searchQuery,
    filteredQuestions,
  }
}
