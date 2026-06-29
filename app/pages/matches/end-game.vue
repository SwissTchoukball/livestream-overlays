<template>
  <OverlayViewer :match="match">
    <OverlayBackground :match="match" force-fullscreen-background class="end-game">
      <CornerVisual v-if="match?.competitionHasCornerVisual" :match="match" always-visible />
      <CompetitionLogo v-if="match?.competitionHasLogo" :match="match" class="end-game__competition-logo" />
      <GameOverMessage always-visible class="end-game__game-over-message" />
      <TeamsWithLogo v-if="match" :match="match" with-score-box class="end-game__teams" always-visible />
      <FinishedPeriods :match="match" always-visible class="end-game__periods" />
      <ErrorOverlay v-if="matchLoadingError" :message="matchLoadingError.message" />
    </OverlayBackground>
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

.end-game__game-over-message {
  margin-top: 20cqh;
}

.end-game__teams {
  margin-top: 20cqh;
  width: 100%;
}

.end-game__periods {
  margin-top: 2cqh;
}

.end-game__competition-logo {
  position: absolute;
  top: 3cqh;
  left: 3cqw;
  height: 28%;
}
</style>
