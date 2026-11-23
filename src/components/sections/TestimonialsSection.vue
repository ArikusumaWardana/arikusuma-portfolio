<template>
  <section
    id="testimonials"
    class="relative w-full bg-[#E3E9EE] px-6 pt-16 pb-28 sm:pt-20 sm:pb-36 md:pt-24 md:pb-40"
  >
    <div
      class="mx-auto max-w-3xl text-center"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <SectionHeading title="TESTIMONIALS" theme="light" />

      <div class="relative flex items-center justify-between gap-2 sm:gap-6">
        <button
          type="button"
          aria-label="Previous testimonial"
          class="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1F242D]/15 text-[#1F242D] transition-colors hover:border-[#D63A49] hover:text-[#D63A49] sm:flex"
          @click="prevSlide"
        >
          <ChevronLeft :size="18" />
        </button>

        <div class="flex-1 overflow-hidden px-1">
          <Transition
            :name="slideDirection === 'next' ? 'quote-slide-next' : 'quote-slide-prev'"
            mode="out-in"
          >
            <div :key="activeIndex" class="flex flex-col items-center">
              <p class="font-script text-xl italic leading-relaxed text-[#1F242D] sm:text-2xl">
                "{{ currentItem.quote }}"
              </p>

              <h3 class="mt-7 font-display text-xs font-bold uppercase tracking-[0.22em] text-[#1F242D]">
                {{ currentItem.author }}
              </h3>

              <p class="mt-1 text-xs font-medium text-[#4B5565]">
                {{ currentItem.role }}
              </p>

              <!-- Circular Monochrome Avatar Badge -->
              <div class="mt-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#1C2029] font-display text-sm font-bold tracking-wider text-white shadow-md ring-1 ring-[#D63A49]/40">
                {{ currentItem.initials }}
              </div>
            </div>
          </Transition>
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          class="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1F242D]/15 text-[#1F242D] transition-colors hover:border-[#D63A49] hover:text-[#D63A49] sm:flex"
          @click="nextSlide"
        >
          <ChevronRight :size="18" />
        </button>
      </div>

      <!-- Clickable Diamond Pagination Dots -->
      <div class="mt-7 flex items-center justify-center gap-1" role="tablist" aria-label="Testimonial slides">
        <button
          v-for="(item, idx) in testimonials"
          :key="item.author"
          type="button"
          role="tab"
          :aria-selected="activeIndex === idx"
          :aria-label="`Show testimonial ${idx + 1} of ${testimonials.length}`"
          class="flex h-9 w-9 items-center justify-center focus:outline-none"
          @click="goToSlide(idx)"
        >
          <span
            class="block h-2.5 w-2.5 rotate-45 transition-all duration-200"
            :class="
              activeIndex === idx
                ? 'scale-115 bg-[#D63A49]'
                : 'bg-[#1F242D]/25 hover:bg-[#1F242D]/60'
            "
          ></span>
        </button>
      </div>
    </div>

    <!-- Bottom Slanted Divider into Tech Stack (#1C2029) -->
    <DiagonalDivider fill="#1C2029" slope="up-right" position="bottom" />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import DiagonalDivider from '../ui/DiagonalDivider.vue'
import { testimonials } from '../../data/portfolio'

const activeIndex = ref(0)
const slideDirection = ref('next')
let touchStartX = 0

const currentItem = computed(() => testimonials[activeIndex.value])

function nextSlide() {
  slideDirection.value = 'next'
  activeIndex.value = (activeIndex.value + 1) % testimonials.length
}

function prevSlide() {
  slideDirection.value = 'prev'
  activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length
}

function goToSlide(idx) {
  if (idx === activeIndex.value) return
  slideDirection.value = idx > activeIndex.value ? 'next' : 'prev'
  activeIndex.value = idx
}

function onTouchStart(e) {
  touchStartX = e.changedTouches?.[0]?.clientX ?? 0
}

function onTouchEnd(e) {
  const touchEndX = e.changedTouches?.[0]?.clientX ?? 0
  const delta = touchStartX - touchEndX
  if (Math.abs(delta) >= 45) {
    if (delta > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}
</script>
