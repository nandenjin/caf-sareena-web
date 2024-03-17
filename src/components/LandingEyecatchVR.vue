<template>
  <div ref="rendererContainer"></div>
</template>

<script lang="ts">
import Image11 from '@/assets/images/1-1.jpg'
import Image12 from '@/assets/images/1-2.jpg'
import Image13 from '@/assets/images/1-3.jpg'
import Image14 from '@/assets/images/1-4.jpg'
import Image15 from '@/assets/images/1-5.jpg'
import Image16 from '@/assets/images/1-6.jpg'
import Image21 from '@/assets/images/2-1.jpg'
import Image22 from '@/assets/images/2-2.jpg'
import Image23 from '@/assets/images/2-3.jpg'
import Image24 from '@/assets/images/2-4.jpg'
import Image25 from '@/assets/images/2-5.jpg'
import Image26 from '@/assets/images/2-6.jpg'
import Image31 from '@/assets/images/3-1.jpg'
import Image32 from '@/assets/images/3-2.jpg'
import Image33 from '@/assets/images/3-3.jpg'
import Image34 from '@/assets/images/3-4.jpg'
import Image35 from '@/assets/images/3-5.jpg'
import Image36 from '@/assets/images/3-6.jpg'
import Image41 from '@/assets/images/4-1.jpg'
import Image42 from '@/assets/images/4-2.jpg'
import Image43 from '@/assets/images/4-3.jpg'
import Image44 from '@/assets/images/4-4.jpg'
import Image45 from '@/assets/images/4-5.jpg'
import Image46 from '@/assets/images/4-6.jpg'
import Image51 from '@/assets/images/5-1.jpg'
import Image52 from '@/assets/images/5-2.jpg'
import Image53 from '@/assets/images/5-3.jpg'
import Image54 from '@/assets/images/5-4.jpg'
import Image55 from '@/assets/images/5-5.jpg'
import Image56 from '@/assets/images/5-6.jpg'
import Image61 from '@/assets/images/6-1.jpg'
import Image62 from '@/assets/images/6-2.jpg'
import Image63 from '@/assets/images/6-3.jpg'
import Image64 from '@/assets/images/6-4.jpg'
import Image65 from '@/assets/images/6-5.jpg'
import Image66 from '@/assets/images/6-6.jpg'

const createPosition = (xz: number, y: number) => {
  const x = Math.cos(xz)
  const z = Math.sin(xz)
  return new Vector3(x, y, z)
}

/** Configuration for picture frames */
const pictureFrameConfigs: {
  position: Vector3
  distance: number
  cycleMs: number
  pictures: string[]
}[] = [
  {
    // Slot 1
    position: createPosition(-0.3, 0.2),
    distance: 2000,
    cycleMs: 4000,
    pictures: [Image11, Image12, Image13, Image14, Image15, Image16],
  },
  {
    // Slot 2
    position: createPosition(0.35, 0.15),
    distance: 1500,
    cycleMs: 2000,
    pictures: [Image21, Image22, Image23, Image24, Image25, Image26],
  },
  {
    // Slot 3
    position: createPosition(0, 0),
    distance: 2500,
    cycleMs: 3000,
    pictures: [Image31, Image32, Image33, Image34, Image35, Image36],
  },
  {
    // Slot 4
    position: createPosition(-0.6, -0.2),
    distance: 2000,
    cycleMs: 3000,
    pictures: [Image41, Image42, Image43, Image44, Image45, Image46],
  },
  {
    // Slot 5
    position: createPosition(-0.2, -0.25),
    distance: 2000,
    cycleMs: 6000,
    pictures: [Image51, Image52, Image53, Image54, Image55, Image56],
  },
  {
    // Slot 6
    position: createPosition(0.6, -0.15),
    distance: 1500,
    cycleMs: 5000,
    pictures: [Image61, Image62, Image63, Image64, Image65, Image66],
  },
]
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js'
import { Camera, PerspectiveCamera, Scene, Vector2, Vector3 } from 'three'

const frames = ref<VRPictureFrame[]>([])

const rendererContainer = ref<HTMLDivElement | null>(null)
const renderer = ref<CSS3DRenderer | null>(null)
const scene = ref<Scene>(new Scene())
const camera = ref<Camera>(new PerspectiveCamera(40))
const isMounted = ref(false)
const pointerPosition = ref(new Vector2())
const pointerPositionSmoothed = ref(new Vector2())

class VRPictureFrame {
  domElement = document.createElement('div')
  css3DObject = new CSS3DObject(this.domElement)
  cycleMs: number
  pictures: string[] = []

  /** Unixtime in ms */
  private nextUpdate: number

  private currentImageDom: HTMLImageElement | null = null

  private _index = 0
  private get index() {
    return this._index
  }
  private set index(value) {
    // Create next image DOM
    const nextImageDom = document.createElement('img')
    nextImageDom.src = this.pictures[value]
    nextImageDom.setAttribute('alt', '')

    // When next image is loaded,
    nextImageDom.addEventListener('load', () => {
      const current = this.currentImageDom

      // If current image exists,
      if (current) {
        // Remove current image after transition
        current.addEventListener('transitionend', () => {
          this.domElement.removeChild(current!)
          this.currentImageDom = nextImageDom
          nextImageDom.classList.add('is-active')
        })
        current.classList.add('is-being-removed')
      }

      // If this is the first image,
      else {
        nextImageDom.classList.add('is-active')
        this.currentImageDom = nextImageDom
      }

      // Add next image to the dom
      this.domElement.appendChild(nextImageDom)
    })
    this._index = value
  }

  constructor(
    width: number,
    height: number,
    cycleMs: number,
    pictures: string[]
  ) {
    this.domElement.classList.add('picture-frame')
    this.domElement.style.width = width + 'px'
    this.domElement.style.height = height + 'px'
    this.domElement.style.background = '#eee'
    this.nextUpdate = Date.now() + cycleMs * Math.random()
    this.cycleMs = cycleMs
    this.pictures = pictures
  }

  tick() {
    const { nextUpdate, cycleMs, pictures, index } = this
    if (Date.now() > nextUpdate) {
      this.nextUpdate = Date.now() + cycleMs
      this.domElement.style.background = `url(${pictures[this.index]})`
      this.index = (index + 1) % pictures.length
    }
  }
}

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

onMounted(() => {
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

  // Init picture frames
  for (let i = 0; i < pictureFrameConfigs.length; i++) {
    const { position, distance, cycleMs, pictures } = pictureFrameConfigs[i]
    const frame = new VRPictureFrame(480, 320, cycleMs, pictures)

    // Positioning
    frame.css3DObject.position.copy(position).setLength(distance)
    frame.css3DObject.lookAt(0, 0, 0)

    // Add to scene
    frames.value.push(frame)
    tScene.add(frame.css3DObject)
  }

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
