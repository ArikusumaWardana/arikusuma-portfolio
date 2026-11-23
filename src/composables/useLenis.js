import { loadGsap } from './useGsap'

let lenisInstance = null

export async function initLenis() {
  if (typeof window === 'undefined') return null

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return null

  if (lenisInstance) {
    return () => destroyLenis()
  }

  const [{ default: Lenis }, gsapPack] = await Promise.all([
    import('lenis'),
    loadGsap()
  ])

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4
  })

  let tickerFn = null

  if (gsapPack?.gsap) {
    if (gsapPack.ScrollTrigger) {
      lenisInstance.on('scroll', () => {
        gsapPack.ScrollTrigger.update()
      })
    }

    tickerFn = (time) => {
      lenisInstance?.raf(time * 1000)
    }
    gsapPack.gsap.ticker.add(tickerFn)
    gsapPack.gsap.ticker.lagSmoothing(0)
  }

  return () => {
    if (tickerFn && gsapPack?.gsap) {
      gsapPack.gsap.ticker.remove(tickerFn)
    }
    destroyLenis()
  }
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

export function pauseSmoothScroll() {
  lenisInstance?.stop()
}

export function resumeSmoothScroll() {
  lenisInstance?.start()
}

export function scrollToSection(id) {
  if (typeof document === 'undefined' || !id) return
  const target = document.getElementById(id)
  if (!target) return

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.1 })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
