<template>
  <div class="teams" :class="{ 'teams--with-score-box': withScoreBox, 'teams--logos-only': logosOnly }">
    <div class="team team--home">
      <div class="team-logo"><img v-if="homeTeam" :src="homeTeam.logo" /></div>
      <div v-if="!logosOnly" class="team-name">{{ homeTeam?.name || '' }}</div>
    </div>

    <ScoreBox v-if="withScoreBox" class="teams__score-box" />
    <div v-else class="separator">×</div>

    <div class="team team--away">
      <div class="team-logo">
        <img v-if="awayTeam" :src="awayTeam.logo" />
        <UnknownTeamLogo v-else class="team-logo-placeholder" />
      </div>
      <div v-if="!logosOnly" class="team-name">{{ awayTeam?.name || '' }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { homeTeam, awayTeam, withScoreBox } = defineProps<{
  homeTeam: Team | null;
  awayTeam: Team | null;
  withScoreBox?: boolean;
  logosOnly?: boolean;
}>();
</script>

<style scoped>
.teams {
  position: absolute;
  top: 50%;
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 5.2cqw;

  &.teams--with-score-box {
    gap: 3.6cqw;
  }
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

.team-logo img,
.team-logo-placeholder {
  height: 23cqh;

  .teams--logos-only & {
    height: 37cqh;
  }
}

.separator {
  align-self: center;
  font-size: 37cqh;
  font-weight: 100;
  line-height: 0;
}

.teams__score-box {
  margin-top: 6.5cqh;
}
</style>
