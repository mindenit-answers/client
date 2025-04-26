<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { subjectsOptions } from '~/layers/subjects/queries'
import { subjectsColumns } from '#imports'
import { facultiesOptions } from '~/layers/faculties/queries'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

useSeoMeta({
  title: 'Предмети',
})

defineOgImageComponent('Mindenit')

const { getAuthToken } = useAuth()
const { data: subjects, isLoading } = useQuery(subjectsOptions())
const { data: faculties, isLoading: facultiesLoading } = useQuery(
  facultiesOptions()
)

const subjectDelete = useDeleteSubject()

const handleDelete = (id: string) => {
  subjectDelete.mutate(
    {
      id: Number(id),
      headers: {
        authorization: getAuthToken(),
      },
    },
    {
      onSuccess: () => {
        toast.success('Предмет успішно видалено!')
      },
      onError: (error) => {
        toast.error('Помилка при видаленні предмета', {
          description: error.message,
        })
      },
    }
  )
}

const getFacultytName = (id: number | string) =>
  getEntityName(faculties.value, id, 'name')
</script>

<template>
  <div class="flex flex-col gap-2">
    <TheSpinner v-if="isLoading || facultiesLoading" />
    <AdminDataTable
      v-if="subjects"
      :columns="subjectsColumns(handleDelete, getFacultytName)"
      :data="subjects!"
      filter-by="name"
      filter-placeholder="Введіть назву предмету..."
    >
      <template #header>
        <AdminSubjectsForm mode="create" />
      </template>
    </AdminDataTable>
  </div>
</template>
