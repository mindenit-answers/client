<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { coursesOptions } from '~/layers/courses/queries'
import { toast } from 'vue-sonner'
import { coursesColumns } from '#imports'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

useSeoMeta({
  title: 'Курси',
})

defineOgImageComponent('Mindenit')

const { getAuthToken } = useAuth()
const { data: courses, isLoading } = useQuery(coursesOptions())
const courseDelete = useDeleteCourse()

const handleDelete = (id: string) => {
  courseDelete.mutate(
    {
      id: Number(id),
      headers: {
        authorization: getAuthToken(),
      },
    },
    {
      onSuccess: () => {
        toast.success('Курс успішно видалено!')
      },
      onError: (error) => {
        toast.error('Помилка при видаленні курса', {
          description: error.message,
        })
      },
    }
  )
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <TheSpinner v-if="isLoading" />
    <AdminDataTable
      v-if="courses"
      :columns="coursesColumns(handleDelete)"
      :data="courses!"
      filter-by="number"
      filter-placeholder="Введіть номер курсу..."
    >
      <template #header>
        <AdminCoursesForm mode="create" />
      </template>
    </AdminDataTable>
  </div>
</template>
