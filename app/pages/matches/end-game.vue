<template>
  <OverlayViewer :match="match">
    <FullScreenOverlay :match="match" class="end-game">
      <div class="game-over-message">Match terminé !</div>
      <TeamsWithLogo v-if="match" :match="match" with-score-box class="end-game__teams" />
      <FinishedPeriods :match="match" class="end-game__periods" />
      <ErrorOverlay v-if="error" :message="error.message" />
    </FullScreenOverlay>
  </OverlayViewer>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';
import type { DataSource } from '~/types/dataSource';

const route = useRoute();
const { getMatch } = useMatches();

const match = ref<Match>();
const error = ref<Error>();

(async () => {
  try {
    match.value = await getMatch(route.query.id as string, route.query.source as DataSource);
  } catch (e: unknown) {
    error.value = e as Error;
  }
})();
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
