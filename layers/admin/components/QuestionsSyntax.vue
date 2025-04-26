<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import { useQuery } from '@tanstack/vue-query'
import { testsOptions } from '~/layers/tests/queries'
import { toast } from 'vue-sonner'

const dataTableActions = inject<{ closeDialog?: () => void }>(
  'dataTableActions',
  { closeDialog: undefined }
)
const showValidation = ref(false)
const { getAuthToken } = useAuth()
const { data: tests, isLoading: testsLoading } = useQuery(testsOptions())
const createQuestionsMutation = useCreateTestQuestions()

const formSchema = toTypedSchema(
  z.object({
    field: z
      .string({
        required_error: 'Введіть відповідь',
      })
      .trim(),
    testId: z
      .number({
        required_error: 'Виберіть тест',
      })
      .min(1, 'Виберіть тест'),
  })
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  if (!validation.value.isValid) {
    showValidation.value = true
    return
  }

  const parsedBlocks = blocks.value
  const testId = values.testId

  const questionsToCreate = parsedBlocks.map((block) => ({
    name: block.name,
    answer: block.answer,
    isVerified: block.isVerified,
    testId,
  }))

  createQuestionsMutation.mutate(
    {
      data: {
        id: testId,
        questions: questionsToCreate,
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
        toast.success('Питання успішно створені')
      },
      onError: (error) => {
        toast.error('Помилка при створенні питання', {
          description: error.message,
        })
      },
    }
  )
})
const fieldValue = computed(() => form.values.field || '')
const { blocks, validation, addQuestion, addVerifiedQuestion, addAnswer } =
  useEditor({
    inputValue: fieldValue,
  })

const allErrors = computed(() => {
  if (validation.value && validation.value.errors) {
    return validation.value.errors
  }
  return []
})

const { alt_1, alt_2, alt_3 } = useMagicKeys()

watch([alt_1, alt_2], () => {
  if (alt_1!.value) addQuestion()
  if (alt_2!.value) addAnswer()
  if (alt_3!.value) addVerifiedQuestion()
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
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

    <FormField v-slot="{ componentField }" name="field">
      <FormItem>
        <FormLabel>Питання та відповіді</FormLabel>
        <FormControl>
          <Textarea
            class="min-h-[200px]"
            type="text"
            placeholder="# Питання 
[Відповідь 1]
[Відповідь 2]

+# Верифіковане питання
[Відповідь]"
            v-bind="componentField"
          />
        </FormControl>
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    @click="addQuestion()"
                  >
                    <Icon name="lucide:text" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Додати тайтл питання (Alt + 1)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    @click="addAnswer()"
                  >
                    <Icon name="lucide:circle-check" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Додати відповідь (Alt + 2) </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    @click="addVerifiedQuestion()"
                  >
                    <Icon name="lucide:circle-plus" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Додати верифікацію (Alt + 3) </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div class="flex gap-2">
            <Button
              type="button"
              :variant="validation.isValid ? 'outline' : 'destructive'"
              @click="showValidation = !showValidation"
            >
              {{ validation.isValid ? 'Синтаксис вірний' : 'Знайдена помилка' }}
              <span v-if="!validation.isValid"
                >({{ validation.errors.length }})</span
              >
            </Button>
          </div>
        </div>

        <FormMessage />
      </FormItem>
    </FormField>

    <div
      v-if="showValidation && !validation.isValid"
      class="mb-4 border rounded-md p-4 text-destructive"
    >
      <h3 class="font-medium mb-2">
        <Icon name="lucide:alert-circle" class="inline mr-1" />
        Помилки синтаксису ({{ allErrors.length }}):
      </h3>
      <ul class="list-disc pl-5">
        <li v-for="(syntaxError, idx) in allErrors" :key="idx">
          Строка {{ syntaxError.lineNumber }}: {{ syntaxError.message }}
        </li>
      </ul>
    </div>

    <Button type="submit" :disabled="blocks.length === 0">
      {{
        blocks.length > 0
          ? `Створити питання (${blocks.length})`
          : 'Створити питання'
      }}
    </Button>
  </form>
</template>
