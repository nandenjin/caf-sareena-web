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
  font-size: 19px;
  --margin-page: 2rem;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
  }

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
}

html,
body {
  margin: 0;
}

u,
a {
  color: inherit;
  text-underline-offset: 0.2em;
}

a {
  text-decoration: dashed underline;
}

figure {
  margin: 0;
}

figcaption {
  text-align: left;
}

img[src$='.svg'] {
  user-select: none;
  pointer-events: none;
}

.font-gothic {
  font-family: 'Helvetica', Arial, 'Noto Sans JP', sans-serif;
  font-weight: bold;
  line-height: 1.8em;
  font-feature-settings: 'palt';

  [lang='en'] {
    line-height: 1.5em;
  }
}

.font-serif {
  font-family: YakuHanMP, 'EB Garamond', 'Times New Roman', 'Noto Serif JP',
    serif;
  line-height: 1.8em;
  font-feature-settings: 'palt';

  [lang='en'] {
    text-align: left;
    line-height: 1.5em;
  }
}

.text-column {
  width: 45%;

  .visual {
    line-height: 1em;

    position: fixed;
    &:is(img),
    &:not(img) img,
    &:not(img) figcaption {
      width: 25vw;
      max-width: 600px;
      font-size: 0.6em;
    }
  }

  @media screen and (max-width: 768px) {
    width: auto;

    .visual-container {
      margin: 2em 0;
    }

    .visual {
      position: static;

      &:is(img),
      &:not(img) img,
      &:not(img) figcaption {
        display: inline-block;
        width: 85%;
      }
    }
  }
}
</style>
