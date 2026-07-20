<template>
  <div class="overlay-viewer" :class="[`theme-${match?.editionSlug}`, `scene-${sceneSlug}`]">
    <slot />
  </div>
  <button class="image-download-button" :disabled="generatingImage" @click="generateBase64Image">
    Télécharger l'image
  </button>
  <progress v-if="generatingImage" />
  <input v-model="currentScene" type="text" placeholder="Custom scene name" />
  <button @click="setScene('pre-game')">Pre-game</button>
  <button @click="setScene('break')">Break</button>
  <button @click="setScene('play-time')">Play time</button>
  <button @click="setScene('end-game')">End game</button>
</template>

<script lang="ts" setup>
import { snapdom } from '@zumer/snapdom';
import type Match from '~/models/match.model';

const { match = undefined } = defineProps<{ match?: Match }>();

const currentScene = ref('');

onMounted(async () => {
  window.addEventListener('obsSceneChanged', function (event) {
    currentScene.value = (event as CustomEvent).detail.name;
  });
});

const sceneSlug = computed(() => {
  return currentScene.value.toLowerCase().replace(' ', '-');
});

function setScene(scene: string) {
  currentScene.value = scene;
}

const generatingImage = ref(false);

async function generateBase64Image() {
  generatingImage.value = true;
  try {
    const overlayViewer = document.querySelector('.overlay-viewer') as HTMLElement;
    overlayViewer.style.border = 'none';
    const result = await snapdom(overlayViewer, {
      useProxy: 'https://proxy.corsfix.com/?',
    });
    await result.download({
      type: 'png',
      filename: 'my-capture.png',
      width: 1920,
      height: 1080,
    });
    overlayViewer.style = '';
  } catch (error) {
    alert('Error generating image');
    console.error(error);
  }
  generatingImage.value = false;
}

defineExpose({
  sceneSlug,
});
</script>

<style scoped>
.overlay-viewer {
  width: 1920px;
  height: 1080px;
  box-sizing: content-box;
  container-type: size;
  border: 5px solid black;
  border-top: 0;
  border-left: 0;

  /* background-color: lightgrey; */

  @media (min-resolution: 2x) {
    width: 960px;
    height: 540px;
  }
}

.image-download-button {
  margin: 1rem;
}
</style>
