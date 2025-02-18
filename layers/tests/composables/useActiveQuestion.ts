import type { Question } from '@mindenit/answers-kit'

export function useActiveQuestion() {
  const activeQuestionId = ref<number | null>(null)
  const questionRefs = ref<Map<number, HTMLElement>>(new Map())

  const registerQuestionRef = (id: number, el: HTMLElement | null) => {
    if (el) {
      questionRefs.value.set(id, el)
    }
  }

  const scrollToQuestion = (questionId: number) => {
    const element = questionRefs.value.get(questionId)
    if (element) {
      const offset = 20
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const updateActiveQuestion = (questions: Question[]) => {
    if (!questions) return

    for (const question of questions) {
      const element = questionRefs.value.get(question.id)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          activeQuestionId.value = question.id
          break
        }
      }
    }
  }

  return {
    activeQuestionId,
    registerQuestionRef,
    scrollToQuestion,
    updateActiveQuestion,
  }
}
