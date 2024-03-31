<template>
  <div
    ref="rootDom"
    class="appear-by-scroll"
    :class="{ 'is-visible': visible }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  offset?: number
}>()

/** is-visible flag */
const visible = ref(false)

/** timer ID */
const timer = ref<ReturnType<typeof setTimeout>>()

/** Ref to root DOM element */
const rootDom = ref<HTMLDivElement>()

const tick = () => {
  const y = rootDom.value!.getBoundingClientRect().y + (props.offset || 0)
  const windowHeight = window.innerHeight

  visible.value = y < windowHeight * 0.8
}

onMounted(() => {
  window.addEventListener('scroll', tick)
  timer.value = setInterval(tick, 1000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', tick)
  clearInterval(timer.value)
})
</script>

<style scoped>
.appear-by-scroll {
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;

  &.is-visible {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
