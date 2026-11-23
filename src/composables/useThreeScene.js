import { onMounted, onUnmounted } from 'vue'

const TEXTURE_KEYS = [
  'map',
  'alphaMap',
  'aoMap',
  'bumpMap',
  'displacementMap',
  'emissiveMap',
  'envMap',
  'lightMap',
  'metalnessMap',
  'normalMap',
  'roughnessMap',
  'specularMap'
]

function disposeMaterial(material) {
  if (!material) return
  for (const key of TEXTURE_KEYS) {
    const tex = material[key]
    if (tex && typeof tex.dispose === 'function') {
      tex.dispose()
    }
  }
  if (typeof material.dispose === 'function') {
    material.dispose()
  }
}

export function useThreeScene(containerRef, setupScene) {
  let disposed = false
  let rafId = null
  let intersectionObserver = null
  let resizeObserver = null
  let renderer = null
  let scene = null
  let camera = null
  let sceneHandle = null
  let isVisible = false
  let prefersReducedMotion = false

  const pointer = {
    targetX: 0,
    targetY: 0,
    x: 0,
    y: 0,
    speed: 0,
    targetSpeed: 0
  }

  let lastTime = 0
  let elapsed = 0
  let lastPointerClientX = null
  let lastPointerClientY = null

  function stopLoop() {
    if (rafId !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  function renderSingleFrame(dt = 0) {
    if (disposed || !renderer || !scene || !camera) return
    sceneHandle?.onFrame?.(dt, elapsed, pointer)
    renderer.render(scene, camera)
  }

  function tick(now) {
    if (disposed || !isVisible || document.hidden || prefersReducedMotion) {
      rafId = null
      return
    }

    const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016
    lastTime = now
    elapsed += dt

    const lerpFactor = 1 - Math.exp(-6 * dt)
    pointer.x += (pointer.targetX - pointer.x) * lerpFactor
    pointer.y += (pointer.targetY - pointer.y) * lerpFactor
    pointer.speed += (pointer.targetSpeed - pointer.speed) * lerpFactor
    pointer.targetSpeed *= Math.exp(-5 * dt)

    renderSingleFrame(dt)
    rafId = window.requestAnimationFrame(tick)
  }

  function startLoop() {
    if (disposed || prefersReducedMotion || !isVisible || document.hidden) return
    if (rafId !== null) return
    lastTime = performance.now()
    rafId = window.requestAnimationFrame(tick)
  }

  function handlePointerMove(e) {
    if (disposed || !isVisible || !containerRef.value) return
    const rect = containerRef.value.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return

    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
    pointer.targetX = Math.max(-1, Math.min(1, nx))
    pointer.targetY = Math.max(-1, Math.min(1, ny))

    if (lastPointerClientX !== null && lastPointerClientY !== null) {
      const dx = e.clientX - lastPointerClientX
      const dy = e.clientY - lastPointerClientY
      const moveDist = Math.min(40, Math.hypot(dx, dy))
      pointer.targetSpeed = Math.min(1.5, pointer.targetSpeed + moveDist * 0.02)
    }
    lastPointerClientX = e.clientX
    lastPointerClientY = e.clientY
  }

  function handleMouseLeave() {
    pointer.targetX = 0
    pointer.targetY = 0
    pointer.targetSpeed = 0
    lastPointerClientX = null
    lastPointerClientY = null
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stopLoop()
    } else if (isVisible) {
      startLoop()
    }
  }

  onMounted(async () => {
    if (typeof window === 'undefined' || !containerRef.value) return

    const container = containerRef.value
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    let THREE
    try {
      THREE = await import('three')
    } catch {
      return
    }

    if (disposed || !containerRef.value) return

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance'
      })
    } catch {
      return
    }

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(50, width / Math.max(height, 1), 0.1, 100)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(width, height, false)

    const canvas = renderer.domElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.appendChild(canvas)

    sceneHandle = setupScene({
      THREE,
      scene,
      camera,
      renderer,
      width,
      height,
      isMobile,
      prefersReducedMotion,
      pointer
    })

    // Render an immediate static frame for instant paint and reduced-motion accessibility
    renderSingleFrame(0)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting
            if (isVisible && !document.hidden) {
              startLoop()
            } else {
              stopLoop()
            }
          }
        },
        {
          rootMargin: '80px 0px',
          threshold: 0.01
        }
      )
      intersectionObserver.observe(container)
    } else {
      isVisible = true
      startLoop()
    }

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver((entries) => {
        if (disposed || !renderer || !camera) return
        const entry = entries[0]
        const nextW = entry?.contentRect?.width || container.clientWidth
        const nextH = entry?.contentRect?.height || container.clientHeight
        if (!nextW || !nextH) return

        camera.aspect = nextW / nextH
        camera.updateProjectionMatrix()
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setSize(nextW, nextH, false)
        sceneHandle?.onResize?.(nextW, nextH)

        if (prefersReducedMotion || !isVisible) {
          renderSingleFrame(0)
        }
      })
      resizeObserver.observe(container)
    }
  })

  onUnmounted(() => {
    disposed = true
    stopLoop()

    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', handlePointerMove)
    }
    if (typeof document !== 'undefined') {
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }

    intersectionObserver?.disconnect()
    resizeObserver?.disconnect()
    intersectionObserver = null
    resizeObserver = null

    sceneHandle?.onDispose?.()

    if (scene) {
      scene.traverse((obj) => {
        if (obj.geometry && typeof obj.geometry.dispose === 'function') {
          obj.geometry.dispose()
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(disposeMaterial)
          } else {
            disposeMaterial(obj.material)
          }
        }
      })
      scene.clear()
    }

    if (renderer) {
      const domEl = renderer.domElement
      renderer.dispose()
      if (domEl && domEl.parentNode) {
        domEl.parentNode.removeChild(domEl)
      }
      renderer = null
    }

    scene = null
    camera = null
    sceneHandle = null
  })
}
