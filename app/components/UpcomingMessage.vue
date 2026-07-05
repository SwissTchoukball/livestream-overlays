<template>
  <div class="upcoming-message" :class="{ 'upcoming-message--always-visible': alwaysVisible }">
    <div class="upcoming-message-text">{{ $t('comingUp') }}</div>
    <div class="upcoming-message-match-name" v-html="match?.parsedName"></div>
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const { match = undefined, alwaysVisible = false } = defineProps<{
  match?: Match | undefined;
  alwaysVisible?: boolean;
}>();
</script>

<style scoped>
.upcoming-message {
  position: absolute;
  top: 25%;
  right: 6%;
  width: var(--width-upcoming-message);
  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  letter-spacing: -0.05em;
  animation: upcoming-float 3s ease-in-out infinite;
  will-change: transform;

  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
  &.upcoming-message--always-visible,
  .scene-pre-game & {
    opacity: 1;
    transition: opacity 1s cubic-bezier(0.65, 0.05, 0.36, 1) 1.5s;
  }
}

.upcoming-message-text {
  font-size: 5.5cqh;
}

.upcoming-message-match-name {
  font-weight: 700;
  font-size: 8.5cqh;
}

@keyframes upcoming-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1.2cqh);
  }
}
</style>
