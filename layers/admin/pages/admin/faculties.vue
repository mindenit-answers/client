<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { facultiesOptions } from '~/layers/faculties/queries'
import { universitiesOptions } from '~/layers/universities/queries'
import { facultiesColumns } from '#imports'

definePageMeta({
  layout: 'admin',
})

useSeoMeta({
  title: 'Факультети',
})

defineOgImageComponent('Mindenit')

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)

const { data: faculties, isLoading } = useQuery(facultiesOptions())
const { data: universities, isLoading: universitiesLoading } = useQuery(
  universitiesOptions()
)

const facultyDelete = useDeleteFaculty()

const handleDelete = (id: string) => {
  facultyDelete.mutate(
    {
      id: Number(id),
      headers: {
        authorization: `TOKEN WILL BE HERE`,
      },
    },
    {
      onSuccess: () => {
        toast.success('Факультет успішно видалено!')
        if (dataTableActions?.closeDialog) {
          dataTableActions.closeDialog()
        }
      },
      onError: (error) => {
        toast.error('Помилка при видаленні факультета', {
          description: error.message,
        })
      },
    }
  )
}

const getUniversityName = (id: number | string) =>
  getEntityName(universities.value, id, 'name')
</script>

<template>
  <div class="flex flex-col gap-2">
    <TheSpinner v-if="isLoading || universitiesLoading" />
    <AdminDataTable
      v-if="faculties"
      :columns="facultiesColumns(handleDelete, getUniversityName)"
      :data="faculties!"
      filter-by="name"
      filter-placeholder="Введіть назву факультету..."
    >
      <template #header>
        <AdminFacultiesForm mode="create" />
      </template>
    </AdminDataTable>
  </div>
</template>
