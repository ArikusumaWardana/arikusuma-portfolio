<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M40 6 L69 22 V58 L40 74 L11 58 V22 Z"
      stroke="#D63A49"
      stroke-width="4.5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <path
      d="M40 23 L25 54 M40 23 L55 54 M30.5 45 H49.5"
      stroke="#D63A49"
      stroke-width="4.5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 40
  }
})
</script>
