<template>
  <OverlayViewer :match="match">
    <FullScreenOverlay :match="match" class="end-game">
      <div class="game-over-message">Match terminé !</div>
      <TeamsWithLogo v-if="match" :match="match" with-score-box class="end-game__teams" />
      <FinishedPeriods :match="match" class="end-game__periods" />
      <ErrorOverlay v-if="matchLoadingError" :message="matchLoadingError.message" />
    </FullScreenOverlay>
  </OverlayViewer>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';
import type { DataSource } from '~/types/dataSource';

const route = useRoute();
const { getMatch, matchLoadingError } = useMatch(route.query.id as string, route.query.source as DataSource);

const match = ref<Match>();

match.value = await getMatch();

onMounted(async () => {
  if (route.query.source !== 'json') {
    setInterval(async () => {
      match.value = await getMatch();
    }, 5000);
  }
});
</script>

<style scoped>
.end-game {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-over-message {
  margin-top: 20cqh;
  padding-right: 6%;
  width: 100%;

  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  font-size: 5.5cqh;
  font-weight: 700;
}

.end-game__teams {
  margin-top: 20cqh;
}

.end-game__periods {
  margin-top: 2cqh;
}
</style>
