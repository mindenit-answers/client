import type {
  RequestHeaders,
  UpdateQuestionValues,
} from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: UpdateQuestionValues
  headers: RequestHeaders
}

export const useUpdateQuestion = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.questions.updateOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questions'] }),
    mutationKey: ['updateQuestion'],
  })
}
