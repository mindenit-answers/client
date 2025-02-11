import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface CreateQuestionArgs {
  data: {
    name: string
    answer: string
    isVerified: boolean
    testId: number
  }
  headers: {
    authorization: string
  }
}

export const useCreateQuestion = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateQuestionArgs) =>
      $answersKit.questions.createOne(data),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['questions'] }),
    mutationKey: ['createQuestion'],
  })
}
