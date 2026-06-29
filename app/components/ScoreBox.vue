<template>
  <div class="score" :class="{ 'score--for-score-banner': forScoreBanner }">
    <div v-if="!hideLabel" class="score-label">Score<br />final</div>
    <div class="score-box">
      <div class="score-text">{{ match?.resultHome || 0 }}</div>
      <div class="score-separator"></div>
      <div class="score-text">{{ match?.resultAway || 0 }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const {
  match = undefined,
  hideLabel,
  forScoreBanner = false,
} = defineProps<{ match?: Match | undefined; hideLabel?: boolean; forScoreBanner?: boolean }>();
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

  .score--for-score-banner & {
    min-width: 35cqh;
    padding-inline: 6cqw;
    border-radius: 0;
    clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
    transition: clip-path 0.3s ease 0.3s;

    .scene-break & {
      clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    }
  }
}

.score-text {
  padding: 0 1cqw;
  font-size: 9.3cqh;
  font-weight: 700;

  background-image: var(--gradient-score-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* .score-separator {
  transform: translateY(-5%);
} */

.score-separator {
  height: 100%;
  /* transform: translateY(-2%) rotate(10deg); */
  /* overflow: hidden; */
  width: 0.2cqh;
  background-image: var(--gradient-score-text);
}
</style>
