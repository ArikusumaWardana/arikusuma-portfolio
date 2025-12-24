<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let particles = []
let animationId = null
let mouse = { x: null, y: null, radius: 150 }

const particleCount = 80
const connectionDistance = 120
const particleSpeed = 0.5

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = Math.random() * 3 + 1
    this.speedX = (Math.random() - 0.5) * particleSpeed
    this.speedY = (Math.random() - 0.5) * particleSpeed
    this.baseX = x
    this.baseY = y
  }

  update(width, height) {
    // Mouse interaction
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius
        const forceX = dx / distance * force * 2
        const forceY = dy / distance * force * 2
        this.x -= forceX
        this.y -= forceY
      }
    }

    // Normal movement
    this.x += this.speedX
    this.y += this.speedY

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.speedX *= -1
    if (this.y < 0 || this.y > height) this.speedY *= -1

    // Keep within bounds
    if (this.x < 0) this.x = 0
    if (this.x > width) this.x = width
    if (this.y < 0) this.y = 0
    if (this.y > height) this.y = height
  }

  draw(ctx, particleColor) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = particleColor
    ctx.fill()
  }
}

function getComputedColor(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

function init() {
  if (!canvas.value) return

  ctx = canvas.value.getContext('2d')
  resize()
  createParticles()
  animate()
}

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function createParticles() {
  particles = []
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * canvas.value.width
    const y = Math.random() * canvas.value.height
    particles.push(new Particle(x, y))
  }
}

function connectParticles(lineColor) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < connectionDistance) {
        const opacity = 1 - distance / connectionDistance
        ctx.beginPath()
        ctx.strokeStyle = lineColor.replace(')', `, ${opacity * 0.5})`)
        ctx.lineWidth = 1
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

function animate() {
  if (!ctx || !canvas.value) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Get primary hue from CSS variables for dynamic color matching
  const primaryHue = getComputedColor('--primary-hue') || '210'
  const particleColor = `hsla(${primaryHue}, 70%, 55%, 0.5)`
  const lineColor = `hsla(${primaryHue}, 70%, 55%`

  particles.forEach(particle => {
    particle.update(canvas.value.width, canvas.value.height)
    particle.draw(ctx, particleColor)
  })

  connectParticles(lineColor)
  animationId = requestAnimationFrame(animate)
}

function handleMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function handleMouseLeave() {
  mouse.x = null
  mouse.y = null
}

function handleResize() {
  resize()
  createParticles()
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-background, -1);
  pointer-events: none;
}
</style>
