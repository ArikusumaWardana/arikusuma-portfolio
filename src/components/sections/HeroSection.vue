<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#14171F] px-6 py-20 pb-28 sm:pb-32"
    @mousemove="handleMouseMove"
    @mouseleave="resetParallax"
  >
    <!-- BACKGROUND LAYER 1: Three.js Geometric Particle & Octahedron Canvas -->
    <div class="pointer-events-none absolute inset-0 z-0 opacity-70" aria-hidden="true">
      <HeroThreeCanvas />
    </div>

    <!-- BACKGROUND LAYER 2: Right-Aligned Dark Cinematic Portrait -->
    <div
      class="pointer-events-none absolute top-0 right-0 bottom-0 z-10 flex h-full w-full items-end justify-end md:w-[45%] lg:w-[40%]"
      aria-hidden="true"
    >
      <div
        ref="bgParallaxRef"
        class="relative flex h-full max-h-[85vh] w-full items-end justify-end will-change-transform lg:max-h-[95vh]"
      >
        <img
          :src="profile.avatar"
          :alt="`${profile.displayName} portrait`"
          class="h-[68vh] w-auto object-contain object-right-bottom mix-blend-lighten opacity-35 transition-opacity duration-700 sm:h-[74vh] md:h-[80vh] md:opacity-55 lg:h-[85vh] lg:opacity-65 xl:h-[90vh]"
        />

        <!-- Edge Fade Masks: Left (into #14171F), Bottom, and Top -->
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-[#14171F]/50 to-[#14171F]"></div>
        <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#14171F] to-transparent"></div>
        <div class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#14171F] to-transparent"></div>
      </div>
    </div>

    <!-- FOREGROUND LAYER: Centered Editorial Stack -->
    <div class="relative z-20 mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
      <div class="hero-stagger mb-5">
        <BrandMark :size="44" />
      </div>

      <p class="hero-stagger font-script text-xl italic tracking-wide text-slate-300 sm:text-2xl md:text-[28px]">
        {{ profile.introLine }}
      </p>

      <h1 class="hero-stagger mt-3 pl-[0.22em] font-display text-4xl font-bold uppercase tracking-[0.22em] text-[#F8FAFC] sm:text-6xl md:text-7xl">
        {{ profile.heroTitle }}
      </h1>

      <p class="hero-stagger mt-4 font-display text-[11px] font-medium uppercase tracking-[0.34em] text-[#94A3B8] sm:text-xs">
        {{ profile.heroRole }}
      </p>

      <!-- Crosshair + Diamond Divider -->
      <div class="hero-stagger my-7 flex items-center justify-center gap-3" aria-hidden="true">
        <span class="h-px w-10 bg-white/25"></span>
        <span class="h-2.5 w-2.5 rotate-45 border border-[#D63A49] bg-[#D63A49]/25"></span>
        <span class="h-px w-10 bg-white/25"></span>
      </div>

      <!-- Magnetic Outlined Crimson CTA -->
      <div class="hero-stagger flex flex-col items-center gap-4">
        <a
          ref="ctaRef"
          href="#projects"
          class="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#D63A49] px-9 py-3 font-display text-xs font-semibold uppercase tracking-[0.24em] text-[#F8FAFC] transition-colors duration-300 hover:bg-[#D63A49] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A49]"
          @click.prevent="scrollToProjects"
          @mousemove="handleCtaMove"
          @mouseleave="resetCta"
        >
          Explore Projects
        </a>

        <a
          :href="profile.cvUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.22em] text-[#94A3B8] transition-colors duration-200 hover:text-white"
        >
          <FileDown :size="14" class="text-[#D63A49]" />
          <span>Download CV</span>
        </a>
      </div>
    </div>

    <!-- Bottom Slanted Divider into About (#E3E9EE) -->
    <DiagonalDivider fill="#E3E9EE" slope="up-right" position="bottom" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FileDown } from 'lucide-vue-next'
import BrandMark from '../ui/BrandMark.vue'
import DiagonalDivider from '../ui/DiagonalDivider.vue'
import HeroThreeCanvas from '../three/HeroThreeCanvas.vue'
import { profile } from '../../data/portfolio'
import { loadGsap } from '../../composables/useGsap'
import { scrollToSection } from '../../composables/useLenis'

const heroRef = ref(null)
const bgParallaxRef = ref(null)
const ctaRef = ref(null)

let gsapCtx = null
let bgXTo = null
let bgYTo = null
let ctaXTo = null
let ctaYTo = null
let canAnimatePointer = false

function scrollToProjects() {
  scrollToSection('projects')
}

function handleMouseMove(e) {
  if (!canAnimatePointer || !heroRef.value || !bgXTo || !bgYTo) return
  const rect = heroRef.value.getBoundingClientRect()
  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  bgXTo(nx * -12)
  bgYTo(ny * -10)
}

function resetParallax() {
  if (!canAnimatePointer || !bgXTo || !bgYTo) return
  bgXTo(0)
  bgYTo(0)
}

function handleCtaMove(e) {
  if (!canAnimatePointer || !ctaRef.value || !ctaXTo || !ctaYTo) return
  const rect = ctaRef.value.getBoundingClientRect()
  const dx = e.clientX - (rect.left + rect.width / 2)
  const dy = e.clientY - (rect.top + rect.height / 2)
  ctaXTo(dx * 0.22)
  ctaYTo(dy * 0.22)
}

function resetCta() {
  if (!canAnimatePointer || !ctaXTo || !ctaYTo) return
  ctaXTo(0)
  ctaYTo(0)
}

onMounted(async () => {
  const gsapPack = await loadGsap()
  if (!gsapPack || !heroRef.value) return
  const { gsap, prefersReducedMotion } = gsapPack

  const finePointer = window.matchMedia('(pointer: fine)').matches
  canAnimatePointer = finePointer && !prefersReducedMotion

  gsapCtx = gsap.context(() => {
    if (!prefersReducedMotion) {
      gsap.from('.hero-stagger', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.11,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      })
    }

    if (canAnimatePointer && bgParallaxRef.value) {
      bgXTo = gsap.quickTo(bgParallaxRef.value, 'x', { duration: 0.65, ease: 'power3.out' })
      bgYTo = gsap.quickTo(bgParallaxRef.value, 'y', { duration: 0.65, ease: 'power3.out' })
    }

    if (canAnimatePointer && ctaRef.value) {
      ctaXTo = gsap.quickTo(ctaRef.value, 'x', { duration: 0.4, ease: 'power2.out' })
      ctaYTo = gsap.quickTo(ctaRef.value, 'y', { duration: 0.4, ease: 'power2.out' })
    }
  }, heroRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
