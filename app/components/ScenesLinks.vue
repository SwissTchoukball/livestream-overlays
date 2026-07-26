<template>
  <div class="link-for-obs">
    <div class="link-for-obs__header">
      <h4>Link for OBS</h4>
      <template v-if="isSupported">
        <button @click="copy()">Copy</button>
        <div v-if="copied">Copied!</div>
      </template>
    </div>
    <div class="link-for-obs__link">{{ linkForOBS }}</div>
  </div>
  <div class="preview-links">
    <h4>Preview links :</h4>
    <NuxtLink :to="$localePath({ name: 'matches-thumbnail', query: { id: matchId, source } })">Thumbnail</NuxtLink>
    <NuxtLink
      :to="
        $localePath({
          name: 'matches-dynamic',
          query: { id: matchId, source, color_home: homeColor, color_away: awayColor },
        })
      "
      >Dynamic</NuxtLink
    >
    <NuxtLink :to="$localePath({ name: 'matches-pre-game', query: { id: matchId, source } })">Pre-game</NuxtLink>
    <NuxtLink
      :to="
        $localePath({
          name: 'matches-play-time',
          query: { id: matchId, source, color_home: homeColor, color_away: awayColor },
        })
      "
      >Play-time</NuxtLink
    >
    <NuxtLink :to="$localePath({ name: 'matches-banner', query: { id: matchId, source } })">Banner</NuxtLink>
    <NuxtLink :to="$localePath({ name: 'matches-end-game', query: { id: matchId, source } })">End-game</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { DataSource } from '~/types/dataSource';

const localePath = useLocalePath();

const {
  matchId,
  source,
  homeColor = undefined,
  awayColor = undefined,
} = defineProps<{
  matchId: string;
  source: DataSource;
  homeColor?: string;
  awayColor?: string;
}>();

const linkForOBS = computed(() => {
  return (
    'https://site.tchoukball.ch/livestream-overlays' +
    localePath({
      name: 'matches-dynamic',
      query: { id: matchId, source, color_home: homeColor, color_away: awayColor },
      locale: 'en',
    })
  );
});

const { copy, copied, isSupported } = useClipboard({ source: linkForOBS });
</script>

<style scoped>
.link-for-obs {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.link-for-obs__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;
}

.link-for-obs__link {
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
}

.preview-links {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
