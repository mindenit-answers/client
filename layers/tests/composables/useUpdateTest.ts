import type { RequestHeaders, UpdateTestValues } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: UpdateTestValues
  headers: RequestHeaders
}

export const useUpdateTest = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.tests.updateOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tests'] }),
    mutationKey: ['updateTest'],
  })
}
