import type { RequestHeaders, UpdateSubjectValues } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: UpdateSubjectValues
  headers: RequestHeaders
}

export const useUpdateSubject = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.subjects.updateOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
    mutationKey: ['updateSubject'],
  })
}
