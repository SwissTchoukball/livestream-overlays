<template>
  <div class="game-over-message" :class="{ 'game-over-message--always-visible': alwaysVisible }">
    {{ $t('endGameTagLine') }}
  </div>
</template>

<script lang="ts" setup>
const { alwaysVisible = false } = defineProps<{ alwaysVisible?: boolean }>();
</script>

<style scoped>
.game-over-message {
  padding-right: 6%;
  width: 100%;

  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  font-size: 5.5cqh;
  font-weight: 700;

  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
  &.game-over-message--always-visible,
  .scene-end-game & {
    opacity: 1;
    transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1s;
  }
}
</style>
