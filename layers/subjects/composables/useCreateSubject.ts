import type { CreateSubjectValues, RequestHeaders } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: CreateSubjectValues
  headers: RequestHeaders
}

export const useCreateSubject = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.subjects.createOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
    mutationKey: ['createSubject'],
  })
}
