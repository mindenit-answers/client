<script setup lang="ts">
import { Link } from '@mindenit/ui'
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
            <Text
              size="small"
              class="text-base font-medium leading-5 dark:text-white"
            >
              Mindenit – команда ентузіастів, що займається створенням сучасних
              технологічних рішень для поліпшення студентського життя.
            </Text>
          </div>

          <div class="hidden md:block"></div>

          <div class="flex flex-col gap-3 md:items-center">
            <Text
              size="small"
              class="text-base font-medium dark:text-fiord-500 text-fiord-500"
            >
              Наші сервіси
            </Text>
            <Link as-child>
              <NuxtLink
                to="https://sh.mindenit.org"
                target="_blank"
                class="text-base dark:text-white hover:text-fiord-600 dark:hover:text-fiord-400 transition"
              >
                Mindenit Schedule
              </NuxtLink>
            </Link>
          </div>

          <div class="flex flex-col gap-3 md:items-center">
            <Text
              size="small"
              class="text-base font-medium dark:text-fiord-500 text-fiord-500"
            >
              Підтримка
            </Text>
            <Link as-child>
              <NuxtLink
                to="https://t.me/mindenit_support"
                target="_blank"
                class="text-base dark:text-white hover:text-fiord-600 dark:hover:text-fiord-400 transition"
              >
                Зв'язатися з нами
              </NuxtLink>
            </Link>
            <NuxtLink
              to="https://t.me/mindenit_support"
              target="_blank"
              class="text-base dark:text-white hover:text-fiord-600 dark:hover:text-fiord-400 transition"
            >
              Технічна підтримка
            </NuxtLink>

            <div class="flex gap-4 mt-2">
              <NuxtLink to="https://t.me/mindenit" target="_blank">
                <Icon
                  name="ic:baseline-telegram"
                  size="26px"
                  class="dark:text-white"
                />
              </NuxtLink>

              <NuxtLink to="https://discord.gg/ahKR75hU9h" target="_blank">
                <Icon
                  name="ic:baseline-discord"
                  size="26px"
                  class="dark:text-white"
                />
              </NuxtLink>

              <NuxtLink to="https://github.com/mindenit" target="_blank">
                <Icon name="mdi:github" size="26px" class="dark:text-white" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Text size="subtitle" class="text-center text-sm leading-5 pt-5">
      © 2025 Mindenit Answers. Створено студентами для студентів. Mindenit
      Answers не є офіційним ресурсом університету
    </Text>
  </footer>
</template>
