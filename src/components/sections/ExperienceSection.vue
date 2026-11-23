<template>
  <section
    id="experience"
    ref="experienceRef"
    class="relative w-full bg-[#FFFFFF] px-6 pt-16 pb-28 sm:pt-20 sm:pb-36 md:pt-24 md:pb-40"
  >
    <div class="mx-auto max-w-5xl">
      <SectionHeading title="EXPERIENCE" theme="light" />

      <!-- Track Switcher: Career & Education vs Volunteering -->
      <div class="mb-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        <button
          type="button"
          class="relative min-h-[44px] px-2 pb-2 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus:outline-none"
          :class="activeTab === 'career' ? 'text-[#D63A49]' : 'text-[#4B5565] hover:text-[#1F242D]'"
          @click="switchTab('career')"
        >
          <span>Work & Education ({{ experiences.length }})</span>
          <span
            v-if="activeTab === 'career'"
            class="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#D63A49]"
            aria-hidden="true"
          ></span>
        </button>

        <button
          type="button"
          class="relative min-h-[44px] px-2 pb-2 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus:outline-none"
          :class="activeTab === 'volunteering' ? 'text-[#D63A49]' : 'text-[#4B5565] hover:text-[#1F242D]'"
          @click="switchTab('volunteering')"
        >
          <span>Volunteering ({{ volunteers.length }})</span>
          <span
            v-if="activeTab === 'volunteering'"
            class="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#D63A49]"
            aria-hidden="true"
          ></span>
        </button>
      </div>

      <!-- Timeline Container -->
      <div ref="timelineContainerRef" class="relative mx-auto max-w-4xl py-2">
        <!-- Base Vertical Rail -->
        <div
          class="absolute top-3 bottom-3 left-5 w-[2px] -translate-x-1/2 bg-slate-200 md:left-1/2"
          aria-hidden="true"
        ></div>

        <!-- Scroll-Drawn Progress Line -->
        <div
          ref="progressLineRef"
          class="absolute top-3 bottom-3 left-5 w-[2px] -translate-x-1/2 origin-top bg-[#1F242D] md:left-1/2"
          aria-hidden="true"
        ></div>

        <!-- Career & Education Milestones -->
        <div v-if="activeTab === 'career'" class="space-y-12 md:space-y-14">
          <article
            v-for="(item, index) in experiences"
            :key="`${item.title}-${item.organization}`"
            :data-current="item.isCurrent ? 'true' : 'false'"
            class="timeline-row relative grid grid-cols-1 md:grid-cols-2 md:gap-x-16"
          >
            <!-- Centered Diamond Node (Outer centering wrapper preserves -translate-x-1/2 during 3D flip) -->
            <div
              class="absolute top-1.5 left-5 z-10 -translate-x-1/2 md:left-1/2"
              style="perspective: 600px;"
              aria-hidden="true"
            >
              <div
                class="timeline-node flex h-8 w-8 rotate-45 items-center justify-center border-2 bg-white transition-colors duration-300"
                :class="item.isCurrent ? 'border-[#D63A49]' : 'border-[#1F242D]'"
              >
                <span
                  class="node-dot h-2 w-2 -rotate-45 transition-colors duration-300"
                  :class="item.isCurrent ? 'bg-[#D63A49]' : 'bg-[#1F242D]'"
                ></span>
              </div>
            </div>

            <!-- Content Column (Alternating Right / Left on Desktop) -->
            <div
              class="pl-14 md:pl-0"
              :class="
                index % 2 === 0
                  ? 'md:col-start-2 md:text-left'
                  : 'md:col-start-1 md:row-start-1 md:text-right'
              "
            >
              <div
                class="flex flex-wrap items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4B5565]"
                :class="index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'"
              >
                <span>{{ item.startDate }} - {{ item.endDate }}</span>
                <span
                  v-if="item.isCurrent"
                  class="border border-[#D63A49]/40 bg-[#D63A49]/10 px-2 py-0.5 text-[10px] text-[#D63A49]"
                >
                  Current
                </span>
              </div>

              <h3 class="mt-1.5 font-script text-2xl font-semibold italic text-[#1F242D]">
                {{ item.title }}
              </h3>

              <p class="mt-1 font-display text-xs font-bold uppercase tracking-[0.16em] text-[#D63A49]">
                {{ item.organization }}
              </p>

              <ul
                class="mt-3 space-y-1.5 text-sm leading-relaxed text-[#4B5565]"
                :class="index % 2 === 0 ? 'md:text-left' : 'md:text-right'"
              >
                <li v-for="(bullet, bIdx) in item.description" :key="bIdx">
                  {{ bullet }}
                </li>
              </ul>

              <div
                class="mt-4 flex flex-wrap gap-1.5"
                :class="index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'"
              >
                <span
                  v-for="skill in item.skills"
                  :key="skill"
                  class="border border-slate-200 bg-[#E3E9EE]/50 px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1F242D]"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Volunteering Milestones -->
        <div v-else class="space-y-12 md:space-y-14">
          <article
            v-for="(vol, index) in volunteers"
            :key="vol.title"
            class="timeline-row relative grid grid-cols-1 md:grid-cols-2 md:gap-x-16"
          >
            <!-- Centered Diamond Node (Outer centering wrapper preserves -translate-x-1/2 during 3D flip) -->
            <div
              class="absolute top-1.5 left-5 z-10 -translate-x-1/2 md:left-1/2"
              style="perspective: 600px;"
              aria-hidden="true"
            >
              <div class="timeline-node flex h-8 w-8 rotate-45 items-center justify-center border-2 border-[#1F242D] bg-white transition-colors duration-300">
                <span class="node-dot h-2 w-2 -rotate-45 bg-[#1F242D] transition-colors duration-300"></span>
              </div>
            </div>

            <div
              class="pl-14 md:pl-0"
              :class="
                index % 2 === 0
                  ? 'md:col-start-2 md:text-left'
                  : 'md:col-start-1 md:row-start-1 md:text-right'
              "
            >
              <p class="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4B5565]">
                {{ vol.date }}
              </p>

              <h3 class="mt-1.5 font-script text-xl font-semibold italic leading-snug text-[#1F242D] sm:text-2xl">
                {{ vol.title }}
              </h3>

              <p class="mt-1 font-display text-xs font-bold uppercase tracking-[0.16em] text-[#D63A49]">
                {{ vol.organization }}
              </p>

              <p class="mt-3 text-sm leading-relaxed text-[#4B5565]">
                {{ vol.description }}
              </p>

              <div
                class="mt-4 flex flex-wrap items-center gap-3"
                :class="index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'"
              >
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in vol.tags"
                    :key="tag"
                    class="border border-slate-200 bg-[#E3E9EE]/50 px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1F242D]"
                  >
                    {{ tag }}
                  </span>
                </div>

                <button
                  type="button"
                  class="inline-flex min-h-[36px] items-center gap-1.5 border border-[#1F242D]/25 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1F242D] transition-colors hover:border-[#D63A49] hover:text-[#D63A49]"
                  @click="openVolunteerModal(vol)"
                >
                  <Eye :size="13" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Volunteer Detail Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="selectedVolunteer"
          class="fixed inset-0 z-50 flex items-center justify-center bg-[#14171F]/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedVolunteer.title"
          @click.self="closeVolunteerModal"
        >
          <div
            data-lenis-prevent
            class="modal-panel relative max-h-[88vh] w-full max-w-xl overflow-y-auto border border-white/10 bg-[#1C2029] text-[#F8FAFC] shadow-2xl"
          >
            <div class="relative h-56 w-full overflow-hidden bg-[#14171F]">
              <img
                :src="selectedVolunteer.image"
                :alt="selectedVolunteer.title"
                class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1C2029] via-transparent to-black/30"></div>
              <button
                type="button"
                class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#14171F]/80 text-white transition-colors hover:border-[#D63A49] hover:text-[#D63A49]"
                aria-label="Close modal"
                @click="closeVolunteerModal"
              >
                <X :size="18" />
              </button>
            </div>

            <div class="p-6 sm:p-8">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#D63A49]">
                  {{ selectedVolunteer.organization }}
                </span>
                <span class="font-display text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
                  {{ selectedVolunteer.date }}
                </span>
              </div>

              <h3 class="mt-2 font-script text-2xl font-semibold italic text-white">
                {{ selectedVolunteer.title }}
              </h3>

              <p class="mt-4 text-sm leading-relaxed text-[#94A3B8]">
                {{ selectedVolunteer.description }}
              </p>

              <div v-if="selectedVolunteer.highlights?.length" class="mt-6">
                <h4 class="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  Key Contributions
                </h4>
                <ul class="mt-3 space-y-2 text-sm text-[#94A3B8]">
                  <li
                    v-for="(hl, i) in selectedVolunteer.highlights"
                    :key="i"
                    class="flex items-start gap-2.5"
                  >
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D63A49]" aria-hidden="true"></span>
                    <span>{{ hl }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Bottom Slanted Divider into Services (#1C2029) -->
    <DiagonalDivider fill="#1C2029" slope="up-right" position="bottom" />
  </section>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { Eye, X } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import DiagonalDivider from '../ui/DiagonalDivider.vue'
import { experiences, volunteers } from '../../data/portfolio'
import { loadGsap } from '../../composables/useGsap'
import { pauseSmoothScroll, resumeSmoothScroll } from '../../composables/useLenis'

const experienceRef = ref(null)
const timelineContainerRef = ref(null)
const progressLineRef = ref(null)
const activeTab = ref('career')
const selectedVolunteer = ref(null)

let gsapCtx = null
let cachedGsapPack = null

function openVolunteerModal(item) {
  selectedVolunteer.value = item
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
  pauseSmoothScroll()
}

function closeVolunteerModal() {
  selectedVolunteer.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
  resumeSmoothScroll()
}

function handleKeydown(e) {
  if (e.key === 'Escape' && selectedVolunteer.value) {
    closeVolunteerModal()
  }
}

function initTimelineAnimations() {
  gsapCtx?.revert()
  if (!cachedGsapPack || !timelineContainerRef.value || !progressLineRef.value) return
  const { gsap, ScrollTrigger, prefersReducedMotion } = cachedGsapPack
  if (prefersReducedMotion) return

  gsapCtx = gsap.context(() => {
    gsap.fromTo(
      progressLineRef.value,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainerRef.value,
          start: 'top 72%',
          end: 'bottom 68%',
          scrub: 0.6
        }
      }
    )

    const rows = gsap.utils.toArray('.timeline-row')
    rows.forEach((row) => {
      const node = row.querySelector('.timeline-node')
      const dot = row.querySelector('.node-dot')

      gsap.from(row, {
        y: 22,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: row,
          start: 'top 84%',
          once: true
        }
      })

      if (node && dot) {
        gsap.set(node, { rotation: 45, transformStyle: 'preserve-3d' })
        ScrollTrigger.create({
          trigger: row,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(node, {
              rotation: 45,
              rotateY: 180,
              scale: 1.18,
              borderColor: '#D63A49',
              boxShadow: '0 0 18px rgba(214, 58, 73, 0.45)',
              duration: 0.48,
              ease: 'back.out(1.6)'
            })
            gsap.to(dot, { backgroundColor: '#D63A49', duration: 0.3 })
          },
          onLeaveBack: () => {
            const isCurrent = row.dataset.current === 'true'
            const baseColor = isCurrent ? '#D63A49' : '#1F242D'
            gsap.to(node, {
              rotation: 45,
              rotateY: 0,
              scale: 1,
              borderColor: baseColor,
              boxShadow: 'none',
              duration: 0.35,
              ease: 'power2.out'
            })
            gsap.to(dot, { backgroundColor: baseColor, duration: 0.3 })
          }
        })
      }
    })
  }, timelineContainerRef.value)
}

async function switchTab(tab) {
  if (activeTab.value === tab) return
  activeTab.value = tab
  await nextTick()
  initTimelineAnimations()
  if (cachedGsapPack?.ScrollTrigger) {
    cachedGsapPack.ScrollTrigger.refresh()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  cachedGsapPack = await loadGsap()
  initTimelineAnimations()
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
  resumeSmoothScroll()
  gsapCtx?.revert()
})
</script>
