<template>
  <OverlayViewer :match="match">
    <OverlayBackground :match="match" force-fullscreen-background>
      <CornerVisual v-if="match?.competitionHasCornerVisual" :match="match" always-visible />
      <CompetitionLogo
        v-if="match?.competitionHasLogo"
        :match="match"
        always-visible
        class="pre-game__competition-logo"
      />
      <UpcomingMessage :match="match" always-visible />

      <TeamsWithLogo v-if="match" :match="match" always-visible class="pre-game__teams" />
      <ErrorOverlay v-if="error" :message="error.message" />
    </OverlayBackground>
  </OverlayViewer>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';
import type { DataSource } from '~/types/dataSource';

const route = useRoute();
const { getMatch } = useMatch(route.query.id as string, route.query.source as DataSource);

const match = ref<Match>();
const error = ref<Error>();

(async () => {
  try {
    match.value = await getMatch();
  } catch (e: unknown) {
    error.value = e as Error;
  }
})();
</script>

<style scoped>
.pre-game__teams {
  position: absolute;
  top: 50%;
  width: 100%;
}

.pre-game__competition-logo {
  position: absolute;
  top: 3cqh;
  left: 3cqw;
  height: 28%;
}
</style>
