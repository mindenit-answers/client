<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { statisticsOptions } from '~/core/queries'

definePageMeta({
  layout: 'admin',
})

useSeoMeta({
  title: 'Адмін панель',
})

defineOgImageComponent('Mindenit')

const { data: stats, isLoading, error } = useQuery(statisticsOptions())
</script>

<template>
  <div class="flex flex-col min-h-[80vh]">
    <TheSpinner v-if="isLoading" />

    <AnimatePresence v-else-if="error">
      <StatusCard
        type="error"
        message="Не вдалося завантажити результати пошуку. Спробуйте пізніше або напишіть
      нам про це."
        show-support
      />
    </AnimatePresence>

    <div v-else class="flex flex-col gap-4 items-center">
      <Heading size="medium">Вітаємо!</Heading>
      <BlurReveal
        :delay="0.2"
        :duration="0.75"
        class="flex flex-wrap gap-4 justify-center"
      >
        <TheCard
          :interactive="false"
          class="flex-1 min-w-[200px] max-w-sm text-center"
        >
          <Heading size="small">Курси</Heading>
          <Text size="large">{{ stats?.courses }}</Text>
        </TheCard>

        <TheCard
          :interactive="false"
          class="flex-1 min-w-[200px] max-w-sm text-center"
        >
          <Heading size="small">Факультети</Heading>
          <Text size="large">{{ stats?.faculties }}</Text>
        </TheCard>

        <TheCard
          :interactive="false"
          class="flex-1 min-w-[200px] max-w-sm text-center"
        >
          <Heading size="small">Питання</Heading>
          <Text size="large">{{ stats?.questions }}</Text>
        </TheCard>

        <TheCard
          :interactive="false"
          class="flex-1 min-w-[200px] max-w-sm text-center"
        >
          <Heading size="small">Предмети</Heading>
          <Text size="large">{{ stats?.subjects }}</Text>
        </TheCard>

        <TheCard
          :interactive="false"
          class="flex-1 min-w-[200px] max-w-sm text-center"
        >
          <Heading size="small">Тести</Heading>
          <Text size="large">{{ stats?.tests }}</Text>
        </TheCard>

        <TheCard
          :interactive="false"
          class="flex-1 min-w-[200px] max-w-sm text-center"
        >
          <Heading size="small">Університети</Heading>
          <Text size="large">{{ stats?.universities }}</Text>
        </TheCard>
      </BlurReveal>
    </div>
  </div>
</template>
