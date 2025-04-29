<script lang="ts" setup>
useSeoMeta({
  title: 'Головна',
})

defineOgImageComponent('Mindenit')

definePageMeta({
  layout: 'main',
})

const advanteges = ref([
  {
    icon: 'lucide:handshake',
    title: 'Взаємна допомога',
    description:
      'Поширюйте тести з іншими та отримуйте доступ до матеріалів, які допоможуть вам.',
  },
  {
    icon: 'lucide:stars',
    title: 'Ефективна підготовка',
    description: 'Ефективно готуйтеся до іспитів та отримуйте високі бали.',
  },
  {
    icon: 'lucide:users-round',
    title: 'Спільнота студентів',
    description:
      'Обговорюйте та діліться досвідом з іншими студентами для кращої підготовки.',
  },
])

const isDarkMode = computed(() => useColorMode().value === 'dark')
</script>

<template>
  <div class="flex flex-col">
    <div class="relative flex h-[90vh] w-full items-center justify-center">
      <ClientOnly>
        <BlurReveal
          :delay="0.2"
          :duration="0.75"
          class="flex flex-col items-center gap-8 text-center justfy-center md:max-w-3/4 w-full mx-auto"
        >
          <div class="flex flex-col gap-5">
            <Heading
              size="large"
              class="max-md:text-4xl font-display font-bold text-6xl"
            >
              Mindenit Answers
            </Heading>
            <Heading
              size="medium"
              class="dark:text-white"
              :class="{ 'dark-text-glow': isDarkMode }"
            >
              <span
                class="text-3xl max-md:text-xl max-md:inline-block max-md:text-nowrap text-primary dark:text-white"
              >
                Від студентів –
                <span
                  class="custom-underline relative max-md:bg-gradient-to-r after:block after:absolute after:bg-no-repeat after:bg-[length:100%_100%] after:w-[calc(100%+0.4em)] after:h-[0.3em] after:left-[-0.2em] after:top-[calc(100%-0.15em)]"
                >
                  для студентів!
                </span>
              </span>
            </Heading>
          </div>

          <Text size="paragraph" class="w-3/4 mx-auto font-medium">
            Вчитися – легко! На Mindenit Answers усі тести зібрані в одному
            місці, аби менше шукати та більше вчитися. Заходь і прокачуй знання!
          </Text>
          <div class="inline-flex gap-2 items-center">
            <Button as-child>
              <NuxtLink to="/catalogue" class="group flex items-center gap-1">
                До тестів
                <Icon
                  name="lucide:arrow-right"
                  class="transform transition-transform duration-300 ease-in-out group-hover:translate-x-1 !size-4"
                />
              </NuxtLink>
            </Button>
          </div>
        </BlurReveal>
      </ClientOnly>
      <div
        class="flex flex-col items-center gap-2 absolute bottom-4 max-md:hidden"
      >
        <Text size="subtitle">Гортай вниз!</Text>
        <Icon
          name="lucide:arrow-down"
          class="dark:text-white animate-bounce !size-6"
        />
      </div>
    </div>

    <div class="container mx-auto">
      <div class="flex flex-col items-center w-full mt-16">
        <Heading size="medium" class="text-center text-3xl font-semibold">
          Чому саме ми?
        </Heading>

        <div class="grid grid-cols-3 max-md:grid-cols-1 gap-6 mt-8">
          <div
            v-for="advantage in advanteges"
            :key="advantage.title"
            class="p-8 dark:bg-fiord-900 bg-fiord-100 flex flex-col items-center gap-3 rounded-3xl text-center"
          >
            <Icon :name="advantage.icon" class="!size-8" />
            <Heading size="small" class="text-3xl font-bold">{{
              advantage.title
            }}</Heading>
            <Text size="subtitle" class="text-base font-medium">
              {{ advantage.description }}
            </Text>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center w-full mt-16 gap-4">
        <Heading size="medium" class="text-center">
          Підтримайте проєкт!
        </Heading>

        <Text size="lead" class="w-3/4 text-center max-md:w-full">
          Підтримайте нашу ініціативу та допоможіть зробити навчання зручнішим
          для всіх! Кожен внесок – це крок до нових можливостей, корисних
          функцій і кращого досвіду для студентів.
        </Text>
        <div class="flex max-sm:flex-col gap-2">
          <Button as="a" href="https://t.me/ketronix_dev" target="_blank">
            <Icon name="lucide:message-circle-heart" class="!size-4" /> Чат
            підтримки
          </Button>

          <Button
            as="a"
            href="https://send.monobank.ua/jar/2GW9aAQNXE"
            target="_blank"
          >
            <Icon name="lucide:piggy-bank" class="!size-4" /> Банка на розробку
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-underline::after {
  content: '';
  background-image: url('/underline.svg');
}

.dark-text-glow {
  text-shadow: 0 0 24px rgba(65, 105, 225), 0 0 12px rgba(65, 105, 225);
}

.dark-underline-glow::after {
  box-shadow: 0 0 12px rgba(65, 105, 225);
}
</style>
