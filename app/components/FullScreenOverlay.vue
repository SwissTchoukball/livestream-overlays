<template>
  <div class="full-screen-overlay">
    <CornerLogo :size="cornerLogoSize" :match="match" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const { cornerLogoSize = 'small', match = undefined } = defineProps<{
  cornerLogoSize?: 'small' | 'large';
  match?: Match;
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
