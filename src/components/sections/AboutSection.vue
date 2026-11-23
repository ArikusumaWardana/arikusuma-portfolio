<template>
  <section
    id="about"
    ref="aboutRef"
    class="relative w-full bg-[#E3E9EE] px-6 pt-16 pb-28 sm:pt-20 sm:pb-36 md:pt-24 md:pb-40"
  >
    <div class="mx-auto max-w-4xl">
      <SectionHeading title="ABOUT" theme="light" />

      <div class="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
        <!-- Left Column: Circular Portrait with Scroll-Linked Parallax -->
        <div class="about-reveal flex justify-center md:col-span-5">
          <div class="relative">
            <div
              ref="diamondBackdropRef"
              class="pointer-events-none absolute -inset-2.5 rotate-45 border border-[#D63A49]/45 will-change-transform"
              aria-hidden="true"
            ></div>
            <div
              ref="portraitWrapRef"
              class="relative h-48 w-48 overflow-hidden rounded-full bg-[#1C2029] shadow-[0_18px_40px_rgba(20,23,31,0.16)] ring-4 ring-white/90 will-change-transform sm:h-56 sm:w-56 md:h-60 md:w-60"
            >
              <img
                :src="profile.avatar"
                :alt="`${profile.fullName} portrait`"
                class="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <!-- Right Column: Lead, Bio, Social Vector Icons -->
        <div class="about-reveal text-center md:col-span-7 md:text-left">
          <p class="text-base font-semibold leading-relaxed text-[#1F242D] sm:text-lg">
            {{ profile.bioLead }}
          </p>

          <p
            v-for="(paragraph, idx) in profile.bioParagraphs"
            :key="idx"
            class="mt-4 text-sm leading-7 text-[#4B5565] sm:text-[15px]"
          >
            {{ paragraph }}
          </p>

          <!-- Compact Focus Tags -->
          <div class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#1F242D] md:justify-start">
            <span
              v-for="item in profile.highlights"
              :key="item"
              class="inline-flex items-center gap-2"
            >
              <span class="h-1.5 w-1.5 rotate-45 bg-[#D63A49]" aria-hidden="true"></span>
              <span>{{ item }}</span>
            </span>
          </div>

          <!-- Monochrome Vector Social Links -->
          <div class="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              :href="profile.socialLinks.github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F242D]/20 text-[#1F242D] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D63A49] hover:text-[#D63A49]"
            >
              <Github :size="17" />
            </a>
            <a
              :href="profile.socialLinks.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F242D]/20 text-[#1F242D] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D63A49] hover:text-[#D63A49]"
            >
              <Linkedin :size="17" />
            </a>
            <a
              :href="profile.socialLinks.instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              title="Instagram"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F242D]/20 text-[#1F242D] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D63A49] hover:text-[#D63A49]"
            >
              <Instagram :size="17" />
            </a>
            <a
              :href="profile.socialLinks.email"
              aria-label="Send email"
              title="Email"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F242D]/20 text-[#1F242D] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D63A49] hover:text-[#D63A49]"
            >
              <Mail :size="17" />
            </a>
            <a
              :href="profile.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-1 inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#1F242D]/25 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1F242D] transition-all duration-200 hover:border-[#D63A49] hover:bg-[#D63A49] hover:text-white"
            >
              <FileDown :size="14" />
              <span>Resume / CV</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Slanted Divider into Experience (#FFFFFF) -->
    <DiagonalDivider fill="#FFFFFF" slope="down-right" position="bottom" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FileDown, Github, Instagram, Linkedin, Mail } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import DiagonalDivider from '../ui/DiagonalDivider.vue'
import { profile } from '../../data/portfolio'
import { loadGsap } from '../../composables/useGsap'

const aboutRef = ref(null)
const portraitWrapRef = ref(null)
const diamondBackdropRef = ref(null)
let gsapCtx = null

onMounted(async () => {
  const gsapPack = await loadGsap()
  if (!gsapPack || !aboutRef.value) return
  const { gsap, prefersReducedMotion } = gsapPack
  if (prefersReducedMotion) return

  gsapCtx = gsap.context(() => {
    gsap.from('.about-reveal', {
      y: 28,
      opacity: 0,
      duration: 0.75,
      stagger: 0.16,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: aboutRef.value,
        start: 'top 78%',
        once: true
      }
    })

    if (portraitWrapRef.value) {
      gsap.fromTo(
        portraitWrapRef.value,
        { y: -14 },
        {
          y: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
          }
        }
      )
    }

    if (diamondBackdropRef.value) {
      gsap.fromTo(
        diamondBackdropRef.value,
        { y: 20, rotation: 41 },
        {
          y: -20,
          rotation: 51,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
          }
        }
      )
    }
  }, aboutRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
