<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { testsOptions } from '~/layers/tests/queries'
import { testsColumns } from '#imports'
import { subjectsOptions } from '~/layers/subjects/queries'
import { coursesOptions } from '~/layers/courses/queries'

definePageMeta({
  layout: 'admin',
})

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)

const { data: tests, isLoading } = useQuery(testsOptions())
const { data: subjects, isLoading: subjectsLoading } = useQuery(
  subjectsOptions()
)
const { data: courses, isLoading: coursesLoading } = useQuery(coursesOptions())
const testDelete = useDeleteTest()

const handleDelete = (id: string) => {
  testDelete.mutate(
    {
      id: Number(id),
      headers: {
        authorization: `TOKEN WILL BE HERE`,
      },
    },
    {
      onSuccess: () => {
        toast.success('Тест успішно видалено!')
        if (dataTableActions?.closeDialog) {
          dataTableActions.closeDialog()
        }
      },
      onError: (error) => {
        toast.error('Помилка при видаленні теста', {
          description: error.message,
        })
      },
    }
  )
}

const getSubjectName = (subjectId: number | string) =>
  getEntityName(subjects.value, subjectId, 'name')

const getCourseName = (courseId: number | string) =>
  getEntityName(courses.value, courseId, 'number')
</script>

<template>
  <div class="flex flex-col gap-2">
    <TheSpinner v-if="isLoading || coursesLoading || subjectsLoading" />
    <AdminDataTable
      v-if="tests"
      :columns="testsColumns(handleDelete, getSubjectName, getCourseName)"
      :data="tests!.data"
      filter-by="name"
      filter-placeholder="Введіть назву тесту..."
    >
      <template #header>
        <AdminTestsForm mode="create" />
      </template>
    </AdminDataTable>
  </div>
</template>
