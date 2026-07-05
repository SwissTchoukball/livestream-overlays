<template>
  <OverlayViewer :match="match">
    <OverlayBackground :match="match" :filename="backgroundFilename" force-fullscreen-background class="thumbnail">
      <CornerVisual v-if="match?.competitionHasCornerVisual" size="large" :match="match" />
      <CompetitionLogo
        v-if="match?.competitionHasLogo"
        :match="match"
        always-visible
        class="thumbnail__competition-logo"
      />
      <div class="match-name" :data-competition="match?.competition">
        <div class="match-name-mask"></div>
        <span v-html="match?.parsedName"></span>
      </div>

      <TeamsWithLogo
        v-if="match && (match.homeTeam || match.awayTeam)"
        :match="match"
        logos-only
        always-visible
        class="thumbnail__teams"
      />
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

const backgroundFilename = computed(() => {
  return match.value?.competition === 'euro' ? 'background-thumbnail.svg' : undefined;
});

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
  width: var(--width-match-name);
  height: 3lh;

  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  font-weight: 700;
  font-size: 14cqh;
  letter-spacing: -0.02em;
  hyphens: var(--hyphens-match-name);

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
  clip-path: var(--polygon-match-name-mask);
  shape-outside: var(--polygon-match-name-mask);
}
</style>

<style>
.thumbnail {
  .corner-visual {
    z-index: 2;
  }
}

.thumbnail__teams {
  position: absolute;
  top: 57%;
  right: 0;
  width: 70%;
}

.thumbnail__competition-logo {
  position: absolute;
  top: 3cqh;
  left: 3cqw;
  height: 28%;
}
</style>
