<script lang="ts" setup>
interface Props {
  testId: number
  showTestInfo?: boolean
}

withDefaults(defineProps<Props>(), {
  showTestInfo: false,
})
</script>

<template>
  <Text v-if="showTestInfo" size="subtitle">
    <NuxtLink :to="`/test/${testId}`"> Перейти до тесту </NuxtLink>
  </Text>
</template>
