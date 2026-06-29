<template>
  <div class="corner-decoration">
    <img
      :src="cornerDecorationSrc"
      :onerror="`this.src='${cornerDecorationSrcFallback}'`"
      :data-src="cornerDecorationSrc"
    />
  </div>
  <div class="play-time__scoreboard" :class="{ 'play-time__scoreboard--sets': match?.mode === 'sets' }">
    <div class="box box--teams">
      <div class="team">
        <div class="team-color" :style="`background-color: ${homeTeamColor}`"></div>
        <div class="team-name">{{ match?.homeTeam?.name || '' }}</div>
      </div>
      <div class="team">
        <div class="team-color" :style="`background-color: ${awayTeamColor}`"></div>
        <div class="team-name">{{ match?.awayTeam?.name || '' }}</div>
      </div>
    </div>

    <template v-if="match?.mode === 'sets'">
      <div class="set-label">Sets</div>
      <div class="box box--sets">
        <div class="set-score">{{ setsScoreHome }}</div>
        <div class="set-score">{{ setsScoreAway }}</div>
      </div>
    </template>

    <div v-if="match?.mode === 'sets'" class="point-label">Points</div>
    <div class="box box--points">
      <div class="point-score">{{ pointsScoreHome }}</div>
      <div class="point-score">{{ pointsScoreAway }}</div>
    </div>

    <div v-if="match?.mode === 'time'" class="play-time__time">
      <div class="box box--time"></div>
      <div class="box box--current-period">{{ match?.currentPeriodDisplay }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';
import type Match from '~/models/match.model';

const route = useRoute();

const { match = undefined } = defineProps<{ match?: Match }>();

const setsScoreHome = computed(() => (route.query.source === 'json' ? ' ' : (match?.resultHome ?? '0')));
const setsScoreAway = computed(() => (route.query.source === 'json' ? ' ' : (match?.resultAway ?? '0')));
const pointsScoreHome = computed(() =>
  route.query.source === 'json'
    ? ' '
    : match?.mode === 'time'
      ? (match?.resultHome ?? '0')
      : (match?.ongoingOrLastPeriod?.scoreHome ?? '0'),
);
const pointsScoreAway = computed(() =>
  route.query.source === 'json'
    ? ' '
    : match?.mode === 'time'
      ? (match?.resultAway ?? '0')
      : (match?.ongoingOrLastPeriod?.scoreAway ?? '0'),
);
const homeTeamColor = computed(() => validateColor(route.query.color_home) ?? match?.homeTeam?.color ?? '#fff');
const awayTeamColor = computed(() => validateColor(route.query.color_away) ?? match?.awayTeam?.color ?? '#fff');

function validateColor(colorQuery: string | (string | null)[] | undefined | null): string | undefined {
  const color = Array.isArray(colorQuery) ? colorQuery[0] : colorQuery;
  if (color?.match(/^[0-9A-Fa-f]{6}$/)) {
    return `#${color}`;
  }
  if (color?.match(/^[a-zA-Z]+$/)) {
    return color;
  }
  return undefined;
}

const cornerDecorationSrc = computed(() =>
  withBase(
    `/images/${match?.assetsFolder ?? 'default'}/score-background-decoration.png`,
    useRuntimeConfig().app.baseURL,
  ),
);
const cornerDecorationSrcFallback = computed(() =>
  withBase('/images/default/score-background-decoration.png', useRuntimeConfig().app.baseURL),
);
</script>

<style scoped>
.corner-decoration {
  position: absolute;
  top: 0;
  left: 0;
  height: 20%;
  transform: translate(-15cqw, calc(-15cqw * tan(37.5deg)));

  transition: transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0.4s;
  .scene-play-time & {
    transform: translate(0, 0);
    transition: transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0.5s;
  }

  img,
  object {
    height: 100%;
  }
}

.play-time__scoreboard {
  position: absolute;
  top: 3%;
  left: 3%;

  display: grid;
  grid-template-areas:
    'empty point-label'
    'teams points';
  gap: 0.2cqh 0.3cqw;

  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.16));

  &.play-time__scoreboard--sets {
    grid-template-areas:
      'empty set-label point-label'
      'teams sets      points';
  }
}

.play-time__time {
  position: absolute;
  top: 100%;
  left: 1cqw;

  display: flex;
  gap: 0.2cqw;
}

.set-label,
.point-label {
  font-size: 1cqh;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

.set-label {
  grid-area: set-label;
}

.point-label {
  grid-area: point-label;
}

.box {
  display: flex;
  flex-direction: column;
  gap: 0.2cqh;
  border-radius: 0.2cqw;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
  font-size: 1.85cqh;

  & > * {
    height: 4.5cqh;
  }

  & > *:first-child {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      display: block;
      left: 0;
      width: 100%;
      border-bottom: 0.2cqh solid #ccc;
    }
  }
}

.box--teams {
  grid-area: teams;
  min-width: 10cqw;
  background-color: white;
  color: black;
  z-index: 2;

  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  transition: clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0.3s;
  .scene-play-time & {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transition: clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0.8s;
  }
}

.team {
  display: flex;
  align-items: center;
  gap: 0.5cqw;
}

.team-color {
  /* text-shadow: 0 0 0.1cqw black; */
  position: relative;
  width: 1cqw;
  height: 100%;
  border: 0.2cqh solid #fff;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    height: calc(100% + 0.2cqh);
    border-right: 0.2cqh solid #ccc;
  }

  .team:first-child & {
    border-top-left-radius: 0.2cqw;
    border-bottom: none;
    &::after {
      top: -0.2cqh;
    }
  }

  .team:last-child & {
    border-bottom-left-radius: 0.2cqw;
    border-top: none;
  }
}

.team-name {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  padding-right: 1cqw;
}

.box--sets,
.box--points {
  min-width: 2.6cqw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;

  opacity: 0;
  transform: translateX(-100%);
  transition:
    transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0s,
    opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
  .scene-play-time & {
    opacity: 1;
    transform: translateX(0);
    transition:
      transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0.6s,
      opacity 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1.1s;
  }
}

.box--sets {
  grid-area: sets;
  background-image: var(--gradient-set-box);
  color: var(--foreground-color-set-box);
}

.box--points {
  grid-area: points;
  background-color: white;
  color: black;
}

.set-score,
.point-score {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 1.2em;
}

.set-score {
  font-size: 1.5em;
}

.box--time {
  width: 5cqw;
  height: 2.5cqw;
  background-color: var(--background-color-time-box);
  align-self: center;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  transition: clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
  .scene-play-time & {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transition: clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1.1s;
  }
}

.box--current-period {
  height: 2.5cqw;
  background-color: var(--background-color-time-box);
  align-self: center;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding-inline: 0.5cqw;

  text-align: center;
  place-content: center;
  font-size: 2cqh;
  font-weight: 500;
  color: var(--foreground-color-time-box);

  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  transition: clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
  .scene-play-time & {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transition: clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1) 1.3s;
  }
}
</style>
