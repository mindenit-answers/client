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

interface Props {
  id: number
  isVerified: boolean
  showTestInfo?: boolean
  testId?: number
  questionTitle?: string
}

interface Emits {
  share: []
}

const props = withDefaults(defineProps<Props>(), {
  showTestInfo: false,
  testId: 0,
  questionTitle: '',
})

defineEmits<Emits>()

const { sendReport, isSubmitting, canSendReport, remainingCooldownSeconds } =
  useReport()
const isDialogOpen = ref(false)

const formSchema = toTypedSchema(
  z.object({
    description: z
      .string({
        required_error: "Це поле обов'язкове",
      })
      .trim(),
    contact: z.string().trim().optional(),
  })
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  sendReport({
    id: props.id,
    testId: props.testId,
    questionTitle: props.questionTitle,
    description: values.description,
    contact: values.contact,
  })
  isDialogOpen.value = false
})
</script>

<template>
  <div class="flex items-center gap-2 justify-between">
    <div class="inline-flex items-center gap-2">
      <Badge variant="secondary">
        ID:
        {{ id }}
      </Badge>
      <VerifiedBadge v-if="isVerified" type="question" mobile-badge />
    </div>

    <div class="inline-flex gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button as-child size="icon">
              <NuxtLink v-if="showTestInfo" :to="`/test/${testId}`">
                <Icon name="lucide:link" size="16px" />
              </NuxtLink>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Перейти до тесту</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" @click="$emit('share')">
              <Icon name="lucide:share-2" size="16px" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Поділитись</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog v-model:open="isDialogOpen">
        <TooltipProvider>
          <Tooltip>
            <DialogTrigger as-child>
              <TooltipTrigger as-child>
                <Button
                  variant="destructive"
                  size="icon"
                  @click="isDialogOpen = true"
                >
                  <Icon name="lucide:flag" size="16px" />
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Поскаржитись на питання</DialogTitle>
                    <DialogDescription>
                      Якщо ви вважаєте шо в питанні помилка - опишіть її нижче.
                      Ми перевіримо вашу скаргу і виправимо помилку.
                    </DialogDescription>

                    <form class="flex flex-col gap-4" @submit="onSubmit">
                      <FormField v-slot="{ componentField }" name="description">
                        <FormItem>
                          <FormLabel>Опишіть знайдену помилку</FormLabel>
                          <FormControl>
                            <Textarea
                              type="text"
                              placeholder="..."
                              v-bind="componentField"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormField>

                      <FormField v-slot="{ componentField }" name="contact">
                        <FormItem>
                          <FormLabel>Ваш контакт (необов'язково)</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="..."
                              v-bind="componentField"
                            />
                          </FormControl>
                          <FormDescription>
                            Бажано надати ваш логін в Telegram
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </FormField>

                      <Button
                        class="w-full"
                        type="submit"
                        :disabled="!canSendReport"
                      >
                        <span v-if="isSubmitting">Відправка...</span>
                        <span v-else-if="!canSendReport"
                          >Зачекайте {{ remainingCooldownSeconds }}с</span
                        >
                        <span v-else>Відправити</span>
                      </Button>
                    </form>
                  </DialogHeader>
                </DialogContent>
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent>Поскаржитись</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Dialog>
    </div>
  </div>
</template>
