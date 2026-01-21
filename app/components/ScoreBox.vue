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
  font-size: 60px;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
}

.score-box {
  width: 300px;
  height: 130px;
  margin-top: 40px;
  background: linear-gradient(to right, #3e2169, #008b3e);
  border-radius: 20px;
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
  font-size: 100px;
  font-weight: 700;
}
</style>
