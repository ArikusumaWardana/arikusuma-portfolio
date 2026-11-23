<template>
  <section
    id="services"
    ref="servicesRef"
    class="relative w-full overflow-hidden bg-[#1C2029] px-6 pt-16 pb-28 sm:pt-20 sm:pb-36 md:pt-24 md:pb-40"
  >
    <ServicesThreeCanvas />

    <div class="relative z-10 mx-auto max-w-5xl">
      <SectionHeading title="SERVICES" theme="dark" />

      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <article
          v-for="service in services"
          :key="service.title"
          class="service-card group flex flex-col items-center text-center"
        >
          <!-- Interactive Diamond Icon Container (Outer Diamond rotates/glows, Icon stays upright) -->
          <div class="relative mb-7 flex h-16 w-16 items-center justify-center">
            <span
              class="absolute inset-0 rotate-45 border border-[#D63A49] transition-all duration-500 ease-out group-hover:rotate-[135deg] group-hover:bg-[#D63A49]/12 group-hover:shadow-[0_0_24px_rgba(214,58,73,0.35)]"
              aria-hidden="true"
            ></span>
            <component
              :is="iconMap[service.icon]"
              :size="24"
              class="relative z-10 text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#D63A49]"
            />
          </div>

          <h3 class="font-script text-2xl font-medium italic text-[#F8FAFC]">
            {{ service.title }}
          </h3>

          <p class="mt-3 max-w-[26ch] text-sm leading-relaxed text-[#94A3B8]">
            {{ service.description }}
          </p>
        </article>
      </div>
    </div>

    <!-- Bottom Slanted Divider into Skills (#E3E9EE) -->
    <DiagonalDivider fill="#E3E9EE" slope="down-right" position="bottom" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Code2, Database, Gamepad2, Layers } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import DiagonalDivider from '../ui/DiagonalDivider.vue'
import ServicesThreeCanvas from '../three/ServicesThreeCanvas.vue'
import { services } from '../../data/portfolio'
import { loadGsap } from '../../composables/useGsap'

const iconMap = {
  Code2,
  Gamepad2,
  Layers,
  Database
}

const servicesRef = ref(null)
let gsapCtx = null

onMounted(async () => {
  const gsapPack = await loadGsap()
  if (!gsapPack || !servicesRef.value) return
  const { gsap, prefersReducedMotion } = gsapPack
  if (prefersReducedMotion) return

  gsapCtx = gsap.context(() => {
    gsap.from('.service-card', {
      y: 26,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: servicesRef.value,
        start: 'top 78%',
        once: true
      }
    })
  }, servicesRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
