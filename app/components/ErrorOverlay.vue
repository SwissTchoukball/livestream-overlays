<template>
  <div class="error-overlay">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{ message: string }>();
</script>

<style scoped>
.error-overlay {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ff0000cc;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  align-content: center;
  padding: 1rem;
}
</style>
