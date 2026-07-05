<template>
  <NuxtLink :to="$localePath({ name: 'matches-thumbnail', query: { id: matchId, source } })">Thumbnail</NuxtLink>
  /
  <NuxtLink :to="$localePath({ name: 'matches-dynamic', query: { id: matchId, source } })">Dynamic</NuxtLink>
  /
  <NuxtLink :to="$localePath({ name: 'matches-pre-game', query: { id: matchId, source } })">Pre-game</NuxtLink>
  /
  <NuxtLink :to="$localePath({ name: 'matches-play-time', query: { id: matchId, source } })">Play-time</NuxtLink>
  /
  <NuxtLink :to="$localePath({ name: 'matches-break', query: { id: matchId, source } })">Break</NuxtLink>
  /
  <NuxtLink :to="$localePath({ name: 'matches-end-game', query: { id: matchId, source } })">End-game</NuxtLink>
</template>

<script setup lang="ts">
import type { DataSource } from '~/types/dataSource';

const { matchId, source } = defineProps<{ matchId: string; source: DataSource }>();
</script>

<style></style>
