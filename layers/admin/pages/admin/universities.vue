<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { universitiesOptions } from '~/layers/universities/queries'
import { universitiesColumns } from '#imports'

definePageMeta({
  layout: 'admin',
})

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)

const { data: universities, isLoading: universitiesLoading } = useQuery(
  universitiesOptions()
)

const universityDelete = useDeleteUniversity()

const handleDelete = (id: string) => {
  universityDelete.mutate(
    {
      id: Number(id),
      headers: {
        authorization: `TOKEN WILL BE HERE`,
      },
    },
    {
      onSuccess: () => {
        toast.success('Університет успішно видалено!')
        if (dataTableActions?.closeDialog) {
          dataTableActions.closeDialog()
        }
      },
      onError: (error) => {
        toast.error('Помилка при видаленні університета', {
          description: error.message,
        })
      },
    }
  )
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <TheSpinner v-if="universitiesLoading" />
    <AdminDataTable
      v-if="universities"
      :columns="universitiesColumns(handleDelete)"
      :data="universities!"
      filter-by="name"
      filter-placeholder="Введіть назву університету..."
    >
      <template #header>
        <AdminUniversitiesForm mode="create" />
      </template>
    </AdminDataTable>
  </div>
</template>
