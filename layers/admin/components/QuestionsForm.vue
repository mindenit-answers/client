<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useQuery } from '@tanstack/vue-query'
import { testsOptions } from '~/layers/tests/queries'
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
    name: string
    answer: string
    isVerified?: boolean
    testId: number
  }
}

const props = defineProps<Props>()

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)
const { getAuthToken } = useAuth()
const { data: tests, isLoading: testsLoading } = useQuery(testsOptions())
const createQuestionMutation = useCreateQuestion()
const updateQuestionMutation = useUpdateQuestion()

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: 'Введіть назву питання',
      })
      .min(2, 'Назва питання повинна містити принаймні 2 символи'),
    answer: z
      .string({
        required_error: 'Введіть відповідь',
      })
      .min(2, 'Відповідь на повинна містити принаймні 2 символи'),
    isVerified: z.boolean().optional(),
    testId: z
      .number({
        required_error: 'Виберіть тест',
      })
      .min(1, 'Виберіть тест'),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.mode === 'edit') {
    if (props.entityId) {
      updateQuestionMutation.mutate(
        {
          data: {
            id: +props.entityId,
            name: values.name,
            answer: values.answer,
            isVerified: values.isVerified ?? false,
            testId: values.testId,
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
            toast.success('Питання успішно оновлено!')
          },
          onError: (error) => {
            toast.error('Помилка при оновленні питання', {
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
    createQuestionMutation.mutate(
      {
        data: {
          name: values.name,
          answer: values.answer,
          isVerified: values.isVerified ?? false,
          testId: values.testId,
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
          toast.success('Питання успішно створено!', {
            description: 'ID нового питання: ' + data.id,
          })
        },
        onError: (error) => {
          toast.error('Помилка при створенні питання', {
            description: error.message,
          })
        },
      }
    )
  }
})

const buttonText = computed(() => {
  return props.mode === 'edit' ? 'Зберегти зміни' : 'Створити питання'
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Назва питання</FormLabel>
        <FormControl>
          <Textarea
            type="text"
            placeholder="Як називається..."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="answer">
      <FormItem>
        <FormLabel>Відповідь</FormLabel>
        <FormControl>
          <Textarea
            type="text"
            placeholder="Відпоівдь тут..."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="testId">
      <FormItem>
        <FormLabel>Оберіть тест</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Оберіть тест" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <template v-if="testsLoading || !tests?.data">
              <SelectItem value="loading" disabled>Завантаження...</SelectItem>
            </template>
            <template v-else>
              <SelectItem
                v-for="test in tests!.data"
                :key="test.id"
                :value="test.id"
              >
                {{ test.name }}
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="isVerified"
    >
      <FormItem class="flex flex-row items-start gap-x-3">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel> Чи є питання верифікованим? </FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <Button type="submit">
      {{ buttonText }}
    </Button>
  </form>
</template>
