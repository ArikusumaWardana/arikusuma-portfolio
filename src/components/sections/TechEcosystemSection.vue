<template>
  <section
    id="tech-stack"
    class="relative w-full overflow-hidden bg-[#1C2029] px-6 pt-16 pb-24 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32"
  >
    <div class="mx-auto max-w-5xl">
      <SectionHeading title="TECH STACK" theme="dark" />

      <!-- Continuous Right-to-Left Auto-Sliding Tech Stack Marquee -->
      <div class="tech-marquee-wrapper relative mx-auto overflow-hidden py-2">
        <!-- Left & Right Edge Fade Masks -->
        <div
          class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#1C2029] to-transparent sm:w-24"
          aria-hidden="true"
        ></div>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#1C2029] to-transparent sm:w-24"
          aria-hidden="true"
        ></div>

        <div class="tech-marquee-track">
          <div
            v-for="track in ['primary', 'dup']"
            :key="track"
            class="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
            :class="track === 'dup' ? 'tech-marquee-duplicate' : ''"
            :aria-hidden="track === 'dup' ? 'true' : undefined"
          >
            <div
              v-for="brand in ecosystemBrands"
              :key="`${track}-${brand.key}`"
              class="group flex min-w-[92px] flex-col items-center gap-3 text-center opacity-65 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-100"
            >
              <div class="flex h-12 w-12 items-center justify-center text-[#F8FAFC] transition-colors group-hover:text-[#D63A49]">
                <!-- Custom Monochrome Vectors for Core Ecosystems -->
                <svg v-if="brand.key === 'vue'" viewBox="0 0 32 32" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M4 6h5.5L16 17.5 22.5 6H28L16 26.5 4 6Z" stroke-linejoin="round" />
                  <path d="M9.8 6l6.2 10.7L22.2 6" stroke-linejoin="round" />
                </svg>

                <svg v-else-if="brand.key === 'nextjs'" viewBox="0 0 32 32" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <circle cx="16" cy="16" r="12" />
                  <path d="M11.5 21V11l11 13" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M20.5 11v6.5" stroke-linecap="round" />
                </svg>

                <svg v-else-if="brand.key === 'unity'" viewBox="0 0 32 32" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                  <path d="M16 4l9.5 5.5v13L16 28l-9.5-5.5v-13L16 4Z" stroke-linejoin="round" />
                  <path d="M16 16l9.5-6.5M16 16L6.5 9.5M16 16v12" stroke-linejoin="round" />
                </svg>

                <svg v-else-if="brand.key === 'laravel'" viewBox="0 0 32 32" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                  <path d="M6 8l5-2.5v11.5l7-3.5 5 2.5v6.5L11 27.5 6 24.8V8Z" stroke-linejoin="round" />
                  <path d="M18 13.5V7l5-2.5v11.5" stroke-linejoin="round" />
                </svg>

                <svg v-else-if="brand.key === 'supabase'" viewBox="0 0 32 32" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M17.5 4.5L7.5 17.5h8.5L14.5 27.5l10-13h-8.5l1.5-10Z" stroke-linejoin="round" />
                </svg>

                <!-- Lucide Vector Icons for Remaining Tech Stack -->
                <component
                  v-else
                  :is="iconMap[brand.icon]"
                  :size="28"
                  :stroke-width="1.6"
                  aria-hidden="true"
                />
              </div>

              <span class="whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#F8FAFC]">
                {{ brand.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Developer Toolset Strip -->
      <div class="mt-14 border-t border-white/10 pt-8 text-center">
        <p class="font-display text-[10px] font-semibold uppercase tracking-[0.26em] text-[#94A3B8]">
          Daily Tools & Environments
        </p>
        <div class="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5">
          <span
            v-for="tool in dailyTools"
            :key="tool.name"
            class="inline-flex items-center gap-2 text-xs text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
            :title="tool.description"
          >
            <span class="h-1 w-1 rotate-45 bg-[#D63A49]" aria-hidden="true"></span>
            <span>{{ tool.name }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode,
  Gamepad2,
  Globe,
  Layers,
  Palette,
  Terminal,
  Zap
} from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import { dailyTools, ecosystemBrands } from '../../data/portfolio'

const iconMap = {
  Boxes,
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode,
  Gamepad2,
  Globe,
  Layers,
  Palette,
  Terminal,
  Zap
}
</script>
