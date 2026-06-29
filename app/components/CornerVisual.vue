<template>
  <div
    class="corner-visual"
    :class="{ [`corner-visual--${size}`]: size, 'corner-visual--always-visible': alwaysVisible }"
  >
    <img :src="visualSrc" :onerror="`this.src='${visualSrcFallback}'`" />
    <div v-if="match?.competitionCornerDisplayName" class="corner-visual__text">
      {{ match?.competitionCornerDisplayName }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';
import type Match from '~/models/match.model';

const {
  size = 'small',
  alwaysVisible = false,
  match = undefined,
} = defineProps<{
  size?: 'small' | 'large';
  alwaysVisible?: boolean;
  match?: Match;
}>();

const visualSrc = computed(() =>
  withBase(`/images/${match?.assetsFolder ?? 'default'}/corner-visual.png`, useRuntimeConfig().app.baseURL),
);
const visualSrcFallback = computed(() => withBase('/images/default/corner-visual.png', useRuntimeConfig().app.baseURL));
</script>

<style scoped>
.corner-visual {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;

  &.corner-visual--always-visible,
  .scene-break &,
  .scene-pre-game &,
  .scene-end-game & {
    opacity: 1;
    transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1s;
  }

  img,
  object {
    height: 70%;
  }

  &.corner-visual--small {
    img {
      height: 50%;
    }
  }

  &.corner-visual--large {
    img {
      height: 90%;
    }
  }

  &.corner-visual--logo {
    top: 3cqh;
    left: 3cqw;

    img {
      height: 35%;
    }

    &.corner-visual--small {
      img {
        height: 30%;
      }
    }

    &.corner-visual--large {
      img {
        height: 40%;
      }
    }
  }
}

.corner-visual__text {
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

  .corner-visual--large & {
    font-size: 20cqh;
    top: 10cqh;
    left: 6cqh;
  }
}
</style>
