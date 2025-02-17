import type { RequestHeaders, UpdateFacultyValues } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: UpdateFacultyValues
  headers: RequestHeaders
}

export const useUpdateFaculty = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.faculties.updateOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faculties'] }),
    mutationKey: ['updateFaculty'],
  })
}
