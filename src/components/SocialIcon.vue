<template>
  <a :href="link" target="_blank" rel="noopener" class="social-icon icon-btn" :title="name">
    <component :is="icon" :size="22" />
  </a>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    required: true
  }
})
</script>

<style scoped>
.social-icon {
  width: 50px;
  height: 50px;
}
</style>
