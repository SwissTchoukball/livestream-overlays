<template>
  <OverlayViewer :match="match">
    <TransparentOverlay>
      <!-- <LogoScroller class="logo-scroller" /> -->
      <CornerLogo size="small" :match="match" />
      <div class="next-set-box">Prochain set :</div>

      <div class="teams">
        <div class="team team--home">
          <div class="team-name">{{ match?.homeTeam?.name || '' }}</div>
        </div>

        <ScoreBox hide-label :match="match" class="teams__score-box" />

        <div class="team team--away">
          <div class="team-name">{{ match?.awayTeam?.name || '' }}</div>
        </div>

        <FinishedPeriods :match="match" class="teams__periods" />
      </div>
      <ErrorOverlay v-if="matchLoadingError" :message="matchLoadingError.message" />
    </TransparentOverlay>
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
.next-set-box {
  position: absolute;
  top: 4%;
  right: 4%;
  text-transform: uppercase;
  text-align: right;
  line-height: 1;
  font-size: 6cqh;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1cqw;
  padding-bottom: 10.2cqh;
  border-radius: 1cqh;
}

.logo-scroller {
  position: absolute;
  top: 30cqh;
  left: 0;
  width: 100%;
}

.teams {
  position: absolute;
  top: 65cqh;
  width: 100%;
  min-height: 18.5cqh;
  background-color: rgba(255, 255, 255, 0.7);
  padding-block: 2.3cqh;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas:
    'team-home score-box team-away'
    'periods periods periods';
  align-items: center;
  gap: 3.6cqw;
}

.team {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5cqw;

  &.team--home {
    grid-area: team-home;
    align-items: flex-end;
    padding-left: 1.5cqw;
  }

  &.team--away {
    grid-area: team-away;
    align-items: flex-start;
    padding-right: 1.5cqw;
  }
}

.team-name {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 5.5cqh;

  .team--home & {
    text-align: right;
  }
}

.teams__score-box {
  grid-area: score-box;
}

.teams__periods {
  grid-area: periods;
}
</style>
