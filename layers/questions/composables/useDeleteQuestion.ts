import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface DeleteQuestionArgs {
  id: number
  headers: {
    authorization: string
  }
}

export const useDeleteQuestion = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DeleteQuestionArgs) =>
      $answersKit.questions.deleteOne(data),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['questions'] }),
    mutationKey: ['deleteQuestion'],
  })
}
