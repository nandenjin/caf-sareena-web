<template>
  <div class="vr-root" :class="{ 'is-loading': isLoading }">
    <div ref="rendererContainer" class="renderer"></div>
    <div class="loading"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { CSS3DRenderer } from 'three/addons'
import { Camera, PerspectiveCamera, Scene, Vector2 } from 'three'
import {
  PictureAsset,
  VRPictureFrame,
  fetchImage,
  pictures,
} from '../lib/pictures'

const frames = ref<VRPictureFrame[]>([])

const rendererContainer = ref<HTMLDivElement | null>(null)
const renderer = ref<CSS3DRenderer | null>(null)
const scene = ref<Scene>(new Scene())
const camera = ref<Camera>(new PerspectiveCamera(40))
const isMounted = ref(false)
const pointerPosition = ref(new Vector2())
const pointerPositionSmoothed = ref(new Vector2())
const loadingState = reactive({
  total: 0,
  loaded: 0,
})
const isLoading = computed(() => loadingState.total > loadingState.loaded)

/** Resize renderer with window size */
const handleCanvasResize = () => {
  renderer.value?.setSize(window.innerWidth, window.innerHeight)
}

const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2
  const y = (e.clientY / window.innerHeight - 0.5) * 2

  pointerPosition.value.set(x, y)
}

const handleOrientation = (e: DeviceOrientationEvent) => {
  const x = e.gamma ? -e.gamma / 90 : 0
  const y = 0 // e.beta ? -e.beta / 90 : 0

  pointerPosition.value.set(x, y)
}

/** Render the scene */
const render = () => {
  if (!isMounted.value) return

  // Update picture frames
  for (const frame of frames.value) {
    frame.tick()
  }

  const tRenderer = renderer.value,
    tScene = scene.value,
    tCamera = camera.value,
    tPointerPosition = pointerPosition.value,
    tPointerPositionSmoothed = pointerPositionSmoothed.value

  // Smooth pointer position
  const smoothRatio = 0.1
  tPointerPositionSmoothed.set(
    tPointerPosition.x * smoothRatio +
      tPointerPositionSmoothed.x * (1 - smoothRatio),
    tPointerPosition.y * smoothRatio +
      tPointerPositionSmoothed.y * (1 - smoothRatio)
  )

  const { x, y } = tPointerPositionSmoothed

  // Map pointer position to camera rotation
  const v = (x: number) => 1 - 1 / (x + 1)
  const rotationY = (Math.PI / 6) * (x > 0 ? v(x) : -v(-x))
  const rotationX = (Math.PI / 24) * (y > 0 ? -v(y) : v(-y))
  tCamera.lookAt(Math.cos(rotationY), Math.sin(rotationX), Math.sin(rotationY))

  // Render scene
  tRenderer?.render(tScene, tCamera)

  requestAnimationFrame(render)
}

onMounted(async () => {
  if (!rendererContainer.value) {
    console.error('rendererContainer is not found')
    return
  }

  const tScene = scene.value,
    tCamera = camera.value

  // Init renderer
  const tRenderer = new CSS3DRenderer({
    element: rendererContainer.value,
  })
  renderer.value = tRenderer

  // Init camera
  tCamera.position.set(0, 0, 0)
  tCamera.lookAt(1, 0, 0)

  isMounted.value = true

  handleCanvasResize()

  window.addEventListener('resize', handleCanvasResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('deviceorientation', handleOrientation)

  // Start render loop
  render()

  loadingState.loaded = 0
  loadingState.total = 0

  const loadingTasks: Promise<PictureAsset>[] = []
  for (const picture of pictures) {
    loadingState.total += picture.urls.length

    loadingTasks.push(
      Promise.all(
        picture.urls.map((url: string) =>
          fetchImage(url).then((url) => {
            loadingState.loaded++
            return url
          })
        )
      ).then((urls) => ({
        ...picture,
        urls,
      }))
    )
  }

  Promise.all(loadingTasks).then((pictureFrameConfigs) => {
    // Init picture frames
    for (let i = 0; i < pictureFrameConfigs.length; i++) {
      const { position, distance, cycleMs, urls } = pictureFrameConfigs[i]
      const frame = new VRPictureFrame(480, 320, cycleMs)
      frame.setPictures(urls)
      frame.setIndex(Math.floor(urls.length * Math.random()))

      // Positioning
      frame.css3DObject.position.copy(position).setLength(distance)
      frame.css3DObject.lookAt(0, 0, 0)

      // Add to scene
      frames.value.push(frame)
      tScene.add(frame.css3DObject)
    }
  })
})

onUnmounted(() => {
  isMounted.value = false

  const tScene = scene.value
  tScene?.clear()

  window.removeEventListener('resize', handleCanvasResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('deviceorientation', handleOrientation)
})
</script>

<style scoped>
.vr-root {
  position: relative;

  .renderer {
    transition: opacity 0.3s;
  }

  .loading {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    transition: opacity 0.3s;

    &::before {
      content: '';
      display: block;
      width: 1rem;
      height: 1rem;
      border: 0.3rem solid #000;
      border-color: #000 #000 #000 transparent;
      border-radius: 50%;
      animation-name: loading-rotate;
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }

  &.is-loading {
    .renderer {
      opacity: 0;
    }
  }

  &:not(.is-loading) {
    .loading {
      opacity: 0;
    }
  }
}

@keyframes loading-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<style>
.picture-frame {
  /*
    State transition:
      1. next image is loaded and added to the dom
      2. current image is now 'is-active is-being-removed' and fades out
      3. current image is removed from the dom & next image is now 'is-active'
   */
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;

    &.is-active {
      transition: opacity 0.5s;
    }

    &.is-being-removed {
      opacity: 0;
      z-index: 1;
    }
  }
}
</style>
