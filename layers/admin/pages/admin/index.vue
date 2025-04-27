<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { statisticsOptions } from '~/core/queries'
import { computed } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
useSeoMeta({
  title: 'Адмін панель',
})
defineOgImageComponent('Mindenit')

const { data: stats, isLoading, error } = useQuery(statisticsOptions())

const statsItems = computed(() => {
  if (!stats.value) return []
  return [
    {
      title: 'Курси',
      value: stats.value.courses,
      icon: 'lucide:shapes',
    },
    {
      title: 'Факультети',
      value: stats.value.faculties,
      icon: 'lucide:graduation-cap',
    },
    {
      title: 'Питання',
      value: stats.value.questions,
      icon: 'lucide:message-circle-question',
    },
    {
      title: 'Предмети',
      value: stats.value.subjects,
      icon: 'lucide:book-open',
    },
    {
      title: 'Тести',
      value: stats.value.tests,
      icon: 'lucide:list-todo',
    },
    {
      title: 'Університети',
      value: stats.value.universities,
      icon: 'lucide:university',
    },
  ]
})
</script>

<template>
  <div
    class="flex flex-col min-h-[80vh] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <TheSpinner v-if="isLoading" class="mt-12" />

    <AnimatePresence v-else-if="error">
      <StatusCard
        type="error"
        message="Не вдалося завантажити результати пошуку. Спробуйте пізніше або напишіть нам про це."
        show-support
        class="mt-12"
      />
    </AnimatePresence>

    <div v-else class="flex flex-col gap-8 items-center w-full">
      <div class="text-center">
        <Heading size="medium">Вітаємо в адмін панелі!</Heading>
        <Text class="text-muted-foreground mt-2"
          >Загальна статистика платформи</Text
        >
      </div>

      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BlurReveal
          v-for="(item, index) in statsItems"
          :key="index"
          :delay="0.1"
          :duration="0.5"
        >
          <TheCard
            :interactive="false"
            class="w-full h-full shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex flex-col items-center gap-4">
              <div class="flex items-center gap-2">
                <Icon :name="item.icon" class="!size-6" />
                <Heading size="small" class="leading-none">{{
                  item.title
                }}</Heading>
              </div>

              <Text size="large" class="font-bold text-4xl">{{
                item.value
              }}</Text>
            </div>
          </TheCard>
        </BlurReveal>
      </div>
    </div>
  </div>
</template>
