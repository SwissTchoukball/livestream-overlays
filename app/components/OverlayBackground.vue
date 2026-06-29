<template>
  <div class="overlay-background" :class="{ 'overlay-background--fullscreen': forceFullscreenBackground }">
    <div class="overlay-background__image"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';
import type Match from '~/models/match.model';

const {
  forceFullscreenBackground = false,
  match = undefined,
  filename = 'background.svg',
} = defineProps<{
  forceFullscreenBackground?: boolean;
  match?: Match;
  filename?: string;
}>();

const backgroundImage = computed(() => {
  const backgroundImageSrc = withBase(
    `/images/${match?.assetsFolder ?? 'default'}/${filename}`,
    useRuntimeConfig().app.baseURL,
  );
  return `url(${backgroundImageSrc})`;
});
</script>

<style scoped>
.overlay-background {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent;
  transition: background-color 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0.2s;
  color: var(--foreground-color-overlay);

  &.overlay-background--fullscreen,
  .scene-pre-game &,
  .scene-end-game & {
    transition: background-color 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1s;
    background-color: var(--background-color-fullscreen-overlay);
  }
}

.overlay-background__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: v-bind(backgroundImage);
  transform: translate(-31cqw, calc(-31cqw * tan(37.5deg)));
  transition: transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0.2s;

  .overlay-background--fullscreen &,
  .scene-pre-game &,
  .scene-end-game & {
    transform: translate(0, 0);
    transition: transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1.2s;
  }
}
</style>
