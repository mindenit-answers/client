<script lang="ts" setup>
import {
  universitiesOptions,
  universityFacultiesOptions,
} from '@/layers/universities/queries'
import type { SortingOptions } from '@mindenit/answers-kit'
import { useQuery } from '@tanstack/vue-query'
import { SORT_BY_FIELDS, SORT_ORDERS, AVAILABLE_YEARS } from '~/core/constants'
import { coursesOptions } from '~/layers/courses/queries'
import { facultySubjectsOptions } from '~/layers/faculties/queries'
import { testsOptions } from '~/layers/tests/queries'
import { getCourseById } from '~/core/utils'

useSeoMeta({
  title: 'Каталог тестів',
  description:
    'Переглядайте каталог тестів ХНУРЕ та інших університетів України. Вибирайте університет, факультет, предмет і знаходьте актуальні тести та відповіді за роками навчання. Зручний пошук і сортування.',
})

const route = useRoute()
const router = useRouter()

const params = useUrlSearchParams('history')

const searchQuery = ref('')
const debouncedSearchQuery = refDebounced(searchQuery, 500)
const selectedSortBy = ref<SortingOptions<'year'>['sortBy']>('id')
const selectedOrder = ref<SortingOptions['order']>('desc')
const selectedYear = ref<number | null>(null)
const courseId = ref<number | null>(null)

const selectedUniversity = ref(Number(params.university) || 0)
const selectedFaculty = ref(Number(params.faculty) || 0)
const selectedSubject = ref(Number(params.subject) || 0)

const prevUniversity = ref(selectedUniversity.value)
const prevFaculty = ref(selectedFaculty.value)
const prevSubject = ref(selectedSubject.value)

