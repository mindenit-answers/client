<script lang="ts" setup>
interface Props {
  testId: number
  showTestInfo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTestInfo: false,
})
</script>

<template>
  <Text v-if="props.showTestInfo" size="subtitle">
    <NuxtLink :to="`/test/${props.testId}`"> Перейти до тесту </NuxtLink>
  </Text>
</template>
