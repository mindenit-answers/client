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
import type { CreateUniversityValues } from '@mindenit/answers-kit'

interface Props {
  mode: 'create' | 'edit'
  entityId?: string
  initialValues?: CreateUniversityValues
}

const props = defineProps<Props>()

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)

const createUniversityMutation = useCreateUniversity()
const updateUniversityMutation = useUpdateUniversity()

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: 'Введіть назву університету',
      })
      .trim(),
    brief: z
      .string({
        required_error: 'Введіть коротку назву університету',
      })
      .max(10, 'Коротка назва не повинна перевищувати 10 символів')
      .trim(),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.mode === 'edit') {
    if (props.entityId) {
      updateUniversityMutation.mutate(
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
            toast.success('Університет успішно оновлено!')
          },
          onError: (error) => {
            toast.error('Помилка при оновленні університета', {
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
    createUniversityMutation.mutate(
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
          toast.success('Університет успішно створено!', {
            description: 'ID нового університета: ' + data.id,
          })
        },
        onError: (error) => {
          toast.error('Помилка при створенні університета', {
            description: error.message,
          })
        },
      }
    )
  }
})

const buttonText = computed(() => {
  return props.mode === 'edit' ? 'Зберегти зміни' : 'Створити університет'
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Назва університат</FormLabel>
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
            placeholder="ХНУРЕ, ХАІ..."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      {{ buttonText }}
    </Button>
  </form>
</template>
