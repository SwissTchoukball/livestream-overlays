<template>
  <main>
    <ul>
      <li v-for="match in matches" :key="match.id" class="match-item">
        <h4>
          {{ match.id }} — {{ match.name }} — {{ match.homeTeam?.name || '?' }} × {{ match.awayTeam?.name || '?' }}
        </h4>

        <NuxtLink :to="{ name: 'matches-thumbnail', query: { id: match.id, source: 'json' } }">Vignette</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-pre-game', query: { id: match.id, source: 'json' } }">Pré-match</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-play-time', query: { id: match.id, source: 'json' } }">Jeu</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-break', query: { id: match.id, source: 'json' } }">Pause</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-end-game', query: { id: match.id, source: 'json' } }">Fin de match</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
const { jsonMatches: matches } = useJsonMatches();
</script>

<style scoped>
.match-item {
  margin-bottom: 20px;
}
</style>
