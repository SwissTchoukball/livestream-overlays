<template>
  <div class="overlay-viewer">
    <slot />
  </div>
</template>

<style scoped>
.overlay-viewer {
  width: 1920px;
  height: 1080px;
  border: 5px solid black;
  border-top: 0;
  border-left: 0;
}
</style>
