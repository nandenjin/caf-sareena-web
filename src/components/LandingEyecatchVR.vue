<template>
  <div ref="rendererContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js'
import { Camera, PerspectiveCamera, Scene, Vector2, Vector3 } from 'three'

import Image0 from '@/assets/images/image_0.jpg'
import Image1 from '@/assets/images/image_1.jpg'
// import Image2 from '@/assets/images/image_2.jpg'
import Image3 from '@/assets/images/image_3.jpg'
import Image4 from '@/assets/images/image_4.jpg'
import Image5 from '@/assets/images/image_5.jpg'
import Image6 from '@/assets/images/image_6.jpg'

const pictures = [Image0, Image1, Image3, Image4, Image5, Image6]
const frames = ref<VRPictureFrame[]>([])

const rendererContainer = ref<HTMLDivElement | null>(null)
const renderer = ref<CSS3DRenderer | null>(null)
const scene = ref<Scene>(new Scene())
const camera = ref<Camera>(new PerspectiveCamera(40))
const isMounted = ref(false)
const pointerPosition = ref(new Vector2())

class VRPictureFrame {
  domElement = document.createElement('div')
  css3DObject = new CSS3DObject(this.domElement)
  cycleMs: number

  private nextUpdate: number
  private _index = 0
  private get index() {
    return this._index
  }
  private set index(value) {
    const nextImageDom = document.createElement('img')
    nextImageDom.src = pictures[value]
    nextImageDom.addEventListener('load', () => {
      const current = this.currentImageDom
      if (current) {
        current.addEventListener('transitionend', () => {
          this.domElement.removeChild(current!)
          this.currentImageDom = nextImageDom
          nextImageDom.classList.add('is-active')
        })
        current.classList.add('is-being-removed')
      } else {
        nextImageDom.classList.add('is-active')
        this.currentImageDom = nextImageDom
      }
      this.domElement.appendChild(nextImageDom)
    })
    this._index = value
  }
  private currentImageDom: HTMLImageElement | null = null

  constructor(
    width: number,
    height: number,
    cycleMs: number,
    initialImageIndex: number = 0
  ) {
    this.domElement.classList.add('picture-frame')
    this.domElement.style.width = width + 'px'
    this.domElement.style.height = height + 'px'
    this.domElement.style.background = '#eee'
    this.nextUpdate = Date.now() + cycleMs * Math.random()
    this.cycleMs = cycleMs
    this.index = initialImageIndex
  }

  tick() {
    if (Date.now() > this.nextUpdate) {
      this.nextUpdate = Date.now() + this.cycleMs
      this.domElement.style.background = `url(${pictures[this.index]})`
      this.index = (this.index + 1) % pictures.length
    }
  }
}

const onResize = () => {
  if (!renderer.value) {
    return
  }

  renderer.value.setSize(window.innerWidth, window.innerHeight)
}

const onMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2
  const y = (e.clientY / window.innerHeight - 0.5) * 2
  pointerPosition.value.set(x, y)
}

const render = () => {
  if (!isMounted.value) return

  for (const frame of frames.value) {
    frame.tick()
  }

  const tRenderer = renderer.value,
    tScene = scene.value,
    tCamera = camera.value,
    tPointerPosition = pointerPosition.value

  const v = (x: number) => 1 - 1 / (x + 1)
  const x = tPointerPosition.x,
    y = tPointerPosition.y
  const rotationY = (Math.PI / 6) * (x > 0 ? v(x) : -v(-x))
  const rotationX = (Math.PI / 24) * (y > 0 ? -v(y) : v(-y))
  tCamera.lookAt(Math.cos(rotationY), Math.sin(rotationX), Math.sin(rotationY))

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
  const tRenderer = new CSS3DRenderer({
    element: rendererContainer.value,
  })

  renderer.value = tRenderer

  const createPosition = (xz: number, y: number) => {
    const x = Math.cos(xz)
    const z = Math.sin(xz)
    return new Vector3(x, y, z)
  }
  const pictureFrameConfigs: {
    position: Vector3
    distance: number
    cycleMs: number
  }[] = [
    {
      position: createPosition(-0.6, -0.2),
      distance: 2000,
      cycleMs: 3000,
    },
    {
      position: createPosition(-0.3, 0.2),
      distance: 2000,
      cycleMs: 4000,
    },
    {
      position: createPosition(-0.2, -0.25),
      distance: 2000,
      cycleMs: 6000,
    },
    {
      position: createPosition(0, 0),
      distance: 2500,
      cycleMs: 3000,
    },
    {
      position: createPosition(0.35, 0.15),
      distance: 1500,
      cycleMs: 2000,
    },
    {
      position: createPosition(0.6, -0.15),
      distance: 1500,
      cycleMs: 5000,
    },
  ]

  let i = 0
  for (const { position, distance, cycleMs } of pictureFrameConfigs) {
    const frame = new VRPictureFrame(480, 320, cycleMs, i % pictures.length)
    frame.css3DObject.position.copy(position).setLength(distance)
    frame.css3DObject.lookAt(0, 0, 0)
    frames.value.push(frame)
    tScene.add(frame.css3DObject)
    i++
  }

  tCamera.position.set(0, 0, 0)
  tCamera.lookAt(1, 0, 0)

  isMounted.value = true

  onResize()
  render()
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  isMounted.value = false

  const tScene = scene.value
  tScene?.clear()

  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
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
