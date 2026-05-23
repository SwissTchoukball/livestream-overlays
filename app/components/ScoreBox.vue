<template>
  <div class="score">
    <div v-if="!hideLabel" class="score-label">Score<br />final</div>
    <div class="score-box">
      <div class="score-text">{{ match?.resultHome }}</div>
      <div class="score-separator"></div>
      <div class="score-text">{{ match?.resultAway }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const { hideLabel, match = undefined } = defineProps<{ hideLabel?: boolean; match?: Match | undefined }>();
</script>

<style scoped>
.score-label {
  font-size: 5.5cqh;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
}

.score-box {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5cqw;

  min-width: 27.8cqh;
  height: 12cqh;
  margin-top: 5.1cqh;
  background-image: var(--gradient-score-box);
  background-color: var(--background-color-score-box);
  border-radius: 1cqw;
  text-align: center;

  &:first-child {
    margin-top: 0;
  }
}

.score-text {
  padding: 0 2cqh;
  font-size: 9.3cqh;
  font-weight: 700;

  background-image: var(--gradient-score-separator);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.score-separator {
  height: calc(104%);
  transform: translateY(-2%) rotate(10deg);
  overflow: hidden;
  width: 0.5cqh;
  background-image: var(--gradient-score-separator);
}
</style>
