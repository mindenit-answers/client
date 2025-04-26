<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import { useQuery } from '@tanstack/vue-query'
import type { CreateFacultyValues } from '@mindenit/answers-kit'
import { universitiesOptions } from '~/layers/universities/queries'

interface Props {
  mode: 'create' | 'edit'
  entityId?: string
  initialValues?: CreateFacultyValues
}

const props = defineProps<Props>()
const { getAuthToken } = useAuth()
const { data: universities, isLoading: universitiesLoading } = useQuery(
  universitiesOptions()
)

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)

const createFacultyMutation = useCreateFaculty()
const updateFacultyMutation = useUpdateFaculty()

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: 'Введіть назву факультету',
      })
      .trim(),
    brief: z
      .string({
        required_error: 'Введіть коротку назву факультету',
      })
      .max(10, 'Коротка назва не повинна перевищувати 10 символів')
      .trim(),
    universityId: z.number({
      required_error: 'Виберіть університет',
    }),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.mode === 'edit') {
    if (props.entityId) {
      updateFacultyMutation.mutate(
        {
          data: {
            id: +props.entityId,
            ...values,
          },
          headers: {
            authorization: getAuthToken(),
          },
        },
        {
          onSuccess: () => {
            if (dataTableActions?.closeDialog) {
              dataTableActions.closeDialog()
            }
            toast.success('Факультет успішно оновлено!')
          },
          onError: (error) => {
            toast.error('Помилка при оновленні факультета', {
              description: error.message,
            })
          },
        }
      )
    } else {
      toast.error('Сталася помилка', {
        description: 'Перевірте консоль для отримання додаткової інформації',
      })
      console.error('Entity ID is required for update mode')
    }
  } else {
    createFacultyMutation.mutate(
      {
        data: {
          ...values,
        },
        headers: {
          authorization: getAuthToken(),
        },
      },
      {
        onSuccess: (data) => {
          if (dataTableActions?.closeDialog) {
            dataTableActions.closeDialog()
          }
          toast.success('Факультет успішно створено!', {
            description: 'ID нового факультета: ' + data.id,
          })
        },
        onError: (error) => {
          toast.error('Помилка при створенні факультета', {
            description: error.message,
          })
        },
      }
    )
  }
})

const buttonText = computed(() => {
  return props.mode === 'edit' ? 'Зберегти зміни' : 'Створити факультет'
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Назва факультета</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Як називається..."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="brief">
      <FormItem>
        <FormLabel>Коротка назва</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="КІУ, КБІКС..."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="universityId">
      <FormItem>
        <FormLabel>Оберіть університет</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Оберіть університет" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <template v-if="universitiesLoading || !universities">
              <SelectItem value="loading" disabled>Завантаження...</SelectItem>
            </template>
            <template v-else>
              <SelectItem
                v-for="university in universities"
                :key="university.id"
                :value="university.id"
              >
                {{ university.name }}
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      {{ buttonText }}
    </Button>
  </form>
</template>
