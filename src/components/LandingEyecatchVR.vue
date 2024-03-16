<template>
  <div ref="rendererContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js'
import { Camera, PerspectiveCamera, Scene, Vector2, Vector3 } from 'three'

const rendererContainer = ref<HTMLDivElement | null>(null)
const renderer = ref<CSS3DRenderer | null>(null)
const scene = ref<Scene>(new Scene())
const camera = ref<Camera>(new PerspectiveCamera(40))
const isMounted = ref(false)
const pointerPosition = ref(new Vector2())

class VRPictureFrame {
  domElement = document.createElement('div')
  css3DObject = new CSS3DObject(this.domElement)

  constructor() {
    this.domElement.style.width = '480px'
    this.domElement.style.height = '360px'
    this.domElement.style.background = '#eee'
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

  const pictureFrameConfigs: {
    position: Vector3
    distance: number
    cycleMs: number
  }[] = [
    {
      position: new Vector3(
        Math.cos(-Math.PI / 6),
        -0.2,
        Math.sin(-Math.PI / 6)
      ),
      distance: 2000,
      cycleMs: 3000,
    },
    {
      position: new Vector3(Math.cos(-0.3), 0.2, Math.sin(-0.3)),
      distance: 2000,
      cycleMs: 4000,
    },
    {
      position: new Vector3(Math.cos(-0.2), -0.25, Math.sin(-0.2)),
      distance: 2000,
      cycleMs: 1000,
    },
    {
      position: new Vector3(Math.cos(0), 0, Math.sin(0)),
      distance: 2500,
      cycleMs: 3000,
    },
    {
      position: new Vector3(Math.cos(0.3), 0.15, Math.sin(0.3)),
      distance: 1500,
      cycleMs: 2000,
    },
    {
      position: new Vector3(Math.cos(0.45), -0.15, Math.sin(0.45)),
      distance: 1500,
      cycleMs: 5000,
    },
  ]
  const pictureFrames: VRPictureFrame[] = []
  for (let i = 0; i < pictureFrameConfigs.length; i++) {
    const frame = new VRPictureFrame()
    frame.css3DObject.position
      .copy(pictureFrameConfigs[i].position)
      .setLength(pictureFrameConfigs[i].distance)
    frame.css3DObject.lookAt(0, 0, 0)
    pictureFrames.push(frame)
    tScene.add(frame.css3DObject)
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
