<script lang="ts" setup>
const analytics = useAnalytics()
</script>

<template>
  <footer class="pt-8">
    <div class="w-full dark:bg-fiord-900 bg-fiord-100 py-8 px-4">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="flex flex-col gap-5">
            <div class="size-10">
              <NuxtImg
                class="size-full pointer-events-none dark:invert"
                src="/mindenit.svg"
                alt="Mindenit"
              />
            </div>
            <Text size="small" class="text-base font-medium leading-5">
              Mindenit – команда ентузіастів, що займається створенням сучасних
              технологічних рішень для поліпшення студентського життя.
            </Text>
          </div>

          <div class="hidden md:block"></div>

          <div class="hidden md:block"></div>

          <div class="flex flex-col gap-3 md:items-center">
            <Text
              size="small"
              class="text-base font-medium text-muted-foreground"
            >
              Підтримка
            </Text>
            <NuxtLink
              to="https://t.me/mindenit_support"
              target="_blank"
              class="text-base hover:text-muted-foreground transition"
              @click="analytics.trackSupportButtonClicked()"
            >
              Зв'язатися з нами
            </NuxtLink>
            <NuxtLink
              to="https://t.me/mindenit_support"
              target="_blank"
              class="text-base hover:text-muted-foreground transition"
              @click="analytics.trackSupportButtonClicked()"
            >
              Технічна підтримка
            </NuxtLink>

            <div class="flex gap-4 mt-2">
              <NuxtLink to="https://t.me/mindenit" target="_blank">
                <Icon name="ic:baseline-telegram" class="!size-7" />
              </NuxtLink>

              <NuxtLink to="https://discord.gg/ahKR75hU9h" target="_blank">
                <Icon name="ic:baseline-discord" class="!size-7" />
              </NuxtLink>

              <NuxtLink to="https://github.com/mindenit" target="_blank">
                <Icon name="mdi:github" class="!size-7" />
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
      © 2025 Mindenit Answers. Створено студентами для студентів. Mindenit
      Answers не є офіційним ресурсом університету
    </Text>
  </footer>
</template>
