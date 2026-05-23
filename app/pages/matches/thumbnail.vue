<template>
  <OverlayViewer :match="match">
    <FullScreenOverlay corner-logo-size="large" class="thumbnail" :match="match">
      <div class="match-name" :data-competition="match?.competition">
        <div class="match-name-mask"></div>
        {{ match?.name }}
      </div>

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
  top: 14%;
  right: 3%;
  width: 60cqw;
  height: 3lh;

  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  font-weight: 700;
  font-size: 14cqh;
  letter-spacing: -0.02em;
  hyphens: auto;

  /* Not really happy of that hack. TODO: Figure out a more sustainable solution. */
  &[data-competition='promotions-relegations'] {
    font-size: 10cqh;
  }
}

.match-name-mask {
  float: left;
  height: 100%;
  width: 28cqw;

  /* Shape that fits the border of the corner visual */
  clip-path: polygon(0 0, 100% 0, 3% 100%, 0 100%);
  shape-outside: polygon(0 0, 100% 0, 3% 100%, 0 100%);
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
