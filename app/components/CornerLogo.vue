<template>
  <div class="corner-logo" :class="{ 'corner-logo--small': small }"><img :src="logoSrc" /></div>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';

const { small } = defineProps<{
  small?: boolean;
}>();

const logoSrc = computed(() => withBase('/images/corner-logo.png', useRuntimeConfig().app.baseURL));
</script>

<style scoped>
.corner-logo {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  img {
    height: 70%;
  }

  &.corner-logo--small {
    img {
      height: 50%;
    }
  }
}
</style>
