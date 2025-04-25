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

interface Props {
  mode: 'create' | 'edit'
  entityId?: string
  initialValues?: {
    number: number
  }
}

const props = defineProps<Props>()
const { getAuthToken } = useAuth()
const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)

const createCourseMutation = useCreateCourse()
const updateCourseMutation = useUpdateCourse()

const formSchema = toTypedSchema(
  z.object({
    number: z
      .number({
        required_error: 'Введіть номер курсу',
      })
      .min(1, 'Номер курсу повинен бути більшим за 0')
      .max(10, 'Номер курсу повинен бути меншим за 10'),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.mode === 'edit') {
    if (props.entityId) {
      updateCourseMutation.mutate(
        {
          data: {
            id: +props.entityId,
            number: values.number,
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
            toast.success('Курс успішно оновлено!')
          },
          onError: (error) => {
            toast.error('Помилка при оновленні курса', {
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
    createCourseMutation.mutate(
      {
        data: {
          number: values.number,
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
          toast.success('Курс успішно створено!', {
            description: 'ID нового курса: ' + data.id,
          })
        },
        onError: (error) => {
          toast.error('Помилка при створенні курса', {
            description: error.message,
          })
        },
      }
    )
  }
})

const buttonText = computed(() => {
  return props.mode === 'edit' ? 'Зберегти зміни' : 'Створити курс'
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="number">
      <FormItem>
        <FormLabel>Номер курсу</FormLabel>
        <FormControl>
          <Input type="number" placeholder="1, 2..." v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      {{ buttonText }}
    </Button>
  </form>
</template>
