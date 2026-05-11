<template>
  <OverlayViewer :match="match">
    <FullScreenOverlay :match="match">
      <div class="upcoming-message">
        <div class="upcoming-message-text">Dans quelques instants :</div>
        <div class="upcoming-message-match-name">{{ match?.name }}</div>
      </div>

      <TeamsWithLogo v-if="match" :match="match" class="pre-game__teams" />
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
.pre-game__teams {
  position: absolute;
  top: 50%;
  width: 100%;
}

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
