<script lang="ts" setup>
import type { Question } from '@mindenit/answers-kit'

interface Props {
  questions: Question[]
  activeQuestionId: number | null
}

interface Emits {
  'question-click': [id: number]
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <aside
    class="md:w-60 max-md:hidden flex flex-col h-[calc(100vh-1.5rem)] transition-all bg-fiord-50 dark:bg-fiord-900 rounded-lg border-fiord-300 dark:border-fiord-700 border overflow-y-auto sticky top-2 w-full"
  >
    <div class="p-4 flex flex-col gap-2">
      <button
        v-for="(question, index) in questions"
        :key="question.id"
        class="w-full text-left px-4 py-2 rounded-lg transition-all text-sm group relative dark:text-white cursor-pointer hover:bg-gradient-to-r hover:dark:from-fiord-700 hover:from-fiord-300 hover:to-transparent truncate focus:outline-none"
        :class="[
          activeQuestionId === question.id
            ? 'bg-gradient-to-r dark:from-royal-blue-500/100 from-royal-blue-300/100 to-transparent'
            : '',
        ]"
        :aria-label="`До питання ${index + 1}: ${question.name}`"
        :aria-current="activeQuestionId === question.id ? 'true' : undefined"
        @click="$emit('question-click', question.id)"
      >
        <span class="mr-2 text-gray-500 dark:text-gray-400"
          >{{ index + 1 }}.</span
        >
        {{ question.name }}
      </button>
    </div>
  </aside>
</template>

<style scoped>
aside {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

aside::-webkit-scrollbar {
  display: none;
}
</style>
