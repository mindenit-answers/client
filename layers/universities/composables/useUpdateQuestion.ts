import type {
  RequestHeaders,
  UpdateUniversityValues,
} from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: UpdateUniversityValues
  headers: RequestHeaders
}

export const useUpdateUniversity = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.universities.updateOne(data),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['universities'] }),
    mutationKey: ['updateUniversity'],
  })
}
