<template>
  <OverlayViewer :match="match">
    <OverlayBackground class="break">
      <!-- <LogoScroller class="logo-scroller" /> -->
      <CornerVisual v-if="match?.competitionHasCornerVisual" size="small" :match="match" />
      <CompetitionLogo v-if="match?.competitionHasLogo" :match="match" small class="break__competition-logo" />

      <ScoreBanner :match="match" />

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
.logo-scroller {
  position: absolute;
  top: 30cqh;
  left: 0;
  width: 100%;
}

.break__competition-logo {
  position: absolute;
  top: 3cqh;
  left: 3cqw;
  height: 10%;
}
</style>
