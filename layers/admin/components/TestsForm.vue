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
import { coursesOptions } from '~/layers/courses/queries'
import { useQuery } from '@tanstack/vue-query'
import { subjectsOptions } from '~/layers/subjects/queries'

interface Props {
  mode: 'create' | 'edit'
  entityId?: string
  initialValues?: {
    name: string
    isVerified: boolean
    year: number
    courseId: number
    subjectId: number
  }
}

const props = defineProps<Props>()

const { data: courses, isLoading: coursesLoading } = useQuery(coursesOptions())
const { data: subjects, isLoading: subjectsLoading } = useQuery(
  subjectsOptions()
)

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)

const createTestMutation = useCreateTest()
const updateTestMutation = useUpdateTest()

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: 'Введіть назву тесту',
      })
      .trim(),
    year: z
      .number({
        required_error: 'Введіть рік',
      })
      .min(2000, 'Рік повинен бути більшим за 2000')
      .max(2100, 'Рік повинен бути меншим за 2100'),
    isVerified: z.boolean().optional(),
    courseId: z.number({
      required_error: 'Виберіть курс',
    }),
    subjectId: z.number({
      required_error: 'Виберіть предмет',
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
      updateTestMutation.mutate(
        {
          data: {
            id: +props.entityId,
            isVerified: values.isVerified ?? false,
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
            toast.success('Тест успішно оновлено!')
          },
          onError: (error) => {
            toast.error('Помилка при оновленні теста', {
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
    createTestMutation.mutate(
      {
        data: {
          ...values,
          isVerified: values.isVerified ?? false,
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
          toast.success('Тест успішно створено!', {
            description: 'ID нового теста: ' + data.id,
          })
        },
        onError: (error) => {
          toast.error('Помилка при створенні теста', {
            description: error.message,
          })
        },
      }
    )
  }
})

const buttonText = computed(() => {
  return props.mode === 'edit' ? 'Зберегти зміни' : 'Створити тест'
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Назва тесту</FormLabel>
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

    <FormField v-slot="{ componentField }" name="year">
      <FormItem>
        <FormLabel>Рік</FormLabel>
        <FormControl>
          <Input type="number" placeholder="2025" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="courseId">
      <FormItem>
        <FormLabel>Оберіть курс</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Оберіть курс" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <template v-if="coursesLoading || !courses">
              <SelectItem value="loading" disabled>Завантаження...</SelectItem>
            </template>
            <template v-else>
              <SelectItem
                v-for="course in courses"
                :key="course.id"
                :value="course.id"
              >
                {{ course.number }}
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="subjectId">
      <FormItem>
        <FormLabel>Оберіть предмет</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Оберіть предмет" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <template v-if="subjectsLoading || !subjects">
              <SelectItem value="loading" disabled>Завантаження...</SelectItem>
            </template>
            <template v-else>
              <SelectItem
                v-for="subject in subjects"
                :key="subject.id"
                :value="subject.id"
              >
                {{ subject.name }}
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
          <FormLabel> Чи є тест верифікованим? </FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <Button type="submit">
      {{ buttonText }}
    </Button>
  </form>
</template>
