<template>
  <div class="teams" :class="{ 'teams--with-score-box': withScoreBox }">
    <div class="team team--home">
      <div class="team-logo"><img :src="homeTeam.logo" /></div>
      <div class="team-name">{{ homeTeam.name }}</div>
    </div>

    <ScoreBox v-if="withScoreBox" class="teams__score-box" />
    <div v-else class="separator">×</div>

    <div class="team team--away">
      <div class="team-logo"><img :src="awayTeam.logo" /></div>
      <div class="team-name">{{ awayTeam.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { homeTeam, awayTeam, withScoreBox } = defineProps<{ homeTeam: Team; awayTeam: Team; withScoreBox?: boolean }>();
</script>

<style scoped>
.teams {
  position: absolute;
  top: 50%;
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 100px;

  &.teams--with-score-box {
    gap: 70px;
  }
}

.team {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &.team--home {
    align-items: flex-end;
    padding-left: 30px;
  }

  &.team--away {
    align-items: flex-start;
    padding-right: 30px;
  }
}

.team-name {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 60px;

  .team--home & {
    text-align: right;
  }
}

.team-logo img {
  height: 250px;
}

.separator {
  align-self: center;
  font-size: 400px;
  font-weight: 100;
  line-height: 0;
}

.teams__score-box {
  margin-top: 70px;
}
</style>
