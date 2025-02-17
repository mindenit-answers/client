import type { RequestHeaders } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  id: number
  headers: RequestHeaders
}

export const useDeleteSubject = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.subjects.deleteOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
    mutationKey: ['deleteSubject'],
  })
}
