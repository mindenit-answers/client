import type {
  CreateUniversityValues,
  RequestHeaders,
} from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: CreateUniversityValues
  headers: RequestHeaders
}

export const useCreateUniversity = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.universities.createOne(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['universities'] }),
    mutationKey: ['createUniversity'],
  })
}
