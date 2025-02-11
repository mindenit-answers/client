import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface UpdateQuestionArgs {
  data: {
    id: number
    name: string
    answer: string
    isVerified: boolean
    testId: number
  }
  headers: {
    authorization: string
  }
}

export const useUpdateQuestion = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateQuestionArgs) =>
      $answersKit.questions.updateOne(data),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['questions'] }),
    mutationKey: ['updateQuestion'],
  })
}
