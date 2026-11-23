<template>
  <div
    ref="canvasContainerRef"
    class="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    aria-hidden="true"
  ></div>
</template>

<script setup>
import { ref } from 'vue'
import { useThreeScene } from '../../composables/useThreeScene'

const canvasContainerRef = ref(null)

useThreeScene(canvasContainerRef, ({ THREE, scene, camera, isMobile }) => {
  camera.position.set(0, 1.5, 8.2)
  camera.lookAt(0, -0.4, 0)

  // 50% mesh segment density reduction on mobile (< 768px)
  const segX = isMobile ? 26 : 52
  const segY = isMobile ? 11 : 22

  const geometry = new THREE.PlaneGeometry(24, 11, segX, segY)
  const posAttr = geometry.attributes.position
  const vertexCount = posAttr.count

  const baseX = new Float32Array(vertexCount)
  const baseY = new Float32Array(vertexCount)
  const colors = new Float32Array(vertexCount * 3)

  for (let i = 0; i < vertexCount; i++) {
    baseX[i] = posAttr.getX(i)
    baseY[i] = posAttr.getY(i)
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.24,
    depthWrite: false
  })

  const ribbonMesh = new THREE.Mesh(geometry, material)
  ribbonMesh.rotation.x = -Math.PI * 0.34
  ribbonMesh.position.set(0, -0.95, -1.2)
  scene.add(ribbonMesh)

  const troughColor = new THREE.Color('#334155')
  const peakColor = new THREE.Color('#D63A49')

  let wavePhase = 0

  function updateWave(dt, pointer) {
    wavePhase += dt * (0.65 + pointer.speed * 0.85)
    const cursorWorldX = pointer.x * 10
    const cursorWorldY = -pointer.y * 4.5
    const rippleAmp = Math.min(1, 0.25 + pointer.speed * 0.85)

    for (let i = 0; i < vertexCount; i++) {
      const x = baseX[i]
      const y = baseY[i]

      const primary = Math.sin(x * 0.38 + wavePhase) * 0.55
      const secondary = Math.cos(y * 0.55 + wavePhase * 0.72) * 0.35

      const dx = x - cursorWorldX
      const dy = y - cursorWorldY
      const distSq = dx * dx + dy * dy
      const ripple = Math.exp(-distSq * 0.12) * 0.45 * rippleAmp

      const z = primary + secondary + ripple
      posAttr.setZ(i, z)

      const t = Math.max(0, Math.min(1, (z + 0.9) / 2.0))
      const cIdx = i * 3
      colors[cIdx] = troughColor.r + (peakColor.r - troughColor.r) * t
      colors[cIdx + 1] = troughColor.g + (peakColor.g - troughColor.g) * t
      colors[cIdx + 2] = troughColor.b + (peakColor.b - troughColor.b) * t
    }

    posAttr.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
  }

  updateWave(0, { x: 0, y: 0, speed: 0 })

  return {
    onFrame(dt, _elapsed, pointer) {
      updateWave(dt, pointer)
      camera.position.x = pointer.x * 0.45
      camera.lookAt(0, -0.4, 0)
    }
  }
})
</script>
