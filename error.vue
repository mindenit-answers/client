<script setup lang="ts">
import { ERROR_TEXTS } from './core/constants/'

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
        {{ error?.message || ERROR_TEXTS.notFound }}
      </Text>

      <div class="flex max-sm:flex-col gap-2">
        <Button @click="handleError"> {{ ERROR_TEXTS.homeButton }} </Button>
        <Button @click="router.go(-1)"> {{ ERROR_TEXTS.backButton }} </Button>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col w-full items-center justify-center h-[80vh] gap-6"
    >
      <Heading size="large">
        {{ error?.statusCode || ERROR_TEXTS.defaultTitle }}
      </Heading>
      <Text size="large" class="lg:w-2/5 md:w-3/5 break-words text-center">
        {{ error?.message || ERROR_TEXTS.defaultMessage }}
      </Text>

      <Button @click="handleError"> {{ ERROR_TEXTS.homeButton }} </Button>
    </div>
  </NuxtLayout>
</template>
