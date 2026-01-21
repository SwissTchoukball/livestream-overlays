<template>
  <main>
    <ul>
      <li v-for="match in matches" :key="match.id" class="match-item">
        <h4>{{ match.id }} — {{ match.name }} — {{ match.homeTeam.name }} × {{ match.awayTeam.name }}</h4>

        <NuxtLink :to="{ name: 'matches-matchId-pre-game', params: { matchId: match.id } }">Pré-match</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-matchId-play-time', params: { matchId: match.id } }">Jeu</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-matchId-break', params: { matchId: match.id } }">Pause</NuxtLink> /
        <NuxtLink :to="{ name: 'matches-matchId-end-game', params: { matchId: match.id } }">Fin de match</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
const { matches } = useMatches();
</script>

<style scoped>
.match-item {
  margin-bottom: 20px;
}
</style>
