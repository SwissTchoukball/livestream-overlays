<template>
  <div class="teams" :class="{ 'teams--with-score-box': withScoreBox, 'teams--logos-only': logosOnly }">
    <div class="team team--home">
      <div class="team-logo">
        <img v-if="match?.homeTeam?.logoUrl" :src="match.homeTeam.logoUrl" />
        <UnknownTeamLogo v-else class="team-logo-placeholder" />
      </div>
      <div v-if="!logosOnly" class="team-name">{{ match?.homeTeam?.name || '' }}</div>
    </div>

    <ScoreBox v-if="withScoreBox" :match="match" class="teams__score-box" />
    <div v-else class="separator">×</div>

    <div class="team team--away">
      <div class="team-logo">
        <img v-if="match?.awayTeam?.logoUrl" :src="match.awayTeam.logoUrl" />
        <UnknownTeamLogo v-else class="team-logo-placeholder" />
      </div>
      <div v-if="!logosOnly" class="team-name">{{ match?.awayTeam?.name || '' }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const { match = undefined, withScoreBox } = defineProps<{
  match?: Match;
  withScoreBox?: boolean;
  logosOnly?: boolean;
}>();
</script>

<style scoped>
.teams {
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
