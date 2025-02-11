import type { SortingOptions } from '@mindenit/answers-kit'
import { queryOptions } from '@tanstack/vue-query'

interface QuestionsOptionsArgs {
  order: Ref<SortingOptions['order']>
  sortBy: Ref<SortingOptions['sortBy']>
}

const questionsOptions = (args: QuestionsOptionsArgs) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['questions', args.sortBy.value, args.order.value],
    queryFn: () =>
      $answersKit.questions.findMany({
        sorting: {
          order: args.order.value,
          sortBy: args.sortBy.value,
        },
      }),
  })
}

const questionsSearchOptions = (query: string) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['questions', 'search', query],
    queryFn: () => $answersKit.questions.findManySearch({ query }),
  })
}

export { questionsOptions, questionsSearchOptions }
