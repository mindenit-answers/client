<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import { toast } from 'vue-sonner'

useSeoMeta({
  title: 'Вхід в систему',
  description:
    'Вхід в систему Mindenit Answers. На цій сторінці ви можете увійти в систему, щоб отримати доступ до всіх функцій платформи.',
})

defineOgImageComponent('Mindenit')

const { login } = useAuth()
const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'Введіть пошту',
      })
      .email('Введіть коректну пошту')
      .trim(),
    password: z
      .string({
        required_error: 'Введіть пароль',
      })
      .min(4, 'Пароль повинен містити принаймні 4 символи')
      .trim(),
  })
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await login({
      email: values.email,
      password: values.password,
    })

    toast.success('Ви успішно авторизувались!')

    router.push('/')
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Невідома помилка'
    toast.error('Не вдалось авторизуватись', {
      description: errorMessage,
    })
  }
})
</script>

<template>
  <div class="flex w-full h-[80vh] items-center justify-center">
    <TheCard :interactive="false" class="w-sm !h-fit">
      <Heading size="tiny" class="text-center">Авторизація</Heading>

      <form class="flex flex-col gap-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Пошта</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="example@gmail.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Пароль</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Введіть пароль"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit"> Авторизуватись </Button>
      </form>
    </TheCard>
  </div>
</template>
