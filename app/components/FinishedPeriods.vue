<template>
  <div class="periods">
    <div v-for="(period, index) in match?.finishedPeriods" :key="`period-${index}`" class="period">
      <div class="period-score">{{ period.scoreHome }}</div>
      <div class="period-separator">-</div>
      <div class="period-score">{{ period.scoreAway }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const { match = undefined } = defineProps<{ match?: Match | undefined }>();
</script>

<style scoped>
.periods {
  display: flex;
  justify-content: center;
  gap: 1.5cqw;
}

.period {
  display: flex;
  gap: 0.2cqw;

  font-size: 4cqh;
  font-weight: 700;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 1.5cqw;
  }
}
</style>
