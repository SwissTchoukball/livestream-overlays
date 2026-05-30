<template>
  <div
    class="corner-visual"
    :class="{ [`corner-visual--${size}`]: size, 'corner-visual--logo': match?.competitionHasLogo }"
  >
    <img :src="visualSrc" :onerror="`this.src='${visualSrcFallback}'`" :data-src="visualSrc" />
    <div v-if="match?.competitionCornerDisplayName" class="corner-visual__text">
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

const visualFilename = computed(() => (match?.competitionHasLogo ? 'logo.svg' : 'corner-visual.png'));

const visualSrc = computed(() =>
  withBase(`/images/${match?.assetsFolder ?? 'default'}/${visualFilename.value}`, useRuntimeConfig().app.baseURL),
);
const visualSrcFallback = computed(() => withBase('/images/default/corner-visual.png', useRuntimeConfig().app.baseURL));
</script>

<style scoped>
.corner-visual {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

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
