<template>
  <OverlayViewer>
    <FullScreenOverlay>
      <div class="match-name">{{ match?.name }}</div>

      <TeamsWithLogo v-if="match" :home-team="match?.homeTeam" :away-team="match?.awayTeam" />
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
  top: 20%;
  right: 6%;
  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  font-weight: 700;
  font-size: 14cqh;
}
</style>
