<template>
  <div class="game-lineups">
    <div class="game-lineups__box">
      <SelectionLineup :match="match" side="home" class="game-lineups__selection" />
      <SelectionLineup :match="match" side="away" class="game-lineups__selection" />

      <div v-if="officials.length" class="game-lineups__officials">
        <ul class="game-lineups__officials-list">
          <li v-for="official in officials" :key="official.id" class="game-lineups__official">
            <span class="game-lineups__official-name">
              {{ official.firstName }}
              <span class="game-lineups__official-last-name">{{ official.lastName }}</span>
            </span>
            <span class="game-lineups__official-role">{{ official.role }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Match from '~/models/match.model';

const { match = undefined } = defineProps<{ match?: Match | undefined }>();

const officials = computed(() => match?.officials ?? []);
</script>

<style scoped>
.game-lineups {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80cqw;

  /* The line-ups are kept in the layout (rather than `display: none`) so that they can be transitioned in */
  visibility: hidden;
  transition: visibility 0s linear 0.3s;

  .scene-lineups & {
    visibility: visible;
    transition: visibility 0s linear 0s;
  }
}

.game-lineups__box {
  /*
   * The box takes the height of its content (the component is centered on it), while never
   * growing past the screen if a selection ever holds an unusual number of people.
   */
  max-height: 94cqh;
  overflow: hidden;

  box-sizing: border-box;
  padding: 3cqh 3cqw;

  display: grid;
  grid-template-columns: 1fr 1fr;
  /* The officials sit on their own row, below both line-ups */
  grid-template-rows: auto auto;
  column-gap: 5cqw;
  row-gap: 2cqh;

  border-radius: 2cqh;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.3s ease;

  .scene-lineups & {
    background-color: rgba(255, 255, 255, 0.9);
    transition: background-color 1s ease 1s;
  }
}

.game-lineups__officials {
  grid-column: 1 / -1;

  padding-top: 1.5cqh;
  border-top: 0.2cqh solid rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 3cqw;

  color: #000;
}

.game-lineups__officials-list {
  list-style: none;
  padding: 0;

  display: flex;
  align-items: baseline;
  gap: 3cqw;
}

.game-lineups__official {
  display: flex;
  flex-direction: column;
  gap: 0.2cqh;

  font-size: 2.4cqh;
  line-height: 1.2;
}

.game-lineups__official-last-name {
  font-weight: 800;
  text-transform: uppercase;
}

.game-lineups__official-role {
  font-size: 1.8cqh;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.55);
}

/*
 * The contents fade in on their own rather than through the whole component, to stay consistent
 * with the way the momentum chart is revealed.
 */
.game-lineups__selection,
.game-lineups__officials {
  opacity: 0;
  transition: opacity 0.3s ease;

  .scene-lineups & {
    opacity: 1;
    transition: opacity 2s ease 1s;
  }
}
</style>
