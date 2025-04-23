<script setup lang="ts">
interface Link {
  name: string
  href: string
  icon: string
}

interface Props {
  link: Link
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'click', link: Link): void
}>()

const handleClick = () => {
  emit('click', props.link)
}
</script>

<template>
  <NuxtLink
    :to="link.href"
    active-class="bg-primary text-primary-foreground hover:!bg-primary"
    class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition gap-3"
    @click="handleClick"
  >
    <Icon :name="link.icon" size="18px" />
    {{ link.name }}
  </NuxtLink>
</template>
