<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { questionsOptions } from '~/layers/questions/queries'
import { questionColumns } from '#imports'
import { toast } from 'vue-sonner'
import { testsOptions } from '~/layers/tests/queries'

definePageMeta({
  layout: 'admin',
})

useSeoMeta({
  title: 'Питання',
})

defineOgImageComponent('Mindenit')

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)
const { data: questions, isLoading } = useQuery(questionsOptions())
const { data: tests, isLoading: testsLoading } = useQuery(testsOptions())
const questionDelete = useDeleteQuestion()

const handleDelete = (id: string) => {
  questionDelete.mutate(
    {
      id: Number(id),
      headers: {
        authorization: `TOKEN WILL BE HERE`,
      },
    },
    {
      onSuccess: () => {
        toast.success('Питання успішно видалено!')
        if (dataTableActions?.closeDialog) {
          dataTableActions.closeDialog()
        }
      },
      onError: (error) => {
        toast.error('Помилка при видаленні питання', {
          description: error.message,
        })
      },
    }
  )
}

const getTestName = (testId: number | string) =>
  getEntityName(tests.value?.data, testId, 'name')
</script>

<template>
  <div class="flex flex-col gap-2">
    <TheSpinner v-if="isLoading || testsLoading" />
    <AdminDataTable
      v-if="questions"
      :columns="questionColumns(handleDelete, getTestName)"
      :data="questions!"
      filter-by="name"
      filter-placeholder="Введіть назву питання..."
    >
      <template #header>
        <Tabs default-value="form" class="w-full">
          <TabsList class="w-full">
            <TabsTrigger value="form"> Форма </TabsTrigger>
            <TabsTrigger value="syntax"> Розмітка </TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <AdminQuestionsForm mode="create" />
          </TabsContent>
          <TabsContent value="syntax">
            <AdminQuestionsSyntax />
          </TabsContent>
        </Tabs>
      </template>
    </AdminDataTable>
  </div>
</template>
