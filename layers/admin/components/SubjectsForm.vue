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
import { facultiesOptions } from '~/layers/faculties/queries'
import type { CreateSubjectValues } from '@mindenit/answers-kit'

interface Props {
  mode: 'create' | 'edit'
  entityId?: string
  initialValues?: CreateSubjectValues
}

const props = defineProps<Props>()

const { data: faculties, isLoading: facultiesLoading } = useQuery(
  facultiesOptions()
)

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)

const createsubSectMutation = useCreateSubject()
const updatesubSectMutation = useUpdateSubject()

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: 'Введіть назву предмету',
      })
      .trim(),
    brief: z
      .string({
        required_error: 'Введіть коротку назву предмету',
      })
      .max(10, 'Коротка назва не повинна перевищувати 10 символів')
      .trim(),
    facultyId: z.number({
      required_error: 'Виберіть факультет',
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
      updatesubSectMutation.mutate(
        {
          data: {
            id: +props.entityId,
            ...values,
          },
          headers: {
            authorization: `TOKEN WILL BE HERE`,
          },
        },
        {
          onSuccess: () => {
            if (dataTableActions?.closeDialog) {
              dataTableActions.closeDialog()
            }
            toast.success('Предмет успішно оновлено!')
          },
          onError: (error) => {
            toast.error('Помилка при оновленні предмета', {
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
    createsubSectMutation.mutate(
      {
        data: {
          ...values,
        },
        headers: {
          authorization: `TOKEN WILL BE HERE`,
        },
      },
      {
        onSuccess: (data) => {
          if (dataTableActions?.closeDialog) {
            dataTableActions.closeDialog()
          }
          toast.success('Предмет успішно створено!', {
            description: 'ID нового предмета: ' + data.id,
          })
        },
        onError: (error) => {
          toast.error('Помилка при створенні предмета', {
            description: error.message,
          })
        },
      }
    )
  }
})

const buttonText = computed(() => {
  return props.mode === 'edit' ? 'Зберегти зміни' : 'Створити предмет'
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Назва предмета</FormLabel>
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
            placeholder="АККМ, ФВ..."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="facultyId">
      <FormItem>
        <FormLabel>Оберіть факультет</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Оберіть факультет" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <template v-if="facultiesLoading || !faculties">
              <SelectItem value="loading" disabled>Завантаження...</SelectItem>
            </template>
            <template v-else>
              <SelectItem
                v-for="faculty in faculties"
                :key="faculty.id"
                :value="faculty.id"
              >
                {{ faculty.name }}
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
