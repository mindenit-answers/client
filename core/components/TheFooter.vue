<script lang="ts" setup>
const analytics = useAnalytics()
const config = useRuntimeConfig()
</script>

<template>
  <footer class="pt-8">
    <div class="w-full dark:bg-fiord-900 bg-fiord-100 py-8 px-4">
      <div class="container mx-auto">
        <div class="flex items-center justify-center gap-8">
          <div class="flex flex-col gap-3 md:items-center">
            <Text
              size="small"
              class="text-base font-medium text-muted-foreground"
            >
              Підтримка
            </Text>
            <NuxtLink
              :to="config.public.supportUrl"
              target="_blank"
              class="text-base hover:text-muted-foreground transition"
              @click="analytics.trackSupportButtonClicked()"
            >
              Зв'язатися з нами
            </NuxtLink>

            <div class="flex gap-4 mt-2">
              <NuxtLink :to="config.public.telegramUrl" target="_blank">
                <Icon name="ic:baseline-telegram" class="!size-7" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Text
      size="subtitle"
      class="text-center text-sm leading-5 pt-5 max-sm: px-2"
    >
      © 2025 NURE Answers. Не є офіційним ресурсом університету
    </Text>
  </footer>
</template>
