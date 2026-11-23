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
  camera.position.set(0, 0, 7.5)

  // 50% density reduction on mobile (< 768px)
  const particleCount = isMobile ? 35 : 70
  const maxDistance = isMobile ? 1.85 : 2.25
  const maxDistSq = maxDistance * maxDistance
  const octaCount = isMobile ? 2 : 4

  const boundsX = 8.4
  const boundsY = 4.7
  const boundsZMin = -4.2
  const boundsZMax = 1.4

  // Particle positions, velocities, and crimson/slate colors
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const velocities = new Float32Array(particleCount * 3)

  const crimsonColor = new THREE.Color('#D63A49')
  const slateColor = new THREE.Color('#94A3B8')
  const softWhiteColor = new THREE.Color('#E2E8F0')

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * boundsX * 2
    positions[i3 + 1] = (Math.random() - 0.5) * boundsY * 2
    positions[i3 + 2] = boundsZMin + Math.random() * (boundsZMax - boundsZMin)

    velocities[i3] = (Math.random() - 0.5) * 0.24
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.18
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.1

    const roll = Math.random()
    const col = roll < 0.24 ? crimsonColor : roll < 0.65 ? slateColor : softWhiteColor
    colors[i3] = col.r
    colors[i3 + 1] = col.g
    colors[i3 + 2] = col.b
  }

  const pointsGeo = new THREE.BufferGeometry()
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const pointsMat = new THREE.PointsMaterial({
    size: isMobile ? 0.07 : 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    depthWrite: false
  })

  const particles = new THREE.Points(pointsGeo, pointsMat)
  scene.add(particles)

  // Constellation lines connecting nearby particles
  const maxConnections = particleCount * 5
  const linePositions = new Float32Array(maxConnections * 6)
  const lineColors = new Float32Array(maxConnections * 6)

  const lineGeo = new THREE.BufferGeometry()
  const linePosAttr = new THREE.BufferAttribute(linePositions, 3)
  const lineColAttr = new THREE.BufferAttribute(lineColors, 3)
  lineGeo.setAttribute('position', linePosAttr)
  lineGeo.setAttribute('color', lineColAttr)
  lineGeo.setDrawRange(0, 0)

  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.25,
    depthWrite: false
  })

  const lines = new THREE.LineSegments(lineGeo, lineMat)
  scene.add(lines)

  // Translucent wireframe octahedrons kept toward the perimeter so center text remains crisp
  const octaSpecs = [
    { pos: [-5.3, 2.2, -1.6], scale: 0.95, crimson: true, speedX: 0.22, speedY: 0.3 },
    { pos: [5.5, -1.7, -1.3], scale: 1.05, crimson: false, speedX: -0.18, speedY: 0.26 },
    { pos: [-4.6, -2.4, -2.7], scale: 0.72, crimson: false, speedX: 0.16, speedY: -0.22 },
    { pos: [4.8, 2.5, -2.3], scale: 0.78, crimson: true, speedX: -0.2, speedY: -0.24 }
  ].slice(0, octaCount)

  const baseOctaGeo = new THREE.OctahedronGeometry(1, 0)
  const edgeOctaGeo = new THREE.EdgesGeometry(baseOctaGeo)

  const octaGroups = octaSpecs.map((spec, idx) => {
    const group = new THREE.Group()
    group.position.set(spec.pos[0], spec.pos[1], spec.pos[2])
    group.scale.setScalar(spec.scale)

    const wireMat = new THREE.LineBasicMaterial({
      color: spec.crimson ? '#D63A49' : '#94A3B8',
      transparent: true,
      opacity: spec.crimson ? 0.34 : 0.22
    })
    const wire = new THREE.LineSegments(edgeOctaGeo, wireMat)

    const fillMat = new THREE.MeshBasicMaterial({
      color: spec.crimson ? '#D63A49' : '#94A3B8',
      transparent: true,
      opacity: 0.035,
      depthWrite: false
    })
    const fill = new THREE.Mesh(baseOctaGeo, fillMat)

    group.add(fill)
    group.add(wire)
    scene.add(group)

    return {
      group,
      baseY: spec.pos[1],
      phase: idx * 1.4,
      speedX: spec.speedX,
      speedY: spec.speedY
    }
  })

  const dimSlate = new THREE.Color('#475569')

  function updateLines() {
    let vertexCount = 0
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const ax = positions[i3]
      const ay = positions[i3 + 1]
      const az = positions[i3 + 2]

      for (let j = i + 1; j < particleCount; j++) {
        if (vertexCount >= maxConnections * 2) break
        const j3 = j * 3
        const dx = ax - positions[j3]
        const dy = ay - positions[j3 + 1]
        const dz = az - positions[j3 + 2]
        const distSq = dx * dx + dy * dy + dz * dz

        if (distSq < maxDistSq) {
          const factor = 1 - Math.sqrt(distSq) / maxDistance
          const offset = vertexCount * 3

          linePositions[offset] = ax
          linePositions[offset + 1] = ay
          linePositions[offset + 2] = az
          linePositions[offset + 3] = positions[j3]
          linePositions[offset + 4] = positions[j3 + 1]
          linePositions[offset + 5] = positions[j3 + 2]

          const useCrimson = (i + j) % 5 === 0
          const c = useCrimson ? crimsonColor : dimSlate
          lineColors[offset] = c.r * factor
          lineColors[offset + 1] = c.g * factor
          lineColors[offset + 2] = c.b * factor
          lineColors[offset + 3] = c.r * factor
          lineColors[offset + 4] = c.g * factor
          lineColors[offset + 5] = c.b * factor

          vertexCount += 2
        }
      }
    }

    lineGeo.setDrawRange(0, vertexCount)
    linePosAttr.needsUpdate = true
    lineColAttr.needsUpdate = true
  }

  // Build initial line segments for immediate static frame paint
  updateLines()

  return {
    onFrame(dt, elapsed, pointer) {
      if (dt > 0) {
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          positions[i3] += velocities[i3] * dt
          positions[i3 + 1] += velocities[i3 + 1] * dt
          positions[i3 + 2] += velocities[i3 + 2] * dt

          if (positions[i3] > boundsX || positions[i3] < -boundsX) velocities[i3] *= -1
          if (positions[i3 + 1] > boundsY || positions[i3 + 1] < -boundsY) velocities[i3 + 1] *= -1
          if (positions[i3 + 2] > boundsZMax || positions[i3 + 2] < boundsZMin) velocities[i3 + 2] *= -1
        }
        pointsGeo.attributes.position.needsUpdate = true
        updateLines()
      }

      octaGroups.forEach((item) => {
        item.group.rotation.x += item.speedX * dt
        item.group.rotation.y += item.speedY * dt
        item.group.position.y = item.baseY + Math.sin(elapsed * 0.7 + item.phase) * 0.22
      })

      // Damped mouse-tracking parallax
      camera.position.x = pointer.x * 0.85
      camera.position.y = -pointer.y * 0.5
      camera.lookAt(0, 0, 0)
    }
  }
})
</script>
