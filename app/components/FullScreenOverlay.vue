<template>
  <div class="full-screen-overlay">
    <CornerLogo :size="cornerLogoSize" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  cornerLogoSize?: 'small' | 'large';
}>();
</script>

<style scoped>
.full-screen-overlay {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
}
</style>
