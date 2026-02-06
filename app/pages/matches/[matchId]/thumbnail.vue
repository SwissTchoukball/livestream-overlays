<template>
  <OverlayViewer>
    <FullScreenOverlay corner-logo-size="large" class="thumbnail">
      <div class="match-name">{{ match?.name }}</div>

      <TeamsWithLogo v-if="match" :home-team="match?.homeTeam" :away-team="match?.awayTeam" logos-only />
    </FullScreenOverlay>
  </OverlayViewer>
</template>

<script lang="ts" setup>
const route = useRoute();
const { getMatchById } = useMatches();

const match = computed(() => getMatchById(route.params.matchId as string));
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

  .teams {
    top: 57%;
    right: 0;
    width: 70%;
  }
}
</style>
