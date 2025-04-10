<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, onMounted, watchEffect, useSlots } from 'vue'

interface Props {
  duration?: number
  delay?: number
  blur?: string
  yOffset?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1,
  delay: 2,
  blur: '20px',
  yOffset: 20,
})

const container = ref(null)
const childElements = ref([])
const slots = useSlots()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const children = ref<any>([])
const animatedElements = ref<boolean[]>([])

onMounted(() => {
  // This will reactively capture all content provided in the default slot
  watchEffect(() => {
    children.value = slots.default ? slots.default() : []
    animatedElements.value = Array(children.value.length).fill(false)
  })
})

function getInitial(index: number) {
  if (animatedElements.value[index]) {
    return {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
    }
  }
  return {
    opacity: 0,
    filter: `blur(${props.blur})`,
    y: props.yOffset,
  }
}

function getAnimate(index: number) {
  animatedElements.value[index] = true

  return {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
  }
}

function shouldAnimate(index: number) {
  return !animatedElements.value[index]
}
</script>

<template>
  <div ref="container" :class="props.class">
    <Motion
      v-for="(child, index) in children"
      :key="index"
      ref="childElements"
      as="div"
      :initial="getInitial(index)"
      :in-view="shouldAnimate(index) ? getAnimate(index) : undefined"
      :transition="{
        duration: props.duration,
        easing: 'easeInOut',
        delay: props.delay * index,
      }"
    >
      <component :is="child" />
    </Motion>
  </div>
</template>
