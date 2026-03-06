<template>
  <OverlayViewer :competition="match?.competition">
    <TransparentOverlay>
      <div class="corner-decoration">
        <img :src="cornerDecorationSrc" :onerror="`this.src='${cornerDecorationSrcFallback}'`" />
      </div>

      <div class="play-time-score" :class="{ 'play-time-score--sets': match?.mode === 'sets' }">
        <div class="box box--teams">
          <div class="team">
            <div class="team-color" :style="`color: ${match?.homeTeam?.color || 'white'}`">&#x25B6;</div>
            <div class="team-name">{{ match?.homeTeam?.name || '' }}</div>
          </div>
          <div class="team">
            <div class="team-color" :style="`color: ${match?.awayTeam?.color || 'white'}`">&#x25B6;</div>
            <div class="team-name">{{ match?.awayTeam?.name || '' }}</div>
          </div>
        </div>

        <template v-if="match?.mode === 'sets'">
          <div class="set-label">Sets</div>
          <div class="box box--sets">
            <div class="set-score">&nbsp;</div>
            <div class="set-score">&nbsp;</div>
          </div>
        </template>

        <div class="point-label">Points</div>
        <div class="box box--points">
          <div class="point-score">&nbsp;</div>
          <div class="point-score">&nbsp;</div>
        </div>

        <div v-if="match?.mode === 'time'" class="box box--time"></div>
      </div>
    </TransparentOverlay>
  </OverlayViewer>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';

const route = useRoute();
const { getMatchById } = useMatches();

const match = computed(() => getMatchById(route.params.matchId as string));

const cornerDecorationSrc = computed(() =>
  withBase(`/images/${match.value?.competition}/corner-visual.png`, useRuntimeConfig().app.baseURL)
);
const cornerDecorationSrcFallback = computed(() =>
  withBase('/images/corner-visual.png', useRuntimeConfig().app.baseURL)
);
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
  width: 19.3cqw;
  background-color: white;
}

.box--sets {
  grid-area: sets;
  width: 2.6cqw;
  background-image: var(--gradient-set-box);
}

.box--points {
  grid-area: points;
  width: 2.6cqw;
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

.box--time {
  grid-area: time;
  width: 5cqw;
  height: 2.5cqw;
  background-color: grey;
  align-self: center;
}
</style>
