import type {
  CreateQuestionValues,
  RequestHeaders,
} from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: CreateQuestionValues
  headers: RequestHeaders
}

export const useCreateQuestion = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.questions.createOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questions'] }),
    mutationKey: ['createQuestion'],
  })
}
