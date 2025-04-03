<script setup lang="ts">
const error = useError()

const handleError = () => {
  clearError({
    redirect: '/',
  })
}

const router = useRouter()
</script>

<template>
  <NuxtLayout>
    <div
      v-if="error?.statusCode === 404"
      class="flex flex-col w-full items-center justify-center h-[80vh] gap-6"
    >
      <Heading
        size="large"
        class="dark:bg-fiord-900 bg-fiord-100 rounded-xl p-5 border border-fiord-300 dark:border-fiord-700"
      >
        {{ error?.statusCode }}
      </Heading>
      <Text size="large" class="lg:w-2/5 md:w-3/5 break-words text-center">
        {{
          error?.message ||
          'На жаль, сторінка, яку ви шукаєте, не знайдена. Можливо, вона була видалена або переміщена.'
        }}
      </Text>

      <div class="flex max-sm:flex-col gap-2">
        <Button @click="handleError"> На головну </Button>
        <Button @click="router.go(-1)"> Повернутися назад </Button>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col w-full items-center justify-center h-[80vh] gap-6"
    >
      <Heading size="large">
        {{ error?.statusCode || 'Ой!' }}
      </Heading>
      <Text size="large" class="lg:w-2/5 md:w-3/5 break-words text-center">
        {{ error?.message || 'Сталася невідома помилка' }}
      </Text>

      <Button @click="handleError"> На головну </Button>
    </div>
  </NuxtLayout>
</template>
