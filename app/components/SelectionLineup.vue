<template>
  <div class="selection-lineup" :style="{ '--selection-color': color, '--selection-text-color': textColor }">
    <div class="selection-lineup__header">
      <TeamFlag v-if="match?.isCountryCompetition" :team="team" class="selection-lineup__flag" />
      <span class="selection-lineup__team-name">{{ team?.name || '' }}</span>
    </div>

    <ul class="selection-lineup__list">
      <li v-for="player in players" :key="player.id" class="selection-lineup__player">
        <span class="selection-lineup__number">{{ player.number ?? '' }}</span>
        <span class="selection-lineup__name">
          {{ player.firstName }}
          <span class="selection-lineup__last-name">{{ player.lastName }}</span>
        </span>
        <span v-if="player.isCaptain" class="selection-lineup__captain">C</span>
      </li>
    </ul>

    <ul v-if="staff.length" class="selection-lineup__list selection-lineup__list--staff">
      <li v-for="member in staff" :key="member.id" class="selection-lineup__staff-member">
        <span class="selection-lineup__role">{{ member.roles[0] || $t('staff') }}</span>
        <span class="selection-lineup__name">
          {{ member.firstName }}
          <span class="selection-lineup__last-name">{{ member.lastName }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import Color from 'color';
import type Match from '~/models/match.model';

const { match = undefined, side } = defineProps<{
  match?: Match | undefined;
  side: 'home' | 'away';
}>();

const { homeTeamColor, awayTeamColor } = useTeamColors(match);

const team = computed(() => (side === 'home' ? match?.homeTeam : match?.awayTeam));
const players = computed(() => (side === 'home' ? match?.playersHome : match?.playersAway) ?? []);
const staff = computed(() => (side === 'home' ? match?.staffHome : match?.staffAway) ?? []);

const color = computed(() => (side === 'home' ? homeTeamColor.value : awayTeamColor.value));

/**
 * The jersey color can be anything from white to black, so we pick the text color which keeps
 * the numbers readable on top of it.
 */
const textColor = computed(() => (Color(color.value).isLight() ? '#000' : '#fff'));
</script>

<style scoped>
.selection-lineup {
  display: flex;
  flex-direction: column;
  gap: 1.5cqh;
  min-width: 0;
}

.selection-lineup__header {
  display: flex;
  align-items: center;
  gap: 1.5cqh;

  padding-bottom: 1cqh;
  border-bottom: 0.4cqh solid var(--selection-color);
}

.selection-lineup__flag {
  height: 5cqh;
  flex: 0 0 auto;
}

.selection-lineup__team-name {
  font-size: 3.4cqh;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.1;
  color: #000;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selection-lineup__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6cqh;
}

.selection-lineup__list--staff {
  padding-top: 1cqh;
  border-top: 0.2cqh solid rgba(0, 0, 0, 0.15);
}

.selection-lineup__player,
.selection-lineup__staff-member {
  display: flex;
  align-items: center;
  gap: 1.2cqh;

  font-size: 2.6cqh;
  line-height: 1.2;
  color: #000;
}

.selection-lineup__number {
  flex: 0 0 auto;
  width: 4cqh;
  padding: 0.4cqh 0;

  border-radius: 0.6cqh;
  background-color: var(--selection-color);
  color: var(--selection-text-color);

  font-weight: 800;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.selection-lineup__role {
  flex: 0 0 auto;
  width: 22cqh;

  font-size: 2cqh;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.55);
}

.selection-lineup__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selection-lineup__last-name {
  font-weight: 800;
  text-transform: uppercase;
}

.selection-lineup__captain {
  flex: 0 0 auto;
  width: 2.8cqh;
  height: 2.8cqh;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0.2cqh solid rgba(0, 0, 0, 0.6);
  border-radius: 50%;

  font-size: 1.8cqh;
  font-weight: 800;
}
</style>
