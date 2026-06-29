<template>
  <div class="periods" :class="{ 'periods--always-visible': alwaysVisible }">
    <div v-for="(period, index) in match?.finishedPeriods" :key="`period-${index}`" class="period">
      <div class="period-score">{{ period.scoreHome }}</div>
      <div class="period-separator">-</div>
      <div class="period-score">{{ period.scoreAway }}</div>
    </div>
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
.periods {
  display: flex;
  justify-content: center;
}

.period {
  flex: 1 0 0;
  min-width: 0;

  display: flex;
  justify-content: center;
  gap: 0.2cqw;
  padding-inline: 1.5cqw;

  font-size: 3cqh;
  font-weight: 700;

  &:not(:last-child) {
    border-right: 0.2cqh solid currentColor;
  }

  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
  .periods--always-visible &,
  .scene-end-game & {
    opacity: 1;
    transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1s;
  }
}
</style>
