import type { RequestHeaders } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  id: number
  headers: RequestHeaders
}

export const useDeleteUniversity = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.universities.deleteOne(data),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['universities'] }),
    mutationKey: ['deleteUniversity'],
  })
}
