<template>
  <section
    id="contacts"
    class="relative w-full overflow-hidden bg-[#14171F] px-6 pt-28 pb-12 sm:pt-32 md:pt-40"
  >
    <!-- Top Slanted Divider from Tech Stack (#1C2029) -->
    <DiagonalDivider fill="#1C2029" slope="down-right" position="top" />

    <!-- Atmospheric Dark Monochrome Background Image + Vignette Overlay -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <img
        src="/volunteers/DevFest.webp"
        alt=""
        class="h-full w-full scale-105 object-cover object-center grayscale opacity-20"
      />
      <div
        class="absolute inset-0"
        style="background: radial-gradient(circle at top center, rgba(20, 23, 31, 0.72) 0%, rgba(20, 23, 31, 0.92) 60%, #14171F 100%);"
      ></div>
    </div>

    <!-- Three.js Architectural Terrain Grid Backdrop -->
    <ContactThreeCanvas />

    <!-- Protective Contrast Scrim so Contact Info & Form Remain Crisp -->
    <div
      class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#14171F]/65 via-[#14171F]/55 to-[#14171F]/80"
      aria-hidden="true"
    ></div>

    <div class="relative z-10 mx-auto max-w-4xl">
      <SectionHeading title="CONTACTS" theme="dark" />

      <!-- 3-Column Contact Info Row with Crimson Diamond Icons -->
      <div class="mb-16 grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-8">
        <!-- Location -->
        <div class="group flex flex-col items-center">
          <div class="relative mb-5 flex h-12 w-12 items-center justify-center">
            <span
              class="absolute inset-0 rotate-45 border border-[#D63A49] transition-all duration-500 group-hover:rotate-[135deg] group-hover:bg-[#D63A49]/15 group-hover:shadow-[0_0_20px_rgba(214,58,73,0.35)]"
              aria-hidden="true"
            ></span>
            <MapPin :size="18" class="relative z-10 text-white transition-colors group-hover:text-[#D63A49]" />
          </div>
          <p class="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
            Location
          </p>
          <p class="mt-1.5 text-sm font-medium text-[#F8FAFC]">
            {{ profile.location }}
          </p>
        </div>

        <!-- Email -->
        <div class="group flex flex-col items-center">
          <div class="relative mb-5 flex h-12 w-12 items-center justify-center">
            <span
              class="absolute inset-0 rotate-45 border border-[#D63A49] transition-all duration-500 group-hover:rotate-[135deg] group-hover:bg-[#D63A49]/15 group-hover:shadow-[0_0_20px_rgba(214,58,73,0.35)]"
              aria-hidden="true"
            ></span>
            <Mail :size="18" class="relative z-10 text-white transition-colors group-hover:text-[#D63A49]" />
          </div>
          <p class="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
            Email
          </p>
          <a
            :href="profile.socialLinks.email"
            class="mt-1.5 text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#D63A49]"
          >
            {{ profile.email }}
          </a>
        </div>

        <!-- Social Profiles -->
        <div class="group flex flex-col items-center">
          <div class="relative mb-5 flex h-12 w-12 items-center justify-center">
            <span
              class="absolute inset-0 rotate-45 border border-[#D63A49] transition-all duration-500 group-hover:rotate-[135deg] group-hover:bg-[#D63A49]/15 group-hover:shadow-[0_0_20px_rgba(214,58,73,0.35)]"
              aria-hidden="true"
            ></span>
            <Globe :size="18" class="relative z-10 text-white transition-colors group-hover:text-[#D63A49]" />
          </div>
          <p class="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
            Connect
          </p>
          <div class="mt-1.5 flex items-center gap-3 text-sm font-medium text-[#F8FAFC]">
            <a
              :href="profile.socialLinks.github"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-[#D63A49]"
            >
              GitHub
            </a>
            <span class="text-[#94A3B8]/50">/</span>
            <a
              :href="profile.socialLinks.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-[#D63A49]"
            >
              LinkedIn
            </a>
            <span class="text-[#94A3B8]/50">/</span>
            <a
              :href="profile.socialLinks.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-[#D63A49]"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <!-- Minimalist Contact Form -->
      <div class="mx-auto max-w-3xl">
        <div
          v-if="submitted"
          class="border border-[#D63A49]/40 bg-[#1C2029]/80 p-8 text-center backdrop-blur-sm"
        >
          <CheckCircle2 :size="34" class="mx-auto text-[#D63A49]" />
          <h3 class="mt-4 font-script text-2xl font-semibold italic text-white">
            Message Ready to Send
          </h3>
          <p class="mt-2 text-sm text-[#94A3B8]">
            Thank you, {{ form.name }}. Use the button below to launch your default email client with your message pre-filled, or send another note.
          </p>
          <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              :href="mailtoHref"
              class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#D63A49] bg-[#D63A49] px-7 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#E04A58]"
            >
              <Mail :size="15" />
              <span>Open in Email App</span>
            </a>
            <button
              type="button"
              class="inline-flex min-h-[44px] items-center rounded-full border border-white/25 px-7 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#D63A49] hover:text-[#D63A49]"
              @click="resetForm"
            >
              Send Another
            </button>
          </div>
        </div>

        <form v-else class="space-y-8" novalidate @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <!-- Name Input -->
            <div class="group relative">
              <label for="contact-name" class="sr-only">Your Name</label>
              <span
                class="pointer-events-none absolute bottom-4 left-0 h-1.5 w-1.5 rotate-45 bg-white/75 transition-colors group-focus-within:bg-[#D63A49]"
                aria-hidden="true"
              ></span>
              <input
                id="contact-name"
                v-model.trim="form.name"
                type="text"
                required
                placeholder="YOUR NAME"
                class="w-full border-0 border-b border-slate-400/65 bg-transparent py-3 pl-5 font-display text-xs tracking-[0.16em] text-white placeholder:text-slate-300/85 focus:border-[#D63A49] focus:outline-none"
              />
            </div>

            <!-- Email Input -->
            <div class="group relative">
              <label for="contact-email" class="sr-only">Your Email</label>
              <span
                class="pointer-events-none absolute bottom-4 left-0 h-1.5 w-1.5 rotate-45 bg-white/75 transition-colors group-focus-within:bg-[#D63A49]"
                aria-hidden="true"
              ></span>
              <input
                id="contact-email"
                v-model.trim="form.email"
                type="email"
                required
                placeholder="YOUR EMAIL"
                class="w-full border-0 border-b border-slate-400/65 bg-transparent py-3 pl-5 font-display text-xs tracking-[0.16em] text-white placeholder:text-slate-300/85 focus:border-[#D63A49] focus:outline-none"
              />
            </div>
          </div>

          <!-- Message Input -->
          <div class="group relative">
            <label for="contact-message" class="sr-only">Your Message</label>
            <span
              class="pointer-events-none absolute top-4 left-0 h-1.5 w-1.5 rotate-45 bg-white/75 transition-colors group-focus-within:bg-[#D63A49]"
              aria-hidden="true"
            ></span>
            <textarea
              id="contact-message"
              v-model.trim="form.message"
              rows="3"
              required
              placeholder="YOUR MESSAGE"
              class="w-full resize-none border-0 border-b border-slate-400/65 bg-transparent py-3 pl-5 font-display text-xs tracking-[0.16em] text-white placeholder:text-slate-300/85 focus:border-[#D63A49] focus:outline-none"
            ></textarea>
          </div>

          <p v-if="errorMessage" role="alert" class="text-center text-xs font-medium text-[#D63A49]">
            {{ errorMessage }}
          </p>

          <div class="pt-2 text-center">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="inline-flex min-h-[46px] min-w-[140px] items-center justify-center gap-2 rounded-full border border-[#D63A49] px-10 py-3 font-display text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all duration-200 hover:bg-[#D63A49] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Loader2 v-if="isSubmitting" :size="15" class="animate-spin" />
              <span>{{ isSubmitting ? 'Sending' : 'Send' }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Integrated Minimalist Footer -->
      <footer class="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
        <div class="flex items-center gap-3">
          <BrandMark :size="26" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#F8FAFC]">
            {{ profile.displayName }}
          </span>
        </div>

        <p class="text-xs text-[#94A3B8]">
          &copy; {{ currentYear }} {{ profile.fullName }}. All rights reserved.
        </p>

        <div class="flex items-center gap-3">
          <a
            :href="profile.socialLinks.github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="flex h-9 w-9 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#D63A49]"
          >
            <Github :size="16" />
          </a>
          <a
            :href="profile.socialLinks.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="flex h-9 w-9 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#D63A49]"
          >
            <Linkedin :size="16" />
          </a>
          <a
            :href="profile.socialLinks.instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="flex h-9 w-9 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#D63A49]"
          >
            <Instagram :size="16" />
          </a>
          <a
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-1 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8] transition-colors hover:text-[#D63A49]"
          >
            CV
          </a>
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import {
  CheckCircle2,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin
} from 'lucide-vue-next'
import BrandMark from '../ui/BrandMark.vue'
import DiagonalDivider from '../ui/DiagonalDivider.vue'
import SectionHeading from '../ui/SectionHeading.vue'
import ContactThreeCanvas from '../three/ContactThreeCanvas.vue'
import { profile } from '../../data/portfolio'

const currentYear = computed(() => new Date().getFullYear())

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name || 'Visitor'}`)
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
  )
  return `mailto:${profile.email}?subject=${subject}&body=${body}`
})

async function handleSubmit() {
  errorMessage.value = ''

  if (!form.name || !form.email || !form.message) {
    errorMessage.value = 'Please fill in your name, email address, and message.'
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(form.email)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 550))
  isSubmitting.value = false
  submitted.value = true
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.message = ''
  errorMessage.value = ''
  submitted.value = false
}
</script>
