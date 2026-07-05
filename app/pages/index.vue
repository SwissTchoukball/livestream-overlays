<template>
  <main>
    <h1>tchouk.net</h1>
    <ul>
      <li class="match-item">
        <h4>Entrée manuelle</h4>
        <label>ID tchouk.net du match</label>
        <input v-model="tchoukNetManualMatchId" type="text" /><br />
        <ScenesLinks :match-id="tchoukNetManualMatchId" source="tchouk.net" />
      </li>
      <li v-for="match in tchoukNetMatches" :key="match.id" class="match-item">
        <h4>{{ match.name }} – {{ match.id }}</h4>
        <ScenesLinks :match-id="match.id" source="clupik" />
      </li>
    </ul>

    <h1>Clupik</h1>
    <ul>
      <li class="match-item">
        <h4>Entrée manuelle</h4>
        <label>ID Clupik du match</label>
        <input v-model="clupikManualMatchId" type="text" /><br />
        <ScenesLinks :match-id="clupikManualMatchId" source="clupik" />
      </li>
      <li v-for="match in clupikMatches" :key="match.id" class="match-item">
        <h4>{{ match.name }} – {{ match.id }}</h4>
        <ScenesLinks :match-id="match.id" source="clupik" />
      </li>
    </ul>

    <h1>JSON</h1>
    <ul>
      <li v-for="match in matches" :key="match.id" class="match-item">
        <h4>
          {{ match.id }} — {{ match.name }} — {{ match.homeTeam?.name || '?' }} × {{ match.awayTeam?.name || '?' }}
        </h4>
        <ScenesLinks :match-id="match.id" source="json" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
const { jsonMatches: matches } = useJsonMatches();
const tchoukNetManualMatchId = ref('');
const tchoukNetMatches: { id: string; name: string }[] = [];

const clupikManualMatchId = ref('');
const clupikMatches: { id: string; name: string }[] = [
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
