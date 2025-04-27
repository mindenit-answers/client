<script lang="ts" setup>
interface Props {
  size?: 'default' | 'big'
  mobileBadge?: boolean
}

withDefaults(defineProps<Props>(), {
  mobileBadge: false,
  size: 'default',
})
</script>

<template>
  <Icon
    v-if="!mobileBadge"
    class="md:hidden flex dark:text-christi-400 text-christi-700"
    name="lucide:badge-check"
  />

  <Badge
    variant="success"
    :size="size"
    :class="{ 'hidden md:block': !mobileBadge }"
    >Верифіковано</Badge
  >
</template>
