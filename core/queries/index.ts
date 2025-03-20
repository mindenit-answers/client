import { queryOptions } from '@tanstack/vue-query'

const statisticsOptions = () => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['statistics'],
    queryFn: () => $answersKit.statistics.get(),
  })
}

export { statisticsOptions }
