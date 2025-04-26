import type { SortingOptions } from '@mindenit/answers-kit'
import { queryOptions } from '@tanstack/vue-query'

interface SubjectsOptionsArgs {
  order: Ref<SortingOptions['order']>
  sortBy: Ref<SortingOptions['sortBy']>
}

const subjectOptions = (id: number) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['subject', id],
    queryFn: () => $answersKit.subjects.findOne(id),
  })
}

const subjectsOptions = (args?: SubjectsOptionsArgs) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['subjects', args?.sortBy.value, args?.order.value],
    queryFn: () =>
      $answersKit.subjects.findMany({
        sorting: {
          order: args?.order.value,
          sortBy: args?.sortBy.value,
        },
      }),
  })
}

export { subjectsOptions, subjectOptions }
