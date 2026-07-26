<template>
  <main>
    <h1>Livestream overlays</h1>
    <h2>tchouk.net – Euro 2026</h2>

    <section class="match-filters">
      <h3>Choose a match</h3>
      <label>Day</label>
      <select v-model="tchoukNetSelectedDay">
        <option v-for="day in tchoukNetDays" :key="day" :value="day">{{ day }}</option>
      </select>
      <label>Field</label>
      <select v-model="tchoukNetSelectedField">
        <option v-for="field in tchoukNetFields" :key="field" :value="field">{{ field }}</option>
      </select>
      <template v-if="tchoukNetFilteredMatches.length > 0">
        <label>Match</label>
        <select v-model="tchoukNetSelectedMatchId">
          <option v-for="match in tchoukNetFilteredMatches" :key="match.id" :value="match.id">
            {{
              Intl.DateTimeFormat(`en-GB`, {
                timeStyle: 'short',
                timeZone: 'Europe/Zurich',
              }).format(new Date(match.startAt))
            }}
            – {{ match.name }}
          </option>
        </select>
      </template>
    </section>

    <section v-if="tchoukNetSelectedMatch">
      <p>
        {{
          Intl.DateTimeFormat(`fr-CH`, {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Europe/Zurich',
          }).format(new Date(tchoukNetSelectedMatch.startAt))
        }}
        –
        {{ tchoukNetSelectedMatch.field }}
      </p>
      <h3>{{ tchoukNetSelectedMatch.name }}</h3>
      <div class="jersey-color-pickers">
        <label>Jersey color {{ tchoukNetSelectedMatch.teamA?.name || 'Team A' }}</label>
        <input v-model="tchoukNetHomeColor" type="color" />
        <label>Jersey color {{ tchoukNetSelectedMatch.teamB?.name || 'Team B' }}</label>
        <input v-model="tchoukNetAwayColor" type="color" />
      </div>
      <ScenesLinks
        :match-id="tchoukNetSelectedMatchId"
        source="tchouk.net"
        :home-color="tchoukNetHomeColor"
        :away-color="tchoukNetAwayColor"
      />
    </section>
    <section v-else>
      <p>No match selected</p>
    </section>

    <section>
      <h3>Manual entry</h3>
      <label>tchouk.net match ID : </label>
      <input v-model="tchoukNetManualMatchId" type="text" /><br />
      <ScenesLinks v-if="tchoukNetManualMatchId" :match-id="tchoukNetManualMatchId" source="tchouk.net" />
    </section>

    <!-- <h1>Clupik</h1>
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
    </ul> -->

    <!-- <h1>JSON</h1>
    <ul>
      <li v-for="match in matches" :key="match.id" class="match-item">
        <h4>
          {{ match.id }} — {{ match.name }} — {{ match.homeTeam?.name || '?' }} × {{ match.awayTeam?.name || '?' }}
        </h4>
        <ScenesLinks :match-id="match.id" source="json" />
      </li>
    </ul> -->
  </main>
</template>

<script lang="ts" setup>
interface TchoukNetMatch {
  id: string;
  name: string;
  teamA?: { id: string; name: string };
  teamB?: { id: string; name: string };
  startAt: string;
  field: string;
}

// const { jsonMatches: matches } = useJsonMatches();
const tchoukNetManualMatchId = ref('');
const tchoukNetSelectedDay = useLocalStorage('tchoukNetSelectedDay', '');
const tchoukNetSelectedField = useLocalStorage('tchoukNetSelectedField', '');
const tchoukNetSelectedMatchId = useLocalStorage('tchoukNetSelectedMatchId', '');
const tchoukNetHomeColor = useLocalStorage('tchoukNetHomeColor', '#ff0000');
const tchoukNetAwayColor = useLocalStorage('tchoukNetAwayColor', '#0000ff');

