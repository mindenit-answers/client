<script lang="ts" setup>
interface Props {
  to: string
  icon: string
  title: string
}
const props = defineProps<Props>()
const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

<template>
  <NuxtLink :to="to" :aria-label="title" class="sm:contents max-sm:flex-1">
    <div
      class="max-sm:hidden"
      :class="{ 'bg-fiord-200 dark:bg-fiord-800 rounded-lg': isActive }"
    >
      <Button variant="ghost" class="hover:cursor-pointer">
        <Icon :name="icon" size="18px" /> {{ title }}
      </Button>
    </div>

    <div
      class="sm:hidden flex flex-col items-center justify-center p-2 dark:text-white text-black text-sm"
      :class="{ 'bg-fiord-200 dark:bg-fiord-800 rounded-lg': isActive }"
    >
      <div class="w-full mb-1 inline-flex items-center justify-center px-2">
        <Icon :name="icon" size="20px" />
      </div>
      <span>{{ title }}</span>
    </div>
  </NuxtLink>
</template>
