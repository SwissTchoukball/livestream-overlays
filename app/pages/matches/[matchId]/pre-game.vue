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
  letter-spacing: -0.05em;
  animation: upcoming-float 3s ease-in-out infinite;
  will-change: transform;
}

.upcoming-message-text {
  font-size: 5.5cqh;
}

.upcoming-message-match-name {
  font-weight: 700;
  font-size: 8.5cqh;
}

@keyframes upcoming-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1.2cqh);
  }
}
</style>
