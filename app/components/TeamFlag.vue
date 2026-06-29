<template>
  <div
    class="team-flag"
    :class="{
      'team-flag--floating': floating,
      [`team-flag--${team?.countryCode.ioc?.toLowerCase()}`]: team?.countryCode.ioc,
    }"
  >
    <img v-if="countryFlagSrc" :src="countryFlagSrc" />
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'ufo';
import type Team from '~/models/team.model';

const { team = undefined } = defineProps<{
  team?: Team | null;
  floating?: boolean;
}>();

const countryFlagSrc = computed(() =>
  team?.countryFlagPath ? withBase(team.countryFlagPath, useRuntimeConfig().app.baseURL) : '',
);
</script>

<style scoped>
.team-flag {
  height: 100%;
  aspect-ratio: 1/1;
  img {
    display: block;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.team-flag--floating img {
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.team-flag--ita img,
.team-flag--fra img {
  object-fit: fill;
}

.team-flag--cze img {
  object-position: 35%;
}

.team-flag--esp img {
  object-position: left;
}
</style>
