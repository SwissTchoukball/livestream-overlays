<template>
  <main>
    <h1>Clupik</h1>
    <ul>
      <li v-for="match in clupikMatches" :key="match.id" class="match-item">
        <h4>{{ match.name }}</h4>
        <NuxtLink :to="{ name: 'matches-thumbnail', query: { id: match.id, source: 'clupik' } }">Vignette</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-pre-game', query: { id: match.id, source: 'clupik' } }">Pré-match</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-play-time', query: { id: match.id, source: 'clupik' } }">Jeu</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-break', query: { id: match.id, source: 'clupik' } }">Pause</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-end-game', query: { id: match.id, source: 'clupik' } }">Fin de match</NuxtLink>
      </li>
    </ul>

    <h1>JSON</h1>
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

const clupikMatches = [
  { id: '144715218', name: '28.05 20h30 - Geneva Dragons – Lausanne Olympic' },
  { id: '144715238', name: '31.05 12h00 - Geneva Dragons M21 – Val-de-Ruz Pingouins' },
  { id: '144976227', name: '13.06 10h00 - Puplinge Oympus – ?' },
  { id: '144976228', name: '13.06 11h30 - ? – Delémont Blizzard' },
  { id: '144976232', name: '13.06 13h00 - ? – Geneva Young Dragons' },
  { id: '144715225', name: '13.06 15h00 - ? – La Chaux-de-Fonds Beehives' },
  { id: '144715222', name: '13.06 16h30 - ? – Val-de-Ruz Flyers' },
];
</script>

<style scoped>
h1 {
  margin-left: 1rem;
}

.match-item {
  margin-bottom: 20px;
}
</style>
