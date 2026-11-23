<template>
  <div
    class="mb-12 md:mb-16"
    :class="align === 'left' ? 'text-left' : 'text-center'"
  >
    <h2
      class="font-display font-bold uppercase tracking-[0.22em] text-2xl sm:text-3xl md:text-[32px]"
      :class="theme === 'dark' ? 'text-[#F8FAFC]' : 'text-[#1F242D]'"
    >
      {{ title }}
    </h2>

    <div
      class="mt-4 flex items-center gap-3"
      :class="align === 'left' ? 'justify-start' : 'justify-center'"
      aria-hidden="true"
    >
      <span
        class="h-px w-8"
        :class="theme === 'dark' ? 'bg-white/25' : 'bg-[#1F242D]/25'"
      ></span>
      <span
        class="h-2 w-2 rotate-45 border"
        :class="theme === 'dark' ? 'border-[#D63A49] bg-[#D63A49]/20' : 'border-[#D63A49] bg-[#D63A49]/15'"
      ></span>
      <span
        class="h-px w-8"
        :class="theme === 'dark' ? 'bg-white/25' : 'bg-[#1F242D]/25'"
      ></span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'light',
    validator: (val) => ['light', 'dark'].includes(val)
  },
  align: {
    type: String,
    default: 'center',
    validator: (val) => ['center', 'left'].includes(val)
  }
})
</script>
