<template>
  <div class="full-screen-overlay">
    <CornerLogo />
    <slot />
  </div>
</template>

<style scoped>
.full-screen-overlay {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
}
</style>
