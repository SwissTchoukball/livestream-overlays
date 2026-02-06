<template>
  <OverlayViewer>
    <TransparentOverlay>
      <CornerLogo small />
      <div class="next-set-box">Prochain set :</div>

      <div class="teams">
        <div class="team team--home">
          <div class="team-name">{{ match?.homeTeam?.name || '' }}</div>
        </div>

        <ScoreBox hide-label />

        <div class="team team--away">
          <div class="team-name">{{ match?.awayTeam?.name || '' }}</div>
        </div>
      </div>
    </TransparentOverlay>
  </OverlayViewer>
</template>

<script lang="ts" setup>
const route = useRoute();
const { getMatchById } = useMatches();

const match = computed(() => getMatchById(route.params.matchId as string));
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

.teams {
  position: absolute;
  top: 71.5cqh;
  width: 100%;
  min-height: 18.5cqh;
  background-color: rgba(255, 255, 255, 0.7);
  padding-block: 2.3cqh;

  display: flex;
  align-items: center;
  justify-content: center;
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
    align-items: flex-end;
    padding-left: 1.5cqw;
  }

  &.team--away {
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
</style>
