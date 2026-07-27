<template>
  <canvas ref="canvasRef" class="live-grid-bg" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let ctx = null
let animationFrameId = null
let offscreenCanvas = null
let offscreenCtx = null

const mouse = { x: -9999, y: -9999 }
const targetMouse = { x: -9999, y: -9999 }
const GRID_SIZE = 64
const RADIUS = 150

function createOffscreenGrid(width, height, dpr) {
  offscreenCanvas = document.createElement('canvas')
  offscreenCanvas.width = width * dpr
  offscreenCanvas.height = height * dpr
  offscreenCtx = offscreenCanvas.getContext('2d')
  offscreenCtx.scale(dpr, dpr)

  const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--grid-line-color').trim() || 'rgba(255, 255, 255, 0.04)'

  offscreenCtx.clearRect(0, 0, width, height)
  offscreenCtx.strokeStyle = borderColor
  offscreenCtx.lineWidth = 1

  // Draw vertical lines
  offscreenCtx.beginPath()
  for (let x = 0; x <= width; x += GRID_SIZE) {
    offscreenCtx.moveTo(x + 0.5, 0)
    offscreenCtx.lineTo(x + 0.5, height)
  }
  // Draw horizontal lines
  for (let y = 0; y <= height; y += GRID_SIZE) {
    offscreenCtx.moveTo(0, y + 0.5)
    offscreenCtx.lineTo(width, y + 0.5)
  }
  offscreenCtx.stroke()
}

function resize() {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = window.innerWidth
  const h = window.innerHeight

  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  createOffscreenGrid(w, h, dpr)
  drawStatic()
}

function drawStatic() {
  if (!ctx || !offscreenCanvas) return
  const w = window.innerWidth
  const h = window.innerHeight
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim() || '#0A0A0C'
  
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(offscreenCanvas, 0, 0, w, h)
}

function renderFrame() {
  if (!ctx || !offscreenCanvas) return

  const w = window.innerWidth
  const h = window.innerHeight

  // Smooth mouse interpolation
  mouse.x += (targetMouse.x - mouse.x) * 0.15
  mouse.y += (targetMouse.y - mouse.y) * 0.15

  // Render base static background
  drawStatic()

  // Draw interactive node highlights
  if (mouse.x > -100 && mouse.y > -100) {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00D9A3'
    const startX = Math.max(0, Math.floor((mouse.x - RADIUS) / GRID_SIZE) * GRID_SIZE)
    const endX = Math.min(w, Math.ceil((mouse.x + RADIUS) / GRID_SIZE) * GRID_SIZE)
    const startY = Math.max(0, Math.floor((mouse.y - RADIUS) / GRID_SIZE) * GRID_SIZE)
    const endY = Math.min(h, Math.ceil((mouse.y + RADIUS) / GRID_SIZE) * GRID_SIZE)

    ctx.fillStyle = accent

    for (let x = startX; x <= endX; x += GRID_SIZE) {
      for (let y = startY; y <= endY; y += GRID_SIZE) {
        const dist = Math.hypot(x - mouse.x, y - mouse.y)
        if (dist < RADIUS) {
          const stepOpacity = dist < RADIUS * 0.33 ? 0.4 : dist < RADIUS * 0.66 ? 0.2 : 0.05
          ctx.globalAlpha = stepOpacity
          // Draw solid discrete square highlight node at grid intersection
          ctx.fillRect(x - 2, y - 2, 4, 4)
        }
      }
    }
    ctx.globalAlpha = 1
  }

  animationFrameId = requestAnimationFrame(renderFrame)
}

function onMouseMove(e) {
  targetMouse.x = e.clientX
  targetMouse.y = e.clientY
}

function onMouseLeave() {
  targetMouse.x = -9999
  targetMouse.y = -9999
}

function onTouchMove(e) {
  if (e.touches && e.touches.length > 0) {
    targetMouse.x = e.touches[0].clientX
    targetMouse.y = e.touches[0].clientY
  }
}

let themeObserver = null

onMounted(() => {
  if (!canvasRef.value) return
  resize()

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseleave', onMouseLeave, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })

  // Observe theme changes
  themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        resize()
      }
    })
  })
  themeObserver.observe(document.documentElement, { attributes: true })

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReducedMotion) {
    animationFrameId = requestAnimationFrame(renderFrame)
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (themeObserver) {
    themeObserver.disconnect()
  }
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('touchmove', onTouchMove)
})
</script>

<style scoped>
.live-grid-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background-color: var(--color-bg, #0A0A0C);
}
</style>
