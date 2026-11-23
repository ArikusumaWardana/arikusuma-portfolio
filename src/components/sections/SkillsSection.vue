<template>
  <section
    id="skills"
    ref="skillsRef"
    class="relative w-full bg-[#E3E9EE] px-6 pt-16 pb-28 sm:pt-20 sm:pb-36 md:pt-24 md:pb-40"
  >
    <div class="mx-auto max-w-5xl">
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <!-- Left Column: Narrative & Full Tech Stack Overview -->
        <div class="lg:col-span-5">
          <SectionHeading title="SKILLS" theme="light" align="left" />

          <p class="-mt-4 font-script text-xl font-semibold italic text-[#1F242D]">
            Web Engineering & Interactive Systems
          </p>

          <p class="mt-4 text-sm leading-7 text-[#4B5565] sm:text-[15px]">
            My workflow spans frontend interfaces, server-side APIs, relational data modeling, and real-time game architecture. I prioritize clean abstractions, responsive layouts, and maintainable code across both web platforms and Unity projects.
          </p>

          <!-- Complete Preserved Tech Stack List -->
          <div class="mt-7 border-t border-[#1F242D]/12 pt-5">
            <p class="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-[#4B5565]">
              Core Technologies
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                v-for="tech in techStackList"
                :key="tech"
                class="inline-flex items-center gap-2 text-xs font-medium text-[#1F242D]"
              >
                <span class="h-1 w-1 rotate-45 bg-[#D63A49]" aria-hidden="true"></span>
                <span>{{ tech }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column: Animated Progress Bars with Diamond Tip Markers -->
        <div class="space-y-7 pt-2 lg:col-span-7">
          <div
            v-for="(skill, idx) in skillBars"
            :key="skill.name"
            class="skill-bar-row"
          >
            <div class="mb-2.5 flex items-center justify-between gap-4">
              <span class="font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#1F242D]">
                {{ skill.name }}
              </span>
              <span class="font-display text-xs font-semibold tracking-wider text-[#D63A49]">
                {{ skill.level }}%
              </span>
            </div>

            <div class="relative h-[2px] w-full bg-[#1F242D]/15">
              <div
                :ref="(el) => setBarFillRef(el, idx)"
                class="relative h-full bg-[#D63A49]"
                style="width: 0%"
              >
                <span
                  :ref="(el) => setTipDiamondRef(el, idx)"
                  class="absolute top-1/2 right-0 h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#D63A49] shadow-sm"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Slanted Divider into Projects (#FFFFFF) -->
    <DiagonalDivider fill="#FFFFFF" slope="up-right" position="bottom" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SectionHeading from '../ui/SectionHeading.vue'
import DiagonalDivider from '../ui/DiagonalDivider.vue'
import { skillBars, techStackList } from '../../data/portfolio'
import { loadGsap } from '../../composables/useGsap'

const skillsRef = ref(null)
const barFillRefs = ref([])
const tipDiamondRefs = ref([])
let gsapCtx = null

function setBarFillRef(el, idx) {
  if (el) {
    barFillRefs.value[idx] = el
  }
}

function setTipDiamondRef(el, idx) {
  if (el) {
    tipDiamondRefs.value[idx] = el
  }
}

onMounted(async () => {
  const gsapPack = await loadGsap()
  if (!gsapPack || !skillsRef.value) return
  const { gsap, prefersReducedMotion } = gsapPack

  if (prefersReducedMotion) {
    barFillRefs.value.forEach((el, idx) => {
      if (el && skillBars[idx]) {
        el.style.width = `${skillBars[idx].level}%`
      }
    })
    return
  }

  gsapCtx = gsap.context(() => {
    barFillRefs.value.forEach((el, idx) => {
      const target = skillBars[idx]?.level ?? 0
      const tipEl = tipDiamondRefs.value[idx]
      if (!el) return

      gsap.fromTo(
        el,
        { width: '0%' },
        {
          width: `${target}%`,
          duration: 1.05,
          delay: idx * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.value,
            start: 'top 76%',
            once: true
          },
          onComplete: () => {
            if (!tipEl) return
            gsap
              .timeline()
              .to(tipEl, {
                rotation: 45,
                scale: 1.55,
                boxShadow: '0 0 16px 4px rgba(214, 58, 73, 0.78)',
                duration: 0.25,
                ease: 'power2.out'
              })
              .to(tipEl, {
                rotation: 45,
                scale: 1,
                boxShadow: '0 0 8px 1px rgba(214, 58, 73, 0.42)',
                duration: 0.45,
                ease: 'power2.inOut'
              })
          }
        }
      )
    })
  }, skillsRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
