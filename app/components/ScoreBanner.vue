<template>
  <div class="score-banner">
    <div class="match-name">{{ match?.name }}</div>
    <div class="teams-and-score" :class="{ 'teams-and-score--with-flags': match?.isCountryCompetition }">
      <TeamFlag v-if="match?.isCountryCompetition" :team="match?.homeTeam" class="team-flag team-flag--home" />
      <div class="team team--home">
        {{ match?.homeTeam?.name || '' }}
      </div>

      <ScoreBox :match="match" hide-label for-score-banner />

      <div class="team team--away">
        {{ match?.awayTeam?.name || '' }}
      </div>

      <TeamFlag v-if="match?.isCountryCompetition" :team="match?.awayTeam" class="team-flag team-flag--away" />
    </div>
    <FinishedPeriods :match="match" class="teams__periods" always-visible />
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

defineProps<{ match?: Match | undefined }>();
</script>

<style scoped>
.score-banner {
  position: absolute;
  top: 70cqh;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100% - 6cqh);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;

  filter: drop-shadow(0px 7px 29px rgba(100, 100, 111, 0.2));
}

.match-name {
  position: absolute;
  top: 0;
  text-align: center;
  font-weight: bold;
  font-size: 3cqh;
  text-transform: uppercase;
  white-space: nowrap;
  background-color: black;
  color: white;
  padding-inline: 2.3cqh;
  z-index: -1;
  opacity: 0;
  transition:
    top 0.3s ease,
    opacity 0.3s ease;

  .scene-break & {
    top: -1lh;
    opacity: 1;
    transition:
      top 0.3s ease 1.5s,
      opacity 0.3s ease 1.5s;
  }
}

.teams-and-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding-inline: 2.3cqh;
  background-color: var(--background-score-banner);
  color: var(--foreground-score-banner);
  border-radius: 6cqh;

  display: grid;
  grid-template-columns: 1fr auto 1fr;

  clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
  transition: clip-path 0.5s ease-in-out 0.3s;
  .scene-break & {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transition: clip-path 0.5s ease-in-out 0.8s;
  }

  &.teams-and-score--with-flags {
    grid-template-columns: auto 1fr auto 1fr auto;
    padding-inline: 0;
  }
}

.team-flag {
  height: 12cqh;

  &.team-flag--home {
    margin-right: 3cqh;
  }
  &.team-flag--away {
    margin-left: 3cqh;
  }
  &:deep(img) {
    border: 0.5cqh solid var(--background-score-banner);
  }
}

.team {
  flex: 1 0 0;
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 35cqw;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 4cqh;

  &.team--home {
    align-items: flex-end;
    text-align: right;
  }

  &.team--away {
    align-items: flex-start;
  }
}

.teams__periods {
  background-color: black;
  color: #ccc;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  position: absolute;
  z-index: -1;
  top: calc(100% - 1lh);
  opacity: 0;
  transition:
    top 0.3s ease-in-out,
    opacity 0.3s ease-in-out;

  &:deep(.period) {
    padding-block: 0.5cqh;

    background-image: var(--gradient-score-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .scene-break & {
    top: 100%;
    opacity: 1;
    transition:
      top 0.3s ease-in-out 1.5s,
      opacity 0.3s ease-in-out 1.5s;
  }
}
</style>
