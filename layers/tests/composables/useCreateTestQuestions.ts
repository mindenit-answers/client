import type {
  CreateTestQuestionsValues,
  RequestHeaders,
} from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: {
    id: number
    questions: CreateTestQuestionsValues[]
  }
  headers: RequestHeaders
}

export const useCreateTest = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.tests.createOneQuestions(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tests'] }),
    mutationKey: ['createTestQuestions'],
  })
}
