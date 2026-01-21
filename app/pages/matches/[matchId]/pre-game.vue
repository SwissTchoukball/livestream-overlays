<template>
  <OverlayViewer>
    <FullScreenOverlay>
      <div class="upcoming-message">
        <div class="upcoming-message-text">Dans quelques instants :</div>
        <div class="upcoming-message-match-name">{{ match?.name }}</div>
      </div>

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
.upcoming-message {
  position: absolute;
  top: 25%;
  right: 6%;
  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  letter-spacing: -0.1em;
}

.upcoming-message-text {
  font-size: 60px;
}

.upcoming-message-match-name {
  font-weight: 700;
  font-size: 90px;
}
</style>
