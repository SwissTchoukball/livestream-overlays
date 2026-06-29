<template>
  <div
    class="teams"
    :class="{
      'teams--with-score-box': withScoreBox,
      'teams--logos-only': logosOnly,
      'teams--always-visible': alwaysVisible,
    }"
  >
    <div class="team team--home">
      <div class="team-logo">
        <img v-if="match?.homeTeam?.logoUrl" :src="match.homeTeam.logoUrl" />
        <TeamFlag v-else-if="match?.isCountryCompetition && match?.homeTeam" :team="match.homeTeam" floating />
        <UnknownTeamLogo v-else class="team-logo-placeholder" />
      </div>
      <div
        v-if="!logosOnly"
        class="team-name"
        :class="{ 'team-name--short': (match?.homeTeam?.name?.length || 0) < 10 }"
      >
        {{ match?.homeTeam?.name || '' }}
      </div>
    </div>

    <ScoreBox v-if="withScoreBox" :match="match" class="teams__score-box" />
    <div v-else class="separator">×</div>

    <div class="team team--away">
      <div class="team-logo">
        <img v-if="match?.awayTeam?.logoUrl" :src="match.awayTeam.logoUrl" />
        <TeamFlag v-else-if="match?.isCountryCompetition && match?.awayTeam" :team="match.awayTeam" floating />
        <UnknownTeamLogo v-else class="team-logo-placeholder" />
      </div>
      <div
        v-if="!logosOnly"
        class="team-name"
        :class="{ 'team-name--short': (match?.homeTeam?.name?.length || 0) < 10 }"
      >
        {{ match?.awayTeam?.name || '' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const {
  match = undefined,
  withScoreBox,
  alwaysVisible = false,
} = defineProps<{
  match?: Match;
  withScoreBox?: boolean;
  logosOnly?: boolean;
  alwaysVisible?: boolean;
}>();
</script>

<style scoped>
.teams {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 5.2cqw;

  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);

  &.teams--always-visible,
  .scene-pre-game &,
  .scene-end-game & {
    opacity: 1;
    transition: opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1s;
  }

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
  gap: 4cqh;

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
  min-width: 23cqh;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 5.5cqh;

  &.team-name--short {
    text-align: center; /* Useful when name shorter than logo */
  }

  .team--home &:not(.team-name--short) {
    text-align: right;
  }
}

.team-logo {
  height: 23cqh;

  .teams--logos-only & {
    height: 37cqh;
  }
}

.team-logo img,
.team-logo-placeholder {
  height: 100%;
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
