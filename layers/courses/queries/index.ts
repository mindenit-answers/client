import { queryOptions } from '@tanstack/vue-query'

const coursesOptions = () => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['courses'],
    queryFn: () => $answersKit.courses.findMany(),
  })
}

export { coursesOptions }
