import type { SortingOptions } from '@mindenit/answers-kit'
import { queryOptions } from '@tanstack/vue-query'

interface FacultiesOptionsArgs {
  order: Ref<SortingOptions['order']>
  sortBy: Ref<SortingOptions['sortBy']>
}

const facultyOptions = (id: number) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['faculty', id],
    queryFn: () => $answersKit.faculties.findOne(id),
  })
}

const facultiesOptions = (args?: FacultiesOptionsArgs) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['faculties', args?.sortBy.value, args?.order.value],
    queryFn: () =>
      $answersKit.faculties.findMany({
        sorting: {
          order: args?.order.value,
          sortBy: args?.sortBy.value,
        },
      }),
  })
}

const facultySubjectsOptions = (id: Ref<number>) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['facultySubjects', id.value],
    queryFn: () => $answersKit.faculties.findOneSubjects(id.value),
    enabled: !!id.value && id.value > 0,
  })
}

export { facultiesOptions, facultyOptions, facultySubjectsOptions }