const areFiltersApplied = computed(() => {
  return (
    searchQuery.value !== '' ||
    selectedSortBy.value !== 'id' ||
    selectedOrder.value !== 'desc' ||
    selectedYear.value !== null ||
    courseId.value !== null
  )
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedSortBy.value = 'id'
  selectedOrder.value = 'desc'
  selectedYear.value = null
  courseId.value = null
}

const currentStep = computed(() => {
  if (selectedSubject.value > 0) return 3
  if (selectedFaculty.value > 0) return 2
  if (selectedUniversity.value > 0) return 1
  return 0
})

const { data: universities, isLoading: isLoadingUniversities } = useQuery(
  universitiesOptions()
)

const {
  data: faculties,
  isLoading: isLoadingFaculties,
  refetch: refetchFaculties,
} = useQuery(universityFacultiesOptions(selectedUniversity))

const {
  data: subjects,
  isLoading: isLoadingSubjects,
  refetch: refetchSubjects,
} = useQuery(facultySubjectsOptions(selectedFaculty))

const {
  data: tests,
  isLoading: isLoadingTests,
  refetch: refetchTests,
} = useQuery({
  ...testsOptions({
    options: {
      subjectId: selectedSubject,
      name: searchQuery,
      year: selectedYear as Ref<number>,
      courseId: courseId as Ref<number>,
    },
    sorting: {
      sortBy: selectedSortBy,
      order: selectedOrder,
    },
  }),
  enabled: selectedSubject.value > 0,
})

const { data: courses } = useQuery(coursesOptions())

const isLoading = computed(() => {
  if (currentStep.value === 0) return isLoadingUniversities.value
  if (currentStep.value === 1) return isLoadingFaculties.value
  if (currentStep.value === 2) return isLoadingSubjects.value
  if (currentStep.value === 3) return isLoadingTests.value
  return false
})

const dataIsEmpty = computed(() => {
  if (currentStep.value === 0) return !universities.value?.length
  if (currentStep.value === 1) return !faculties.value?.length
  if (currentStep.value === 2) return !subjects.value?.length
  if (currentStep.value === 3) return !tests.value?.data.length
  return false
})

function handlePopState(event: PopStateEvent) {
  const state = event.state

  if (state && typeof state.step === 'number') {
    if (state.step === 0) {
      selectedUniversity.value = 0
      selectedFaculty.value = 0
      selectedSubject.value = 0
    } else if (state.step === 1) {
      selectedFaculty.value = 0
      selectedSubject.value = 0
    } else if (state.step === 2) {
      selectedSubject.value = 0
    }

    event.preventDefault()
  }
}

function updateQueryParams() {
  const query: Record<string, string | number> = {}

  if (selectedUniversity.value > 0) {
    query.university = selectedUniversity.value
  }

  if (selectedFaculty.value > 0) {
    query.faculty = selectedFaculty.value
  }

  if (selectedSubject.value > 0) {
    query.subject = selectedSubject.value
  }

  router.replace({ query })
}

function selectUniversity(id: number) {
  selectedUniversity.value = id
  selectedFaculty.value = 0
  selectedSubject.value = 0
  updateQueryParams()
  window.history.pushState(
    { step: 1, university: id },
    '',
    router.currentRoute.value.fullPath
  )
}

function selectFaculty(id: number) {
  selectedFaculty.value = id
  selectedSubject.value = 0
  updateQueryParams()
  window.history.pushState(
    { step: 2, faculty: id },
    '',
    router.currentRoute.value.fullPath
  )
}

function selectSubject(id: number) {
  selectedSubject.value = id
  updateQueryParams()
  window.history.pushState(
    { step: 3, subject: id },
    '',
    router.currentRoute.value.fullPath
  )
}

function goBack() {
  if (currentStep.value > 0) {
    window.history.back()
  }
}

const isFirstStep = computed(() => {
  const firstStepValue = universities.value?.length === 1 ? 1 : 0
  return currentStep.value === firstStepValue
})

watch(
  () => route.query,
  (newQuery) => {
    const newUniversity = Number(newQuery.university) || 0
    const newFaculty = Number(newQuery.faculty) || 0
    const newSubject = Number(newQuery.subject) || 0

    if (
      newUniversity !== selectedUniversity.value ||
      newFaculty !== selectedFaculty.value ||
      newSubject !== selectedSubject.value
    ) {
      selectedUniversity.value = newUniversity
      selectedFaculty.value = newFaculty
      selectedSubject.value = newSubject
    }
  },
  { deep: true }
)

watch(
  selectedUniversity,
  (newValue) => {
    if (newValue > 0 && newValue !== prevUniversity.value) {
      refetchFaculties()
      prevUniversity.value = newValue
    }
  },
  { immediate: true }
)

watch(
  selectedFaculty,
  (newValue) => {
    if (newValue > 0 && newValue !== prevFaculty.value) {
      refetchSubjects()
      prevFaculty.value = newValue
    }
  },
  { immediate: true }
)

watch(
  selectedSubject,
  (newValue) => {
    if (newValue > 0 && newValue !== prevSubject.value) {
      refetchTests()
      prevSubject.value = newValue
    }
  },
  { immediate: true }
)

watch(
  [debouncedSearchQuery, selectedOrder, selectedSortBy, selectedYear, courseId],
  () => {
    if (selectedSubject.value > 0) {
      updateQueryParams()
      refetchTests()
    }
  }
)

watch(
  universities,
  (newUniversities) => {
    if (newUniversities?.length === 1 && selectedUniversity.value === 0) {
      selectUniversity(newUniversities[0]!.id)
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (universities.value?.length === 1) {
    selectUniversity(universities.value[0]!.id)
  }
  updateQueryParams()

  window.history.replaceState(
    {
      step: currentStep.value,
      university: selectedUniversity.value,
      faculty: selectedFaculty.value,
      subject: selectedSubject.value,
    },
    '',
    router.currentRoute.value.fullPath
  )

  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Heading size="medium">Каталог</Heading>

    <TheSpinner v-if="isLoading" />

    <template v-else>
      <div class="flex items-center gap-2">
        <Button
          v-if="currentStep > 0"
          variant="ghost"
          size="icon"
          :disabled="isFirstStep"
          @click="goBack"
        >
          <Icon name="lucide:arrow-left" size="16px" />
        </Button>
        <Heading v-if="currentStep === 0" size="small"
          >Оберіть університет</Heading
        >
        <Heading v-if="currentStep === 1" size="small"
          >Оберіть факультет</Heading
        >
        <Heading v-if="currentStep === 2" size="small">Оберіть предмет</Heading>
        <Heading v-if="currentStep === 3" size="small">Оберіть тест</Heading>
      </div>

      <template v-if="currentStep === 0">
        <div
          class="grid auto-rows-fr gap-4"
          :class="
            universities?.length === 1
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          "
        >
          <CatalogueCard
            v-for="university in universities"
            :key="university.id"
            v-bind="university"
            @click="() => selectUniversity(university.id)"
          />
        </div>
      </template>

      <template v-if="currentStep === 1">
        <div
          class="grid auto-rows-fr gap-4"
          :class="
            faculties?.length === 1
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          "
        >
          <CatalogueCard
            v-for="faculty in faculties"
            :key="faculty.id"
            v-bind="faculty"
            @click="() => selectFaculty(faculty.id)"
          />
        </div>
      </template>

      <template v-else-if="currentStep === 2">
        <div
          class="grid auto-rows-fr gap-4"
          :class="
            subjects?.length === 1
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          "
        >
          <CatalogueCard
            v-for="subject in subjects"
            :key="subject.id"
            v-bind="subject"
            @click="() => selectSubject(subject.id)"
          />
        </div>
      </template>

      <template v-else-if="currentStep === 3">
        <div class="flex flex-col md:flex-row gap-2">
          <div class="relative w-full items-center">
            <Input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Пошук за назвою тесту..."
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <Icon name="lucide:search" class="size-6 text-muted-foreground" />
            </span>
          </div>
          <Select v-model="selectedOrder">
            <SelectTrigger class="min-w-40 max-md:w-full">
              <SelectValue placeholder="Виберіть порядок сортування" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="(label, value) in SORT_ORDERS"
                :key="value"
                :value="value"
              >
                {{ label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="selectedSortBy">
            <SelectTrigger class="min-w-40 max-md:w-full">
              <SelectValue placeholder="Сортувати за" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="(label, value) in SORT_BY_FIELDS"
                :key="value"
                :value="value"
              >
                {{ label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="selectedYear">
            <SelectTrigger class="min-w-40 max-md:w-full">
              <SelectValue placeholder="Виберіть рік" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="year in AVAILABLE_YEARS"
                :key="year"
                :value="year.toString()"
              >
                {{ year }} рік
              </SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="courseId">
            <SelectTrigger class="min-w-40 max-md:w-full">
              <SelectValue placeholder="Виберіть курс" />
            </SelectTrigger>
            <SelectContent>
              <template v-if="courses?.length">
                <SelectItem
                  v-for="(course, index) in courses"
                  :key="index"
                  :value="course.id!.toString()"
                >
                  {{ course.number }} курс
                </SelectItem>
              </template>
              <span v-else class="p-3 text-center">
                <Text
                  v-show="!courses?.length"
                  size="subtitle"
                  class="select-none"
                  >Курси відсутні</Text
                >
              </span>
            </SelectContent>
          </Select>
        </div>
        <button
          v-if="areFiltersApplied"
          class="inline-flex w-fit text-muted-foregroud items-center justify-start hover:text-primary gap-1 text-sm cursor-pointer transition"
          @click="resetFilters"
        >
          <Icon class="size-5" name="lucide:circle-x" />
          Скинути фільтри
        </button>

        <div
          class="grid gap-4 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          <TestCard
            v-for="test in tests?.data"
            :key="test.id"
            :test
            :course="getCourseById(courses!, test.courseId)"
          />
        </div>
      </template>

      <div
        v-if="!isLoading && dataIsEmpty"
        class="flex items-center justify-center w-full h-[60vh]"
      >
        <StatusCard
          type="not-found"
          message="За вказаними параметрами нічого не знайдено"
        >
          <Button @click="goBack">Повернутись назад</Button>
          <Button v-if="areFiltersApplied" @click="resetFilters"
            >Скинути фільтри</Button
          >
        </StatusCard>
      </div>
    </template>
  </div>
</template>
