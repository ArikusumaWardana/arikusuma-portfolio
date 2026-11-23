<template>
  <div
    v-if="enabled"
    class="pointer-events-none fixed inset-0 z-[60] hidden lg:block"
    aria-hidden="true"
  >
    <!-- Outer Crimson Diamond Outline (Smooth Lagged Lerp) -->
    <div
      ref="outerRef"
      class="fixed top-0 left-0 h-6 w-6 will-change-transform transition-[opacity,background-color] duration-200"
      :class="[
        visible ? 'opacity-100' : 'opacity-0',
        hoveringInteractive ? 'bg-[#D63A49]/12' : 'bg-transparent'
      ]"
      style="margin-left: -12px; margin-top: -12px; border: 1.5px solid #D63A49;"
    ></div>

    <!-- Inner Crisp Crimson Diamond Core -->
    <div
      ref="innerRef"
      class="fixed top-0 left-0 h-1.5 w-1.5 bg-[#D63A49] will-change-transform transition-opacity duration-150"
      :class="visible ? 'opacity-100' : 'opacity-0'"
      style="margin-left: -3px; margin-top: -3px;"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [role="tab"]'

const enabled = ref(false)
const visible = ref(false)
const hoveringInteractive = ref(false)
const outerRef = ref(null)
const innerRef = ref(null)

let rafId = null
let targetX = -100
let targetY = -100
let outerX = -100
let outerY = -100
let innerX = -100
let innerY = -100
let currentScale = 1
let currentAngle = 45

function loop() {
  outerX += (targetX - outerX) * 0.16
  outerY += (targetY - outerY) * 0.16
  innerX += (targetX - innerX) * 0.42
  innerY += (targetY - innerY) * 0.42

  const targetScale = hoveringInteractive.value ? 1.65 : 1
  const targetAngle = hoveringInteractive.value ? 135 : 45
  currentScale += (targetScale - currentScale) * 0.18
  currentAngle += (targetAngle - currentAngle) * 0.18

  if (outerRef.value) {
    outerRef.value.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) rotate(${currentAngle}deg) scale(${currentScale})`
  }
  if (innerRef.value) {
    innerRef.value.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) rotate(45deg)`
  }

  rafId = window.requestAnimationFrame(loop)
}

function handlePointerMove(e) {
  if (!enabled.value) return
  if (e.pointerType && e.pointerType !== 'mouse') return

  targetX = e.clientX
  targetY = e.clientY

  if (!visible.value) {
    outerX = targetX
    outerY = targetY
    innerX = targetX
    innerY = targetY
    visible.value = true
  }

  const interactive = e.target instanceof Element && Boolean(e.target.closest(INTERACTIVE_SELECTOR))
  hoveringInteractive.value = interactive
}

function handleMouseLeave() {
  visible.value = false
  hoveringInteractive.value = false
}

function updateEnabledState() {
  if (typeof window === 'undefined') return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const isDesktop = window.innerWidth >= 1024
  const nextEnabled = isDesktop && finePointer && !prefersReduced

  if (nextEnabled === enabled.value) return
  enabled.value = nextEnabled

  if (nextEnabled) {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(loop)
    }
  } else {
    visible.value = false
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return
  updateEnabledState()
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('resize', updateEnabledState, { passive: true })
  document.documentElement.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  if (rafId !== null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('resize', updateEnabledState)
  }
  if (typeof document !== 'undefined') {
    document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>
