<template>
  <OverlayViewer :match="match">
    <OverlayBackground>
      <ScoreBoard :match="match" />

      <CompetitionLogo
        v-if="match?.competitionHasLogo"
        :match="match"
        monochrome
        small
        class="play-time__competition-logo"
      />
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
    }, 3000);
  }
});
</script>

<style scoped>
.play-time__competition-logo {
  position: absolute;
  bottom: 3%;
  right: 3%;
  height: 10%;
}
</style>
