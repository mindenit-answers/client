<script lang="ts" setup>
interface Props {
  to: string
  icon: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-label="title"
    class="sm:contents max-sm:flex-1 group"
    active-class="active-link"
  >
    <div
      class="max-sm:hidden group-[.active-link]:bg-fiord-200 group-[.active-link]:dark:bg-fiord-800 group-[.active-link]:rounded-lg"
    >
      <Button variant="ghost">
        <Icon :name="icon" size="18px" /> {{ title }}
      </Button>
    </div>
    <div
      class="sm:hidden flex flex-col items-center justify-center p-2 dark:text-white text-black text-sm group-[.active-link]:bg-fiord-200 group-[.active-link]:dark:bg-fiord-800 group-[.active-link]:rounded-lg"
    >
      <div class="w-full mb-1 inline-flex items-center justify-center px-2">
        <Icon :name="icon" size="20px" />
      </div>
      <span>{{ title }}</span>
    </div>
  </NuxtLink>
</template>
