import type { SortingOptions } from '@mindenit/answers-kit'
import { queryOptions } from '@tanstack/vue-query'

interface TestsOptionsArgs {
  order: Ref<SortingOptions['order']>
  sortBy: Ref<SortingOptions['sortBy']>
}

interface TestsSearchOptionsArgs {
  options?: {
    offset: number
    limit: number
    name: string
    isVerified: boolean
    subjectId: number
    courseId: number
    year: number
  }
  sorting?: TestsOptionsArgs
}

const testsOptions = (args: TestsSearchOptionsArgs) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['tests', args.sorting?.sortBy.value, args.sorting?.order.value],
    queryFn: () =>
      $answersKit.tests.findMany({
        options: args.options,
        sorting: {
          sortBy: args.sorting?.sortBy.value,
          order: args.sorting?.order.value,
        },
      }),
  })
}

const testOptions = (id: number) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: ['test', id],
    queryFn: () => $answersKit.tests.findOne(id),
  })
}

const testQuestionsOptions = (id: number, sorting?: TestsOptionsArgs) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: [
      'testQuestions',
      id,
      sorting?.sortBy.value,
      sorting?.order.value,
    ],
    queryFn: () =>
      $answersKit.tests.findOneQuestions({
        id,
        sorting: {
          sortBy: sorting?.sortBy.value,
          order: sorting?.order.value,
        },
      }),
  })
}

export { testsOptions, testOptions, testQuestionsOptions }
