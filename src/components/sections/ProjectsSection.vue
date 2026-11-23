<template>
  <section
    id="projects"
    ref="projectsRef"
    class="relative w-full bg-[#FFFFFF] px-6 pt-16 pb-28 sm:pt-20 sm:pb-36 md:pt-24 md:pb-40"
  >
    <div class="mx-auto max-w-5xl">
      <SectionHeading title="PROJECTS" theme="light" />

      <!-- Category Filter Tabs -->
      <div
        class="mb-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        role="tablist"
        aria-label="Filter projects by category"
      >
        <button
          v-for="cat in projectCategories"
          :key="cat"
          type="button"
          role="tab"
          :aria-selected="activeCategory === cat"
          class="relative min-h-[44px] px-3 pb-2 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus:outline-none"
          :class="activeCategory === cat ? 'text-[#D63A49]' : 'text-[#4B5565] hover:text-[#1F242D]'"
          @click="setCategory(cat)"
        >
          <span>{{ cat }}</span>
          <span
            v-if="activeCategory === cat"
            class="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#D63A49]"
            aria-hidden="true"
          ></span>
        </button>
      </div>

      <!-- Rectangular Thumbnail Grid with Out-In Transition & GSAP Stagger -->
      <Transition name="project-switch" mode="out-in" @enter="onGridEnter" @after-enter="onGridAfterEnter">
        <div
          :key="`${activeCategory}-${showAll}`"
          class="relative grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="project in displayedProjects"
            :key="project.name"
            class="project-card-item flex w-full flex-col items-center text-center"
          >
          <div class="project-card-inner flex w-full flex-col items-center">
            <div class="group relative w-full">
              <!-- Subtle Crimson Outer Frame Accent on Hover -->
              <div
                class="pointer-events-none absolute -inset-1.5 border border-[#D63A49]/0 transition-all duration-300 group-hover:border-[#D63A49]/70"
                aria-hidden="true"
              ></div>

              <div
                role="button"
                tabindex="0"
                :aria-label="`Inspect ${project.name} project details`"
                class="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-sm bg-[#1C2029] shadow-[0_12px_30px_rgba(20,23,31,0.09)] ring-1 ring-slate-200 transition-[transform,box-shadow] duration-200 ease-out will-change-transform group-hover:shadow-[0_20px_42px_rgba(214,58,73,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A49]"
                :style="getTiltStyle(project.name)"
                @mousemove="(e) => handleCardTilt(e, project.name)"
                @mouseleave="() => resetCardTilt(project.name)"
                @click="openModal(project)"
                @keydown.enter="openModal(project)"
                @keydown.space.prevent="openModal(project)"
              >
                <img
                  :src="project.image"
                  :alt="project.name"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <!-- Rectangular Curtain Hover Overlay -->
                <div
                  class="absolute inset-0 flex flex-col items-center justify-center bg-[#14171F]/90 p-5 text-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  <span class="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-[#D63A49]">
                    {{ project.category }}
                  </span>

                  <h3 class="mt-1.5 line-clamp-2 font-script text-xl font-semibold italic leading-tight text-white">
                    {{ project.name }}
                  </h3>

                  <div class="mt-2.5 flex flex-wrap justify-center gap-1">
                    <span
                      v-for="tech in project.techStack.slice(0, 3)"
                      :key="tech"
                      class="border border-white/15 bg-white/5 px-2 py-0.5 font-display text-[9px] uppercase tracking-wider text-slate-200"
                    >
                      {{ tech }}
                    </span>
                  </div>

                  <div class="mt-4 flex items-center justify-center gap-2.5">
                    <span
                      class="flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-[#D63A49] hover:bg-[#D63A49]"
                      title="Project Details"
                    >
                      <Eye :size="15" />
                    </span>

                    <a
                      v-if="project.websiteUrl"
                      :href="project.websiteUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open live project"
                      title="Live Project"
                      class="flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-[#D63A49] hover:bg-[#D63A49]"
                      @click.stop
                    >
                      <ExternalLink :size="15" />
                    </a>

                    <a
                      v-if="project.githubUrl"
                      :href="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source code on GitHub"
                      title="GitHub Repository"
                      class="flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-[#D63A49] hover:bg-[#D63A49]"
                      @click.stop
                    >
                      <Github :size="15" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Clean Caption for Touch & Scanability -->
            <div class="mt-4 w-full px-1">
              <h3 class="font-display text-xs font-bold uppercase tracking-[0.16em] text-[#1F242D]">
                {{ project.name }}
              </h3>
              <p class="mt-1 font-script text-sm italic text-[#4B5565]">
                {{ project.techStack.slice(0, 3).join(' / ') }}
              </p>
            </div>
          </div>
          </article>
        </div>
      </Transition>

      <!-- Show All / Collapse Toggle -->
      <div v-if="filteredProjects.length > initialVisibleCount" class="mt-12 text-center">
        <button
          type="button"
          class="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#D63A49] px-7 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#1F242D] transition-all duration-200 hover:bg-[#D63A49] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A49]"
          @click="toggleShowAll"
        >
          <span>
            {{ showAll ? 'Show Featured (6)' : `View All ${activeCategory === 'ALL' ? '' : activeCategory + ' '}Projects (${filteredProjects.length})` }}
          </span>
        </button>
      </div>
    </div>

    <!-- Project Detail Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="selectedProject"
          class="fixed inset-0 z-50 flex items-center justify-center bg-[#14171F]/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedProject.name"
          @click.self="closeModal"
        >
          <div
            data-lenis-prevent
            class="modal-panel relative max-h-[88vh] w-full max-w-2xl overflow-y-auto border border-white/10 bg-[#1C2029] text-[#F8FAFC] shadow-2xl"
          >
            <div class="relative h-60 w-full overflow-hidden bg-[#14171F] sm:h-72">
              <img
                :src="selectedProject.image"
                :alt="selectedProject.name"
                class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1C2029] via-transparent to-black/30"></div>
              <button
                type="button"
                class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#14171F]/85 text-white transition-colors hover:border-[#D63A49] hover:text-[#D63A49]"
                aria-label="Close project modal"
                @click="closeModal"
              >
                <X :size="18" />
              </button>
            </div>

            <div class="p-6 sm:p-8">
              <span class="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#D63A49]">
                {{ selectedProject.category }}
              </span>

              <h3 class="mt-2 font-script text-3xl font-semibold italic text-white">
                {{ selectedProject.name }}
              </h3>

              <p class="mt-4 text-sm leading-7 text-[#94A3B8] sm:text-[15px]">
                {{ selectedProject.description }}
              </p>

              <div class="mt-6">
                <h4 class="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  Tech Stack
                </h4>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="tech in selectedProject.techStack"
                    :key="tech"
                    class="border border-white/15 bg-white/5 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div
                v-if="selectedProject.websiteUrl || selectedProject.githubUrl"
                class="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6"
              >
                <a
                  v-if="selectedProject.websiteUrl"
                  :href="selectedProject.websiteUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#D63A49] bg-[#D63A49] px-6 py-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#E04A58]"
                >
                  <ExternalLink :size="15" />
                  <span>Live Preview</span>
                </a>

                <a
                  v-if="selectedProject.githubUrl"
                  :href="selectedProject.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 px-6 py-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#D63A49] hover:text-[#D63A49]"
                >
                  <Github :size="15" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Bottom Slanted Divider into Testimonials (#E3E9EE) -->
    <DiagonalDivider fill="#E3E9EE" slope="down-right" position="bottom" />
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { ExternalLink, Eye, Github, X } from 'lucide-vue-next'
import SectionHeading from '../ui/SectionHeading.vue'
import DiagonalDivider from '../ui/DiagonalDivider.vue'
import { projectCategories, projects } from '../../data/portfolio'
import { loadGsap } from '../../composables/useGsap'
import { pauseSmoothScroll, resumeSmoothScroll } from '../../composables/useLenis'

const projectsRef = ref(null)
const initialVisibleCount = 6
const activeCategory = ref('ALL')
const showAll = ref(false)
const selectedProject = ref(null)
const tiltMap = reactive({})

let canTilt = false
let gsapPackCache = null
let staggerCtx = null

const filteredProjects = computed(() => {
  if (activeCategory.value === 'ALL') {
    return projects
  }
  return projects.filter((p) => p.category === activeCategory.value)
})

const displayedProjects = computed(() => {
  if (showAll.value) {
    return filteredProjects.value
  }
  return filteredProjects.value.slice(0, initialVisibleCount)
})

function handleCardTilt(e, name) {
  if (!canTilt) return
  const rect = e.currentTarget.getBoundingClientRect()
  if (rect.width <= 0 || rect.height <= 0) return

  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  const rotateY = nx * 20
  const rotateX = -ny * 20
  tiltMap[name] = { rotateX, rotateY }
}

function resetCardTilt(name) {
  if (tiltMap[name]) {
    tiltMap[name] = { rotateX: 0, rotateY: 0 }
  }
}

function getTiltStyle(name) {
  const state = tiltMap[name]
  if (!state || (state.rotateX === 0 && state.rotateY === 0)) {
    return { transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)' }
  }
  return {
    transform: `perspective(800px) rotateX(${state.rotateX.toFixed(2)}deg) rotateY(${state.rotateY.toFixed(2)}deg)`
  }
}

function onGridEnter(el) {
  if (!gsapPackCache || gsapPackCache.prefersReducedMotion) return
  const { gsap } = gsapPackCache
  const cards = el.querySelectorAll('.project-card-inner')
  if (!cards.length) return

  staggerCtx?.revert()
  staggerCtx = gsap.context(() => {
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      }
    )
  }, el)
}

function onGridAfterEnter() {
  gsapPackCache?.ScrollTrigger?.refresh()
}

function setCategory(category) {
  if (activeCategory.value === category) return
  activeCategory.value = category
  showAll.value = false
}

function toggleShowAll() {
  showAll.value = !showAll.value
}

function openModal(project) {
  selectedProject.value = project
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
  pauseSmoothScroll()
}

function closeModal() {
  selectedProject.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
  resumeSmoothScroll()
}

function handleKeydown(e) {
  if (e.key === 'Escape' && selectedProject.value) {
    closeModal()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  canTilt = finePointer && !reducedMotion
  gsapPackCache = await loadGsap()
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
  resumeSmoothScroll()
  staggerCtx?.revert()
})
</script>
