import type { CreateTestValues, RequestHeaders } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: CreateTestValues
  headers: RequestHeaders
}

export const useCreateTest = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.tests.createOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tests'] }),
    mutationKey: ['createTest'],
  })
}
