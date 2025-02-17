import type { CreateCourseValues, RequestHeaders } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: CreateCourseValues
  headers: RequestHeaders
}

export const useCreateCourse = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.courses.createOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    mutationKey: ['createCourse'],
  })
}
