<template>
  <OverlayViewer ref="overlayViewer" :match="match">
    <OverlayBackground :match="match">
      <ScoreBoard :match="match" />
      <CornerVisual v-if="match?.competitionHasCornerVisual" :match="match" />
      <CompetitionLogo v-if="match?.competitionHasLogo" :match="match" class="dynamic__competition-logo" />
      <UpcomingMessage :match="match" />
      <GameOverMessage class="dynamic__game-over-message" />

      <ScoreBanner :match="match" />

      <CompetitionLogo v-if="match?.competitionHasLogo" :match="match" small class="dynamic__competition-logo" />
      <CompetitionLogo
        v-if="match?.competitionHasLogo"
        :match="match"
        monochrome
        small
        class="dynamic__competition-logo"
      />
      <TeamsWithLogo v-if="match" :match="match" :with-score-box="showTeamsWithScoreBox" class="pre-game__teams" />
      <FinishedPeriods :match="match" class="end-game__periods" />
      <ErrorOverlay v-if="matchLoadingError" :message="matchLoadingError.message" />
    </OverlayBackground>
  </OverlayViewer>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';
import type { DataSource } from '~/types/dataSource';
import type OverlayViewer from '~/components/OverlayViewer.vue';

const route = useRoute();
const { getMatch, matchLoadingError } = useMatch(route.query.id as string, route.query.source as DataSource);

const match = ref<Match>();
const overlayViewer = ref<InstanceType<typeof OverlayViewer>>();

match.value = await getMatch();

onMounted(async () => {
  if (route.query.source !== 'json') {
    setInterval(async () => {
      match.value = await getMatch();
    }, 3000);
  }
});

const showTeamsWithScoreBox = computed(() => {
  return overlayViewer.value?.sceneSlug === 'end-game';
});
</script>

<style scoped>
.dynamic__competition-logo {
  position: absolute;
  top: 3cqh;
  left: 3cqw;
  height: 28%;

  &.competition-logo--small {
    height: 10%;
    top: 3cqh;
    left: 3cqw;

    &.competition-logo--monochrome {
      top: unset;
      left: unset;
      bottom: 3%;
      right: 3%;
    }
  }
}

.pre-game__teams {
  position: absolute;
  top: 50%;
  width: 100%;
}

.end-game__periods {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 7cqh;
}

.dynamic__game-over-message {
  position: absolute;
  top: 26cqh;
}
</style>
