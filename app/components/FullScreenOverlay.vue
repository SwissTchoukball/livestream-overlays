<template>
  <div class="full-screen-overlay">
    <CornerLogo :size="cornerLogoSize" :competition="competition" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { cornerLogoSize = 'small', competition = undefined } = defineProps<{
  cornerLogoSize?: 'small' | 'large';
  competition?: string;
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
