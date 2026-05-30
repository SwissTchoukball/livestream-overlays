<template>
  <div class="full-screen-overlay">
    <CornerVisual :size="cornerVisualSize" :match="match" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const { cornerVisualSize = 'small', match = undefined } = defineProps<{
  cornerVisualSize?: 'small' | 'large';
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
