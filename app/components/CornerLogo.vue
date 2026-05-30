<template>
  <div class="corner-logo" :class="{ [`corner-logo--${size}`]: size }">
    <img :src="logoSrc" :onerror="`this.src='${logoSrcFallback}'`" />
    <div v-if="match?.competitionCornerDisplayName" class="corner-logo__text">
      {{ match?.competitionCornerDisplayName }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';
import type Match from '~/models/match.model';

const { size = 'small', match = undefined } = defineProps<{
  size?: 'small' | 'large';
  match?: Match;
}>();

const assetsFolder = computed(() => {
  // The Swiss Cup has a different visual for each edition
  if (match?.competition === 'swiss-cup') {
    return match?.editionSlug ?? 'default';
  }
  return 'default';
});

const logoSrc = computed(() =>
  withBase(`/images/${assetsFolder.value}/corner-visual.png`, useRuntimeConfig().app.baseURL),
);
const logoSrcFallback = computed(() => withBase('/images/default/corner-visual.png', useRuntimeConfig().app.baseURL));
</script>

<style scoped>
.corner-logo {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  img,
  object {
    height: 70%;
  }

  &.corner-logo--small {
    img {
      height: 50%;
    }
  }

  &.corner-logo--large {
    img {
      height: 90%;
    }
  }
}

.corner-logo__text {
  position: absolute;
  top: 6cqh;
  left: 4cqh;

  transform: skew(0, -10deg);

  font-size: 11cqh;
  font-family: 'Plakette Serial', sans-serif;
  font-weight: 900;
  white-space: pre;
  color: white;
  line-height: 0.8;
  text-transform: uppercase;
  text-shadow: 0.03em 0.03em 0.06em rgba(0, 0, 0, 0.75);

  .corner-logo--large & {
    font-size: 20cqh;
    top: 10cqh;
    left: 6cqh;
  }
}
</style>
