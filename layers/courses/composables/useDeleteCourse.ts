import type { RequestHeaders } from '@mindenit/answers-kit'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

interface Args {
  id: number
  headers: RequestHeaders
}

export const useDeleteCourse = () => {
  const { $answersKit } = useNuxtApp()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Args) => $answersKit.courses.deleteOne(data),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    mutationKey: ['deleteCourse'],
  })
}
