import { ref, computed } from 'vue'

export const useTestsFilters = () => {
  const sortOrders = {
    asc: 'За зростанням',
    desc: 'За спаданням',
  } as const

  const sortByFields = {
    id: 'За ID',
    name: 'За назвою',
    year: 'За роком',
  } as const

  const availableYears = [
    2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
  ]

  const searchQuery = ref('')
  const selectedSortBy = ref<keyof typeof sortByFields>('id')
  const selectedOrder = ref<keyof typeof sortOrders>('desc')
  const selectedYear = ref<string>('')
  const courseId = ref<string>('')

  const areFiltersApplied = computed(() => {
    return (
      searchQuery.value !== '' ||
      selectedSortBy.value !== 'id' ||
      selectedOrder.value !== 'desc' ||
      selectedYear.value !== '' ||
      courseId.value !== ''
    )
  })

  function resetFilters() {
    searchQuery.value = ''
    selectedSortBy.value = 'id'
    selectedOrder.value = 'desc'
    selectedYear.value = ''
    courseId.value = ''
  }

  function applyFiltersToTests<
    T extends {
      id: number
      name?: string
      year?: number
      courseId?: number
    }
  >(tests: T[]): T[] {
    if (!tests?.length) return []

    return tests
  }

  return {
    sortOrders,
    sortByFields,
    availableYears,

    searchQuery,
    selectedSortBy,
    selectedOrder,
    selectedYear,
    courseId,

    areFiltersApplied,

    resetFilters,
    applyFiltersToTests,
  }
}
