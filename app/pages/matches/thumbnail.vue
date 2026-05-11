<template>
  <OverlayViewer :match="match">
    <FullScreenOverlay corner-logo-size="large" class="thumbnail" :match="match">
      <div class="match-name">{{ match?.name }}</div>

      <TeamsWithLogo
        v-if="match && (match.homeTeam || match.awayTeam)"
        :match="match"
        logos-only
        class="thumbnail__teams"
      />
      <ErrorOverlay v-if="error" :message="error.message" />
    </FullScreenOverlay>
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
.match-name {
  position: absolute;
  top: 18%;
  right: 3%;
  width: 46cqw;
  height: 2lh;

  display: flex;
  align-items: end;
  justify-content: end;

  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  font-weight: 700;
  font-size: 14cqh;
  letter-spacing: -0.02em;
}
</style>

<style>
.thumbnail {
  .corner-logo {
    z-index: 2;
  }
}

.thumbnail__teams {
  position: absolute;
  top: 57%;
  right: 0;
  width: 70%;
}
</style>
