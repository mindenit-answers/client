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
      class="max-sm:hidden group-[.active-link]:bg-secondary group-[.active-link]:rounded-lg"
    >
      <Button variant="ghost">
        <Icon :name="icon" class="!size-4" /> {{ title }}
      </Button>
    </div>
    <div
      class="sm:hidden flex flex-col items-center justify-center p-2 text-sm group-[.active-link]:bg-secondary group-[.active-link]:rounded-lg"
    >
      <div class="w-full mb-1 inline-flex items-center justify-center px-2">
        <Icon :name="icon" class="!size-4" />
      </div>
      <span>{{ title }}</span>
    </div>
  </NuxtLink>
</template>
