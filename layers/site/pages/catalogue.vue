<script lang="ts" setup>
import {
  universitiesOptions,
  universityFacultiesOptions,
} from '@/layers/universities/queries'
import type { Course, SortingOptions } from '@mindenit/answers-kit'
import { useQuery } from '@tanstack/vue-query'
import { SORT_BY_FIELDS, SORT_ORDERS, AVAILABLE_YEARS } from '~/core/constants'
import { coursesOptions } from '~/layers/courses/queries'
import { facultySubjectsOptions } from '~/layers/faculties/queries'
import { testsOptions } from '~/layers/tests/queries'

useSeoMeta({
  title: 'Каталог тестів',
  description:
    'Каталог тестів - знайдіть тест, який вам потрібен, за університетом, факультетом, предметом та роком. Пошук тестів за назвою. Сортування тестів за роком, назвою та курсом.',
})

const route = useRoute()
const router = useRouter()

const params = useUrlSearchParams('history')

const searchQuery = ref('')
const selectedSortBy = ref<SortingOptions<'year'>['sortBy']>('id')
const selectedOrder = ref<SortingOptions['order']>('desc')
const selectedYear = ref<number | null>(null)
const courseId = ref<number | null>(null)

const selectedUniversity = ref(Number(params.university) || 0)
const selectedFaculty = ref(Number(params.faculty) || 0)
const selectedSubject = ref(Number(params.subject) || 0)

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
} = useQuery({
  ...universityFacultiesOptions(selectedUniversity),
  enabled: selectedUniversity.value > 0,
})

const {
  data: subjects,
  isLoading: isLoadingSubjects,
  refetch: refetchSubjects,
} = useQuery({
  ...facultySubjectsOptions(selectedFaculty),
  enabled: selectedFaculty.value > 0,
})

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

const getCourseById = (courseId: number): Course | null => {
  if (!courseId || !courses.value?.length) return null
  return courses.value.find((c) => c.id === courseId) || null
}

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
}

function selectFaculty(id: number) {
  selectedFaculty.value = id
  selectedSubject.value = 0
  updateQueryParams()
}

function selectSubject(id: number) {
  selectedSubject.value = id
  updateQueryParams()
}

function goBack() {
  if (currentStep.value > 0) {
    if (currentStep.value === 3) {
      selectedSubject.value = 0
      resetFilters()
    } else if (currentStep.value === 2) {
      selectedFaculty.value = 0
    } else if (currentStep.value === 1) {
      if (universities.value?.length !== 1) {
        selectedUniversity.value = 0
      }
    }
    updateQueryParams()
  }
}

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
    if (newValue > 0) {
      refetchFaculties()
    }
  },
  { immediate: true }
)

watch(
  selectedFaculty,
  (newValue) => {
    if (newValue > 0) {
      refetchSubjects()
    }
  },
  { immediate: true }
)

watch(
  selectedSubject,
  (newValue) => {
    if (newValue > 0) {
      refetchTests()
    }
  },
  { immediate: true }
)

watch(
  [searchQuery, selectedOrder, selectedSortBy, selectedYear, courseId],
  () => {
    if (selectedSubject.value > 0) {
      updateQueryParams()
      refetchTests()
    }
  }
)

onMounted(() => {
  if (universities.value?.length === 1) {
    selectUniversity(universities.value[0]!.id)
  }
  updateQueryParams()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Heading size="medium">Каталог</Heading>

    <TheSpinner v-if="isLoading" />

    <template v-else-if="currentStep === 0">
      <div class="flex items-center gap-2">
        <Heading size="small">Оберіть університет</Heading>
      </div>
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

    <template v-else-if="currentStep === 1">
      <div class="flex items-center gap-2">
        <IconButton
          icon="lucide:arrow-left"
          variant="ghost"
          size="sm"
          @click="goBack"
        />
        <Heading size="small">Оберіть факультет</Heading>
      </div>
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
      <div class="flex items-center gap-2">
        <IconButton
          icon="lucide:arrow-left"
          variant="ghost"
          size="sm"
          @click="goBack"
        />
        <Heading size="small">Оберіть предмет</Heading>
      </div>
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
      <div class="flex items-center gap-2">
        <IconButton
          icon="lucide:arrow-left"
          variant="ghost"
          size="sm"
          @click="goBack"
        />
        <Heading size="small">Оберіть тест</Heading>
      </div>

      <div class="flex flex-col md:flex-row gap-2">
        <SearchField
          v-model="searchQuery"
          class="w-full"
          placeholder="Пошук за назвою тесту..."
          autofocus
        />
        <SelectRoot v-model="selectedOrder">
          <SelectTrigger
            class="min-w-40"
            placeholder="Виберіть порядок сортування"
          />
          <SelectContent>
            <SelectItem
              v-for="(label, value) in SORT_ORDERS"
              :key="value"
              :value="value"
            >
              {{ label }}
            </SelectItem>
          </SelectContent>
        </SelectRoot>
        <SelectRoot v-model="selectedSortBy">
          <SelectTrigger class="min-w-40" placeholder="Сортувати за" />
          <SelectContent>
            <SelectItem
              v-for="(label, value) in SORT_BY_FIELDS"
              :key="value"
              :value="value"
            >
              {{ label }}
            </SelectItem>
          </SelectContent>
        </SelectRoot>
        <SelectRoot v-model="selectedYear">
          <SelectTrigger class="min-w-40" placeholder="Виберіть рік" />
          <SelectContent>
            <SelectItem
              v-for="year in AVAILABLE_YEARS"
              :key="year"
              :value="year.toString()"
            >
              {{ year }} рік
            </SelectItem>
          </SelectContent>
        </SelectRoot>
        <SelectRoot v-model="courseId">
          <SelectTrigger class="min-w-40" placeholder="Виберіть курс" />
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
        </SelectRoot>
      </div>
      <button
        v-if="areFiltersApplied"
        class="inline-flex w-fit text-fiord-400 items-center justify-start hover:text-royal-blue-500 gap-1 text-sm cursor-pointer"
        @click="resetFilters"
      >
        <Icon class="size-5" name="lucide:circle-x" />
        Скинути фільтри
      </button>

      <div class="grid gap-4 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        <TestCard
          v-for="test in tests?.data"
          :key="test.id"
          :test
          :course="getCourseById(test.courseId)"
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
      </StatusCard>
    </div>
  </div>
</template>
