<template>
  <OverlayViewer>
    <TransparentOverlay>
      <div class="corner-decoration"><img :src="cornerDecorationSrc" /></div>

      <div class="play-time-score">
        <div class="box box--teams">
          <div class="team">
            <div class="team-color" :style="`color: ${match?.homeTeam.color}`">&#x25B6;</div>
            <div class="team-name">{{ match?.homeTeam.name }}</div>
          </div>
          <div class="team">
            <div class="team-color" :style="`color: ${match?.awayTeam.color}`">&#x25B6;</div>
            <div class="team-name">{{ match?.awayTeam.name }}</div>
          </div>
        </div>

        <div class="set-label">Sets</div>
        <div class="box box--sets">
          <div class="set-score">&nbsp;</div>
          <div class="set-score">&nbsp;</div>
        </div>

        <div class="point-label">Points</div>
        <div class="box box--points">
          <div class="point-score">&nbsp;</div>
          <div class="point-score">&nbsp;</div>
        </div>
      </div>
    </TransparentOverlay>
  </OverlayViewer>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';

const route = useRoute();
const { getMatchById } = useMatches();

const match = computed(() => getMatchById(route.params.matchId as string));

const cornerDecorationSrc = computed(() => withBase('/images/corner-visual.png', useRuntimeConfig().app.baseURL));
</script>

<style scoped>
.corner-decoration {
  position: absolute;
  top: 0;
  left: 0;
  height: 15%;

  img {
    height: 100%;
  }
}

.play-time-score {
  position: absolute;
  top: 1%;
  left: 3%;

  display: grid;
  grid-template-areas:
    'empty set-label point-label'
    'teams sets points';
  gap: 2px 6px;
}

.set-label,
.point-label {
  font-size: 10px;
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
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 20px;

  > * {
    padding: 12px 10px;
  }

  > *:first-child {
    border-bottom: 2px solid #ccc;
  }
}

.box--teams {
  grid-area: teams;
  width: 370px;
  background-color: white;
}

.box--sets {
  grid-area: sets;
  width: 50px;
  /* top-bottom gradient background */
  background: linear-gradient(to top right, #21324a, #336f4b);
}

.box--points {
  grid-area: points;
  width: 50px;
  background-color: white;
}

.team {
  display: flex;
  align-items: center;
  gap: 10px;
}

.team-color {
  text-shadow: 0 0 2px black;
}

.team-name {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05em;
}
</style>
