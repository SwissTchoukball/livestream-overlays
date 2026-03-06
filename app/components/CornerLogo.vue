<template>
  <div class="corner-logo" :class="{ [`corner-logo--${size}`]: size }">
    <img :src="logoSrc" :onerror="`this.src='${logoSrcFallback}'`" />
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';

const { size = 'small', competition = undefined } = defineProps<{
  size?: 'small' | 'large';
  competition?: string;
}>();

const logoSrc = computed(() => withBase(`/images/${competition}/corner-logo.png`, useRuntimeConfig().app.baseURL));
const logoSrcFallback = computed(() => withBase('/images/corner-logo.png', useRuntimeConfig().app.baseURL));
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
</style>
