import type { CreateFacultyValues, RequestHeaders } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: CreateFacultyValues
  headers: RequestHeaders
}

export const useCreateFaculty = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.faculties.createOne(data),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['faculties'] }),
    mutationKey: ['createFaculty'],
  })
}
