<template>
  <div v-if="clicked">
    <slot></slot>
  </div>
  <div v-else @click="clicked = true">
    <slot name="placeholder"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const clicked = ref(false)
</script>
