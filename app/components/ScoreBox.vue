<template>
  <div class="score">
    <div v-if="!hideLabel" class="score-label">Score<br />final</div>
    <div class="score-box">
      <div class="score-separator">:</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { hideLabel } = defineProps<{ hideLabel?: boolean }>();
</script>

<style scoped>
.score-label {
  font-size: 5.5cqh;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
}

.score-box {
  width: 27.8cqh;
  height: 12cqh;
  margin-top: 5.1cqh;
  background: linear-gradient(to top right, #3e2169, #008b3e);
  border-radius: 1cqw;
  text-align: center;

  &:first-child {
    margin-top: 0;
  }
}

.score-separator {
  /* Gradient font colour that goes from white to grey (top to bottom) */
  background: linear-gradient(to bottom, white, #ccc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 9.3cqh;
  font-weight: 700;
}
</style>
