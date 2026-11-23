<template>
  <div>
    <!-- Scroll Progress Indicator -->
    <div
      class="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        class="h-full w-full origin-left bg-[#D63A49] transition-transform duration-75 ease-out"
        :style="{ transform: `scaleX(${scrollProgress})` }"
      ></div>
    </div>

    <!-- Fixed Top-Right Hamburger / Close Trigger -->
    <button
      type="button"
      class="fixed top-5 right-5 z-50 flex h-12 w-12 items-center justify-center border border-white/15 bg-[#14171F]/85 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#D63A49] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A49] sm:top-7 sm:right-7"
      :aria-expanded="isOpen"
      aria-controls="fullscreen-navigation"
      :aria-label="isOpen ? 'Close navigation menu' : 'Open navigation menu'"
      @click="toggleMenu"
    >
      <span class="relative flex h-4 w-5 flex-col justify-between" aria-hidden="true">
        <span
          class="block h-[2px] w-full bg-current transition-all duration-300"
          :class="isOpen ? 'translate-y-[7px] rotate-45 bg-[#D63A49]' : ''"
        ></span>
        <span
          class="block h-[2px] w-full bg-current transition-all duration-300"
          :class="isOpen ? 'opacity-0' : ''"
        ></span>
        <span
          class="block h-[2px] w-full bg-current transition-all duration-300"
          :class="isOpen ? '-translate-y-[7px] -rotate-45 bg-[#D63A49]' : ''"
        ></span>
      </span>
    </button>

    <!-- Fullscreen Navigation Drawer Overlay -->
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        id="fullscreen-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        data-lenis-prevent
        class="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#14171F]/97 px-6 py-20 backdrop-blur-xl sm:px-12"
        @click.self="closeMenu"
      >
        <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center">
          <div class="mb-8 flex flex-col items-center gap-3">
            <BrandMark :size="40" />
            <span class="font-display text-xs uppercase tracking-[0.28em] text-[#94A3B8]">
              {{ profile.displayName }}
            </span>
          </div>

          <nav class="flex w-full flex-col items-center gap-2 sm:gap-3" aria-label="Section navigation">
            <a
              v-for="(item, idx) in navSections"
              :key="item.id"
              :href="`#${item.id}`"
              class="group flex min-h-[44px] items-center gap-4 px-5 py-2 font-display text-base uppercase tracking-[0.22em] transition-colors duration-200 sm:text-xl"
              :class="
                activeSection === item.id
                  ? 'font-bold text-[#D63A49]'
                  : 'font-medium text-[#F8FAFC]/85 hover:text-white'
              "
              @click.prevent="navigateToSection(item.id)"
            >
              <span class="w-6 text-right font-sans text-xs tracking-normal text-[#94A3B8]/60">
                0{{ idx + 1 }}
              </span>
              <span
                class="h-2 w-2 rotate-45 border transition-all duration-200"
                :class="
                  activeSection === item.id
                    ? 'scale-110 border-[#D63A49] bg-[#D63A49]'
                    : 'border-white/30 bg-transparent group-hover:border-[#D63A49]'
                "
              ></span>
              <span>{{ item.label }}</span>
            </a>
          </nav>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[44px] items-center gap-2 border border-[#D63A49] px-6 py-2.5 font-display text-xs uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-[#D63A49]"
            >
              <FileDown :size="15" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-center gap-5 border-t border-white/10 pt-6">
          <a
            :href="profile.socialLinks.github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="flex h-11 w-11 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#D63A49]"
          >
            <Github :size="19" />
          </a>
          <a
            :href="profile.socialLinks.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="flex h-11 w-11 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#D63A49]"
          >
            <Linkedin :size="19" />
          </a>
          <a
            :href="profile.socialLinks.instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="flex h-11 w-11 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#D63A49]"
          >
            <Instagram :size="19" />
          </a>
          <a
            :href="profile.socialLinks.email"
            aria-label="Email"
            class="flex h-11 w-11 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#D63A49]"
          >
            <Mail :size="19" />
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FileDown, Github, Instagram, Linkedin, Mail } from 'lucide-vue-next'
import BrandMark from '../ui/BrandMark.vue'
import { navSections, profile } from '../../data/portfolio'
import { pauseSmoothScroll, resumeSmoothScroll, scrollToSection } from '../../composables/useLenis'

const isOpen = ref(false)
const activeSection = ref('hero')
const scrollProgress = ref(0)

let observer = null
let rafId = null

function updateScrollProgress() {
  if (typeof window === 'undefined') return
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight <= 0) {
    scrollProgress.value = 0
    return
  }
  const progress = Math.min(1, Math.max(0, window.scrollY / docHeight))
  scrollProgress.value = progress
}

function handleScroll() {
  if (rafId) return
  rafId = window.requestAnimationFrame(() => {
    updateScrollProgress()
    rafId = null
  })
}

function setBodyLock(locked) {
  if (typeof document === 'undefined') return
  document.body.style.overflow = locked ? 'hidden' : ''
  if (locked) {
    pauseSmoothScroll()
  } else {
    resumeSmoothScroll()
  }
}

function toggleMenu() {
  isOpen.value = !isOpen.value
  setBodyLock(isOpen.value)
}

function closeMenu() {
  isOpen.value = false
  setBodyLock(false)
}

function navigateToSection(id) {
  closeMenu()
  scrollToSection(id)
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  updateScrollProgress()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateScrollProgress, { passive: true })
  window.addEventListener('keydown', handleKeydown)

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: 0.01
      }
    )

    for (const item of navSections) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', updateScrollProgress)
    window.removeEventListener('keydown', handleKeydown)
    if (rafId) window.cancelAnimationFrame(rafId)
  }
  if (observer) observer.disconnect()
  setBodyLock(false)
})
</script>