// `1f0a5f2c-fb2a-64da-b726-dfb22bf931c9` is Euro 2026
const tchoukNetEventId = '1f0a5f2c-fb2a-64da-b726-dfb22bf931c9';
const { data: tchoukNetGamesResponses } = useFetch<{
  event: { id: string; name: string };
  games: {
    id: string;
    name: string;
    start_at: string;
    field: { id: string; name: string };
    competition_phase: { id: string; name: string };
    selection_a?: { id: string; name: string };
    selection_b?: { id: string; name: string };
  }[];
}>(`https://data.tchouk.net/api/games/event/${tchoukNetEventId}`);

const tchoukNetMatches = computed<TchoukNetMatch[]>(() => {
  if (!tchoukNetGamesResponses.value) return [];

  return tchoukNetGamesResponses.value.games
    .toSorted((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
    .map((game) => {
      let name = '';
      name += game.selection_a?.name ? game.selection_a.name : '?';
      name += ' × ';
      name += game.selection_b?.name ? game.selection_b.name : '?';
      name += ' – ';
      name += game.name ? `${game.name}` : '';
      name += !game.name && game.competition_phase.name ? `${game.competition_phase.name}` : '';

      const teamA = game.selection_a ? { id: game.selection_a.id, name: game.selection_a.name } : { id: '', name: '?' };
      const teamB = game.selection_b ? { id: game.selection_b.id, name: game.selection_b.name } : { id: '', name: '?' };
      return {
        id: game.id,
        name,
        teamA,
        teamB,
        startAt: game.start_at,
        field: game.field.name,
      };
    });
});

const tchoukNetDays = computed(() =>
  tchoukNetMatches.value
    ?.map((match) =>
      Intl.DateTimeFormat(`fr-CH`, {
        dateStyle: 'short',
      }).format(new Date(match.startAt)),
    )
    .filter((day, index, self) => self.indexOf(day) === index),
);

const tchoukNetFields = computed(() =>
  tchoukNetMatches.value?.map((match) => match.field).filter((field, index, self) => self.indexOf(field) === index),
);

const tchoukNetFilteredMatches = computed(() =>
  tchoukNetMatches.value?.filter(
    (match) =>
      Intl.DateTimeFormat(`fr-CH`, {
        dateStyle: 'short',
      }).format(new Date(match.startAt)) === tchoukNetSelectedDay.value && match.field === tchoukNetSelectedField.value,
  ),
);

const tchoukNetSelectedMatch = computed(() =>
  tchoukNetFilteredMatches.value?.find((match) => match.id === tchoukNetSelectedMatchId.value),
);

// const clupikManualMatchId = ref('');
// const clupikMatches: { id: string; name: string }[] = [
//   { id: '144976227', name: '13.06 10h00 - Puplinge Oympus – Sion Expendables' },
//   { id: '144976228', name: '13.06 11h30 - Geneva Dragons M21 – Delémont Blizzard' },
//   { id: '144976232', name: '13.06 13h00 - Val-de-Ruz Pingouins – Geneva Young Dragons' },
//   { id: '144715225', name: '13.06 15h00 - Lausanne Olympic – La Chaux-de-Fonds Beehives' },
//   { id: '144715222', name: '13.06 16h30 - Geneva Dragons – Val-de-Ruz Flyers' },
//   { id: '144976314', name: '14.06 10h00 - Team Vaud – Geneva Dragons Girls' },
//   { id: '144976315', name: '14.06 11h15 - Geneva Dragons Women – MeyriNyon Pankers' },
//   { id: '144976317', name: '14.06 13h45 - Petite finale féminine' },
//   { id: '144976316', name: '14.06 15h00 - Finale féminine' },
// ];
</script>

<style scoped>
main {
  padding: 1rem;
}

h1 {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

section {
  margin-top: 2rem;
}

.match-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;
  width: 360px;

  h3 {
    width: 100%;
  }

  label {
    width: calc(20% - 0.5rem);
  }

  select {
    width: 80%;
  }
}

.jersey-color-pickers {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.1rem;
  width: 360px;
  margin-top: 0.5rem;

  label {
    width: calc(70% - 0.5rem);
  }

  select {
    width: 30%;
  }
}

.match-item {
  margin-bottom: 20px;
}
</style>
