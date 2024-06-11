<template>
  <header class="landing-eyecatch">
    <div
      class="vr-container"
      :style="{
        opacity: Math.min(1, Math.max(1 - scrollY / 500, 0)),
        display: scrollY < 500 ? 'block' : 'none',
      }"
    >
      <LandingEyecatchVR />
    </div>
    <div class="text-container">
      <h1>
        <img
          src="@/assets/design/title.svg"
          alt="スペクトルの彼方で | サリーナサッタポン / THE REALM BEYOND SPECTRUM | SAREENA SATTAPON"
          class="logo"
          decoding="async"
        />
      </h1>
      <p>
        <img
          src="@/assets/design/info.svg"
          alt="23 MARCH - 25 MAY 2024, 12:00-19:00 / OPEN THURSDAY, FRIDAY AND SATURDAY / CONTEMPORARY ART FOUNDATION - 4F PIRAMIDE BLDG., 6-6-9 ROPPONGI, MINATO-KU, TOKYO 106-0032"
          class="info"
          decoding="async"
        />
      </p>
      <a href="https://gendai-art.org/" class="caf-logo">
        <img
          src="@/assets/design/caf-logo.svg"
          alt="Contemporary Art Foundation"
          decoding="async"
        />
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import LandingEyecatchVR from './LandingEyecatchVR.vue'

const scrollY = ref(0)

const onScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Directly injected to index.html for best performance */
</style>
