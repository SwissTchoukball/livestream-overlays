<template>
  <main>
    <h1>Links to Clupik score pages</h1>
    <ul>
      <li v-for="match in clupikMatches" :key="match.id" class="match-item">
        <h4>
          <a :href="`https://score.clupik.pro/matches/${match.id}/scoreboard`" target="_blank">{{ match.name }}</a>
        </h4>
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
const clupikMatches = [
  { id: '144976227', name: '13.06 10h00 - Puplinge Oympus – Sion Expendables' },
  { id: '144976228', name: '13.06 11h30 - Geneva Dragons M21 – Delémont Blizzard' },
  { id: '144976232', name: '13.06 13h00 - Val-de-Ruz Pingouins – Geneva Young Dragons' },
  { id: '144715225', name: '13.06 15h00 - Lausanne Olympic – La Chaux-de-Fonds Beehives' },
  { id: '144715222', name: '13.06 16h30 - Geneva Dragons – Val-de-Ruz Flyers' },
  { id: '144976314', name: '14.06 10h00 - Team Vaud – Geneva Dragons Girls' },
  { id: '144976315', name: '14.06 11h15 - Geneva Dragons Women – MeyriNyon Pankers' },
  { id: '144976317', name: '14.06 13h45 - Petite finale féminine' },
  { id: '144976316', name: '14.06 15h00 - Finale féminine' },
];
</script>

<style scoped>
h1 {
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.match-item {
  margin-bottom: 20px;
}
</style>
