<template>
  <OverlayViewer :competition="match?.competition">
    <FullScreenOverlay :competition="match?.competition">
      <div class="game-over-message">Match terminé !</div>

      <TeamsWithLogo v-if="match" :home-team="match.homeTeam" :away-team="match.awayTeam" with-score-box />
    </FullScreenOverlay>
  </OverlayViewer>
</template>

<script lang="ts" setup>
const route = useRoute();
const { getMatchById } = useMatches();

const match = computed(() => getMatchById(route.params.matchId as string));
</script>

<style scoped>
.game-over-message {
  position: absolute;
  top: 25%;
  right: 6%;
  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  font-size: 5.5cqh;
  font-weight: 700;
}
</style>
