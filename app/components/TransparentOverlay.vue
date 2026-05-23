<template>
  <div class="transparent-overlay">
    <slot />
  </div>
</template>

<style scoped>
.transparent-overlay {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
