import type { RequestHeaders, UpdateCourseValues } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  data: UpdateCourseValues
  headers: RequestHeaders
}

export const useUpdateCourse = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.courses.updateOne(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    mutationKey: ['updateCourse'],
  })
}
