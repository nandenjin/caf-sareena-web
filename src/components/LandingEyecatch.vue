<template>
  <header>
    <div
      class="vr-container"
      :style="{
        opacity: Math.min(1, Math.max(1 - scrollY / 500, 0)),
      }"
    >
      <VRview />
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
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'

const VRview = defineAsyncComponent(() => import('./LandingEyecatchVR.vue'))
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
header {
  width: 100%;
  height: 100vh;
}

.vr-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.text-container {
  position: relative;
  z-index: 2;
  max-width: 575px;
  margin: var(--margin-page);

  /* To catch pointer events by VR component */
  pointer-events: none;

  .logo {
    width: 100%;
  }

  .info {
    width: 95%;
  }

  .caf-logo {
    display: block;
    position: fixed;
    top: var(--margin-page);
    right: var(--margin-page);
    z-index: 1;
    width: 4.5rem;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 768px) {
    width: 70%;

    .caf-logo {
      position: static;
      width: 3rem;
    }
  }
}
</style>
