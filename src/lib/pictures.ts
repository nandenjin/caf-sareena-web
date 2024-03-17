import { Vector3 } from 'three'
import { CSS3DObject } from 'three/addons'

import Image11 from '@/assets/images/1-1.jpg'
import Image12 from '@/assets/images/1-2.jpg'
// import Image13 from '@/assets/images/1-3.jpg'
// import Image14 from '@/assets/images/1-4.jpg'
// import Image15 from '@/assets/images/1-5.jpg'
// import Image16 from '@/assets/images/1-6.jpg'
// import Image21 from '@/assets/images/2-1.jpg'
import Image22 from '@/assets/images/2-2.jpg'
import Image23 from '@/assets/images/2-3.jpg'
// import Image24 from '@/assets/images/2-4.jpg'
// import Image25 from '@/assets/images/2-5.jpg'
// import Image26 from '@/assets/images/2-6.jpg'
// import Image31 from '@/assets/images/3-1.jpg'
import Image32 from '@/assets/images/3-2.jpg'
// import Image33 from '@/assets/images/3-3.jpg'
import Image34 from '@/assets/images/3-4.jpg'
// import Image35 from '@/assets/images/3-5.jpg'
// import Image36 from '@/assets/images/3-6.jpg'
// import Image41 from '@/assets/images/4-1.jpg'
// import Image42 from '@/assets/images/4-2.jpg'
// import Image43 from '@/assets/images/4-3.jpg'
import Image44 from '@/assets/images/4-4.jpg'
import Image45 from '@/assets/images/4-5.jpg'
// import Image46 from '@/assets/images/4-6.jpg'
// import Image51 from '@/assets/images/5-1.jpg'
// import Image52 from '@/assets/images/5-2.jpg'
// import Image53 from '@/assets/images/5-3.jpg'
// import Image54 from '@/assets/images/5-4.jpg'
import Image55 from '@/assets/images/5-5.jpg'
import Image56 from '@/assets/images/5-6.jpg'
import Image61 from '@/assets/images/6-1.jpg'
// import Image62 from '@/assets/images/6-2.jpg'
// import Image63 from '@/assets/images/6-3.jpg'
// import Image64 from '@/assets/images/6-4.jpg'
// import Image65 from '@/assets/images/6-5.jpg'
import Image66 from '@/assets/images/6-6.jpg'

export const PLACEHOLDER_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+x8AAr8B3gzOjaQAAAAASUVORK5CYII='

const imageCache: Record<string, string | Promise<string>> = {}
export const fetchImage = (url: string) => {
  if (imageCache[url]) {
    return Promise.resolve(imageCache[url])
  } else {
    const task = fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        imageCache[url] = URL.createObjectURL(blob)
        return URL.createObjectURL(blob)
      })
    imageCache[url] = task
    return task
  }
}

const createPosition = (xz: number, y: number) => {
  const x = Math.cos(xz)
  const z = Math.sin(xz)
  return new Vector3(x, y, z)
}

export type PictureAsset = {
  position: Vector3
  distance: number
  cycleMs: number
  urls: string[]
}

/** Configuration for picture frames */
export const pictures: PictureAsset[] = [
  {
    // Slot 1
    position: createPosition(-0.4, 0.2),
    distance: 1800,
    cycleMs: 4200,
    urls: [Image11, Image22, Image32, Image44, Image55, Image66],
  },
  {
    // Slot 2
    position: createPosition(0.35, 0.15),
    distance: 1500,
    cycleMs: 2100,
    urls: [Image23, Image34, Image45, Image55, Image61, Image12],
  },
  {
    // Slot 3
    position: createPosition(-0.05, 0),
    distance: 1500,
    cycleMs: 2500,
    urls: [Image11, Image22, Image32, Image44, Image55, Image66],
  },
  {
    // Slot 4
    position: createPosition(-0.6, -0.2),
    distance: 2000,
    cycleMs: 3300,
    urls: [Image23, Image34, Image45, Image55, Image61, Image12],
  },
  {
    // Slot 5
    position: createPosition(-0.2, -0.3),
    distance: 1500,
    cycleMs: 5500,
    urls: [Image11, Image22, Image32, Image44, Image55, Image66],
  },
  {
    // Slot 6
    position: createPosition(0.5, -0.15),
    distance: 1500,
    cycleMs: 5000,
    urls: [Image23, Image34, Image45, Image56, Image61, Image12],
  },
]

export class VRPictureFrame {
  domElement = document.createElement('div')
  css3DObject = new CSS3DObject(this.domElement)
  cycleMs: number
  pictures: string[] = []

  /** Unixtime in ms */
  private nextUpdate: number

  private currentImageDom: HTMLImageElement | null = null

  private index: number = -1

  constructor(width: number, height: number, cycleMs: number) {
    this.domElement.classList.add('picture-frame')
    this.domElement.style.width = width + 'px'
    this.domElement.style.height = height + 'px'
    this.domElement.style.background = '#eee'
    this.nextUpdate = Date.now() + cycleMs * Math.random()
    this.cycleMs = cycleMs
  }

  setPictures(pictures: string[]) {
    this.pictures = pictures
  }
  setIndex(value: number) {
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
          current.parentElement?.removeChild(current!)
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
    this.index = value
  }

  forceUpdate() {
    this.nextUpdate = 0
  }

  tick() {
    const { nextUpdate, cycleMs, pictures, index } = this
    if (Date.now() > nextUpdate) {
      this.nextUpdate = Date.now() + cycleMs
      this.setIndex(
        (index + Math.floor(Math.random() * pictures.length)) % pictures.length
      )
    }
  }
}
