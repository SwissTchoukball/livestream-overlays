<template>
  <img
    :src="logoSrc"
    class="competition-logo"
    :class="{
      'competition-logo--monochrome': monochrome,
      'competition-logo--small': small,
      'competition-logo--always-visible': alwaysVisible,
    }"
  />
</template>

<script setup lang="ts">
import { withBase } from 'ufo';
import type Match from '~/models/match.model';

const {
  match = undefined,
  small = false,
  monochrome = false,
  alwaysVisible = false,
} = defineProps<{
  match?: Match;
  small?: boolean;
  monochrome?: boolean;
  alwaysVisible?: boolean;
}>();

const logoFilename = computed(() => {
  let filename = 'logo';
  if (small) {
    filename += '-small';
  }
  if (monochrome) {
    filename += '-mono';
  }
  return `${filename}.svg`;
});
const logoSrc = computed(() =>
  withBase(`/images/${match?.assetsFolder ?? 'default'}/${logoFilename.value}`, useRuntimeConfig().app.baseURL),
);
</script>

<style scoped>
.competition-logo {
  opacity: 0;
  transition: opacity 0.5s ease;

  &.competition-logo--always-visible,
  .scene-pre-game &:not(.competition-logo--small),
  .scene-end-game &:not(.competition-logo--small) {
    opacity: 1;
    transition-delay: 1.5s;
  }

  .scene-break &.competition-logo--small:not(.competition-logo--monochrome) {
    opacity: 1;
    transition-delay: 1s;
  }

  .scene-play-time &.competition-logo--monochrome,
  .scene- &.competition-logo--monochrome {
    opacity: 1;
  }
}

.competition-logo--monochrome {
  filter: invert(1) opacity(0.5);
}
</style>
