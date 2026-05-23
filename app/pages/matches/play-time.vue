<template>
  <OverlayViewer :match="match">
    <TransparentOverlay>
      <div class="corner-decoration">
        <img :src="cornerDecorationSrc" :onerror="`this.src='${cornerDecorationSrcFallback}'`" />
      </div>

      <div class="play-time-score" :class="{ 'play-time-score--sets': match?.mode === 'sets' }">
        <div class="box box--teams">
          <div class="team">
            <div class="team-color" :style="`color: ${homeTeamColor}`">&#x25B6;</div>
            <div class="team-name">{{ match?.homeTeam?.name || '' }}</div>
          </div>
          <div class="team">
            <div class="team-color" :style="`color: ${awayTeamColor}`">&#x25B6;</div>
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

        <div class="point-label">Points</div>
        <div class="box box--points">
          <div class="point-score">{{ pointsScoreHome }}</div>
          <div class="point-score">{{ pointsScoreAway }}</div>
        </div>

        <div v-if="match?.mode === 'time'" class="box box--time"></div>
      </div>
      <ErrorOverlay v-if="matchLoadingError" :message="matchLoadingError.message" />
    </TransparentOverlay>
  </OverlayViewer>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';
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
    }, 3000);
  }
});

const setsScoreHome = computed(() => match.value?.resultHome ?? ' ');
const setsScoreAway = computed(() => match.value?.resultAway ?? ' ');
const pointsScoreHome = computed(() =>
  match.value?.mode === 'time'
    ? (match.value?.resultHome ?? ' ')
    : (match.value?.ongoingOrLastPeriod?.scoreHome ?? ' '),
);
const pointsScoreAway = computed(() =>
  match.value?.mode === 'time'
    ? (match.value?.resultAway ?? ' ')
    : (match.value?.ongoingOrLastPeriod?.scoreAway ?? ' '),
);
const homeTeamColor = computed(() => validateColor(route.query.color_home) ?? match.value?.homeTeam?.color ?? '#fff');
const awayTeamColor = computed(() => validateColor(route.query.color_away) ?? match.value?.awayTeam?.color ?? '#fff');

const cornerDecorationSrc = computed(() =>
  withBase(`/images/${match.value?.competition}/corner-visual.png`, useRuntimeConfig().app.baseURL),
);
const cornerDecorationSrcFallback = computed(() =>
  withBase('/images/default/corner-visual.png', useRuntimeConfig().app.baseURL),
);

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
</script>

<style scoped>
.corner-decoration {
  position: absolute;
  top: 0;
  left: 0;
  height: 15%;

  img,
  object {
    height: 100%;
  }
}

.play-time-score {
  position: absolute;
  top: 1%;
  left: 3%;

  display: grid;
  grid-template-areas:
    'empty point-label empty-2'
    'teams points      time';
  gap: 0.2cqh 0.3cqw;

  &.play-time-score--sets {
    grid-template-areas:
      'empty set-label point-label'
      'teams sets      points';
  }
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
  border-radius: 0.2cqw;
  box-shadow: 0 0 0.5cqw 0 rgba(0, 0, 0, 0.1);
  font-size: 1.85cqh;

  > * {
    padding: 1.1cqh 0.5cqw;
  }

  & > *:first-child {
    border-bottom: 0.2cqh solid #ccc;
  }
}

.box--teams {
  grid-area: teams;

  /* TODO: Set min-width to 0 so that it takes the less space possible */
  min-width: 19.3cqw;
  background-color: white;
}

.team {
  display: flex;
  align-items: center;
  gap: 0.5cqw;
}

.team-color {
  text-shadow: 0 0 0.1cqw black;
}

.team-name {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05em;
}

.box--sets,
.box--points {
  min-width: 2.6cqw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}

.box--sets {
  grid-area: sets;
  background-image: var(--gradient-set-box);
}

.box--points {
  grid-area: points;
  background-color: white;
}

.set-score,
.point-score {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.2em;

  font-weight: 700;
  font-size: 1.2em;
}

.set-score {
  color: var(--foreground-color-set-box);
  font-size: 1.5em;
}

.box--time {
  grid-area: time;
  width: 5cqw;
  height: 2.5cqw;
  background-color: grey;
  align-self: center;
}
</style>
