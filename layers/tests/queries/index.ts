import type { SortingOptions } from '@mindenit/answers-kit'
import { queryOptions } from '@tanstack/vue-query'

interface Sorting {
  order: Ref<SortingOptions['order']>
}

interface TestsOptionsArgs extends Sorting {
  sortBy: Ref<SortingOptions<'year'>['sortBy']>
}

interface TestQuestionsOptionsArgs extends Sorting {
  sortBy: Ref<SortingOptions['sortBy']>
}

interface TestsSearchOptionsArgs {
  options?: {
    offset?: Ref<number>
    limit?: Ref<number>
    name?: Ref<string>
    isVerified?: Ref<boolean>
    subjectId?: Ref<number>
    courseId?: Ref<number>
    year?: Ref<number>
  }
  sorting?: TestsOptionsArgs
}

const testsOptions = (args?: TestsSearchOptionsArgs) => {
  const { $answersKit } = useNuxtApp()

  return queryOptions({
    queryKey: [
      'tests',
      args?.options?.subjectId?.value,
      args?.options?.name?.value,
      args?.options?.year?.value,
      args?.options?.courseId?.value,
      args?.sorting?.sortBy.value,
      args?.sorting?.order.value,
    ],
    queryFn: () =>
      $answersKit.tests.findMany({
        options: {
          offset: args?.options?.offset?.value,
          limit: args?.options?.limit?.value,
          name: args?.options?.name?.value,
          isVerified: args?.options?.isVerified?.value,
          subjectId: args?.options?.subjectId?.value,
          courseId: args?.options?.courseId?.value,
          year: args?.options?.year?.value,
        },
        sorting: {
          sortBy: args?.sorting?.sortBy.value,
          order: args?.sorting?.order.value,
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

const testQuestionsOptions = (
  id: number,
  sorting?: TestQuestionsOptionsArgs
) => {
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
