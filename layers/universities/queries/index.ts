import type { SortingOptions } from '@mindenit/answers-kit'
import { queryOptions } from '@tanstack/vue-query'

interface UniversitiesOptionsArgs {
  order: Ref<SortingOptions['order']>
  sortBy: Ref<SortingOptions['sortBy']>
}

const universityOptions = (id: number) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['university', id],
    queryFn: () => $answersKit.universities.findOne(id),
  })
}

const universitiesOptions = (args?: UniversitiesOptionsArgs) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['universities', args?.sortBy.value, args?.order.value],
    queryFn: () =>
      $answersKit.universities.findMany({
        sorting: {
          order: args?.order.value,
          sortBy: args?.sortBy.value,
        },
      }),
  })
}

const universityFacultiesOptions = (id: Ref<number>) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['universityFaculties', id.value],
    queryFn: () => $answersKit.universities.findOneFaculties({ id: id.value }),
  })
}

export { universitiesOptions, universityFacultiesOptions, universityOptions }
