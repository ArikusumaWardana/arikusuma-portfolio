<template>
  <svg
    viewBox="0 0 1440 102"
    preserveAspectRatio="none"
    shape-rendering="geometricPrecision"
    aria-hidden="true"
    class="pointer-events-none absolute left-0 z-20 block w-full select-none h-[3.5vw] min-h-[16px] sm:h-[4.2vw] md:h-[5vw] lg:h-[5.5vw] max-h-[84px]"
    :class="position === 'top' ? '-top-px' : '-bottom-px'"
  >
    <polygon :fill="fill" :points="polygonPoints" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fill: {
    type: String,
    required: true
  },
  slope: {
    type: String,
    default: 'up-right',
    validator: (val) => ['up-right', 'down-right'].includes(val)
  },
  position: {
    type: String,
    default: 'bottom',
    validator: (val) => ['top', 'bottom'].includes(val)
  }
})

const polygonPoints = computed(() => {
  if (props.position === 'bottom') {
    return props.slope === 'up-right'
      ? '0,100 1440,0 1440,102 0,102'
      : '0,0 1440,100 1440,102 0,102'
  }
  return props.slope === 'up-right'
    ? '0,0 1440,0 1440,2 0,100'
    : '0,0 1440,0 1440,100 0,2'
})
</script>
