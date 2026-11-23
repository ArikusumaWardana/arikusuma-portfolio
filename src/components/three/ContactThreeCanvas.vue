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

function createGlowTexture(THREE) {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const half = size / 2
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half * 0.85)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
    gradient.addColorStop(0.28, 'rgba(255, 255, 255, 0.4)')
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

useThreeScene(canvasContainerRef, ({ THREE, scene, camera, isMobile }) => {
  camera.position.set(0, 2.5, 9.2)
  camera.lookAt(0, -1.6, -2.0)

  // 50% terrain grid density reduction on mobile (< 768px)
  const segX = isMobile ? 14 : 28
  const segY = isMobile ? 9 : 18

  const geometry = new THREE.PlaneGeometry(26, 16, segX, segY)
  const posAttr = geometry.attributes.position
  const vertexCount = posAttr.count

  const baseX = new Float32Array(vertexCount)
  const baseY = new Float32Array(vertexCount)
  for (let i = 0; i < vertexCount; i++) {
    baseX[i] = posAttr.getX(i)
    baseY[i] = posAttr.getY(i)
  }

  const wireMaterial = new THREE.MeshBasicMaterial({
    color: '#334155',
    wireframe: true,
    transparent: true,
    opacity: 0.16,
    depthWrite: false
  })
  const terrainMesh = new THREE.Mesh(geometry, wireMaterial)

  const glowTexture = createGlowTexture(THREE)
  const pointsMaterial = new THREE.PointsMaterial({
    color: '#D63A49',
    size: isMobile ? 0.085 : 0.11,
    map: glowTexture,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  })
  const vertexPoints = new THREE.Points(geometry, pointsMaterial)

  const terrainGroup = new THREE.Group()
  terrainGroup.rotation.x = -Math.PI * 0.44
  terrainGroup.position.set(0, -2.95, -2.3)
  terrainGroup.add(terrainMesh)
  terrainGroup.add(vertexPoints)
  scene.add(terrainGroup)

  function updateTerrain(elapsed, pointer) {
    const cursorX = pointer.x * 9
    const cursorY = -pointer.y * 5

    for (let i = 0; i < vertexCount; i++) {
      const x = baseX[i]
      const y = baseY[i]

      const waveA = Math.sin(x * 0.34 + elapsed * 0.52) * 0.42
      const waveB = Math.cos(y * 0.42 + elapsed * 0.42) * 0.36

      const dx = x - cursorX
      const dy = y - cursorY
      const distSq = dx * dx + dy * dy
      const cursorLift = Math.exp(-distSq * 0.08) * 0.55

      posAttr.setZ(i, waveA + waveB + cursorLift)
    }

    posAttr.needsUpdate = true
  }

  updateTerrain(0, { x: 0, y: 0 })

  return {
    onFrame(_dt, elapsed, pointer) {
      updateTerrain(elapsed, pointer)
      camera.position.x = pointer.x * 0.55
      camera.position.y = 2.5 - pointer.y * 0.24
      camera.lookAt(0, -1.6, -2.0)
    },
    onDispose() {
      glowTexture.dispose()
    }
  }
})
</script>
