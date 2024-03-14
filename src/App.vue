<script setup lang="ts">
import LandingGreeting from './components/LandingGreeting.vue'
import LandingStatement from './components/LandingStatement.vue'
import LandingFooter from './components/LandingFooter.vue'
import LandingEyecatch from './components/LandingEyecatch.vue'
import LandingAbout from './components/LandingAbout.vue'
import LandingInfo from './components/LandingInfo.vue'
</script>

<template>
  <div>
    <LandingEyecatch />
    <LandingGreeting />
    <LandingStatement />
    <LandingInfo />
    <LandingAbout />
    <LandingFooter />
  </div>
</template>

<style>
:root {
  font-size: 24px;
  --margin-page: 2rem;

  @media screen and (max-width: 1200px) {
    font-size: 2vw;
  }

  @media screen and (max-width: 768px) {
    font-size: 4vw;
  }
}

html,
body {
  margin: 0;
}

u {
  text-underline-offset: 0.2em;
}

img[src$='.svg'] {
  user-select: none;
  pointer-events: none;
}

.font-gothic {
  font-family: 'Helvetica', Arial, 'Noto Sans JP', sans-serif;
  font-weight: bold;
  letter-spacing: -0.05em;
  line-height: 1.8em;
  font-feature-settings: 'palt';

  [lang='en'] {
    line-height: 1.5rem;
  }
}

.font-serif {
  font-family: Garamond, 'Times New Roman', 'Noto Serif JP', serif;
  line-height: 1.8em;
  font-weight: bold;
  font-feature-settings: 'palt';

  [lang='en'] {
    font-weight: normal;
  }
}

.text-column {
  width: 50%;

  @media screen and (max-width: 768px) {
    width: auto;
  }
}
</style>
