let gsapPromise = null

export async function loadGsap() {
  if (typeof window === 'undefined') {
    return null
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger)
      }

      return { gsap, ScrollTrigger }
    })
  }

  const { gsap, ScrollTrigger } = await gsapPromise
  return { gsap, ScrollTrigger, prefersReducedMotion }
}
