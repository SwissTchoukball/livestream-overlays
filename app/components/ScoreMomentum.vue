<template>
  <div class="score-momentum">
    <div class="score-momentum__box">
      <div class="score-momentum__team score-momentum__team--home">{{ match?.homeTeam?.name || '' }}</div>
      <div class="score-momentum__chart">
        <canvas ref="canvas"></canvas>
      </div>
      <div class="score-momentum__team score-momentum__team--away">{{ match?.awayTeam?.name || '' }}</div>
    </div>
    <div class="score-momentum__credit">
      {{ $t('poweredBy') }}
      <TchoukNetLogo class="score-momentum__credit-logo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Chart, Filler, LineController, LineElement, LinearScale, PointElement } from 'chart.js';
import type { ChartConfiguration, Plugin } from 'chart.js';
import type Match from '~/models/match.model';

const route = useRoute();

const { match = undefined } = defineProps<{ match?: Match | undefined }>();

Chart.register(LineController, LineElement, PointElement, LinearScale, Filler);

const homeTeamColor = computed(() => validateColor(route.query.color_home) ?? match?.homeTeam?.color ?? '#cf2f28');
const awayTeamColor = computed(() => validateColor(route.query.color_away) ?? match?.awayTeam?.color ?? '#00567c');

const canvas = ref<HTMLCanvasElement>();
let chart: Chart<'line', { x: number; y: number }[]> | undefined;

const momentum = computed(() => match?.momentum ?? []);

const points = computed(() => momentum.value.map((value, index) => ({ x: index, y: value })));

/**
 * The match is refetched (and rebuilt) every few seconds, which gives us a new momentum array every time,
 * even when its values did not change. We watch this key instead so that the chart is only redrawn
 * when the values actually changed, and doesn't replay its animation on every refresh.
 */
const momentumKey = computed(() => momentum.value.join(','));

/**
 * Momentum values are floats which can be positive (home team) or negative (away team).
 * We keep the vertical scale symmetric so that the zero line always stays centered.
 */
const bound = computed(() => {
  const max = Math.max(...momentum.value.map((value) => Math.abs(value)), 0);
  return max > 0 ? max * 1.1 : 1;
});

/**
 * Turns any CSS color (named or hexadecimal) into its `rgba()` equivalent with the given alpha,
 * as the canvas needs an explicit color to fill the areas of the chart.
 */
function withAlpha(color: string, alpha: number): string {
  const context = document.createElement('canvas').getContext('2d');
  if (!context) {
    return color;
  }
  // Assigning to `fillStyle` normalises the color to its `#rrggbb` form
  context.fillStyle = color;
  const normalisedColor = context.fillStyle;
  if (!normalisedColor.startsWith('#')) {
    return color;
  }
  const red = parseInt(normalisedColor.slice(1, 3), 16);
  const green = parseInt(normalisedColor.slice(3, 5), 16);
  const blue = parseInt(normalisedColor.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

type MomentumDataset = ChartConfiguration<'line', { x: number; y: number }[]>['data']['datasets'][number];

function buildDataset(): MomentumDataset {
  return {
    data: points.value,
    borderWidth: 4,
    tension: 0.35,
    pointRadius: 0,
    borderColor: homeTeamColor.value,
    segment: {
      borderColor: (ctx) =>
        ((ctx.p0.parsed.y ?? 0) + (ctx.p1.parsed.y ?? 0)) / 2 >= 0 ? homeTeamColor.value : awayTeamColor.value,
    },
    fill: {
      target: { value: 0 },
      above: withAlpha(homeTeamColor.value, 0.55),
      below: withAlpha(awayTeamColor.value, 0.55),
    },
  };
}

/**
 * Draws the baseline separating the home team side from the away team side.
 */
const zeroLinePlugin: Plugin<'line'> = {
  id: 'zeroLine',
  beforeDatasetsDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    const y = scales.y!.getPixelForValue(0);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.lineWidth = 2;
    ctx.strokeStyle =
      getComputedStyle(chart.canvas).getPropertyValue('--foreground-color-overlay').trim() || '#000';
    ctx.stroke();
    ctx.restore();
  },
};

function buildConfig(): ChartConfiguration<'line', { x: number; y: number }[]> {
  return {
    type: 'line',
    data: {
      datasets: [buildDataset()],
    },
    plugins: [zeroLinePlugin],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400 },
      scales: {
        x: { type: 'linear', display: false, min: 0, max: Math.max(points.value.length - 1, 1) },
        y: { type: 'linear', display: false, min: -bound.value, max: bound.value },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
  };
}

onMounted(() => {
  if (!canvas.value) {
    return;
  }
  chart = new Chart(canvas.value, buildConfig());
});

watch([momentumKey, homeTeamColor, awayTeamColor], () => {
  if (!chart) {
    return;
  }
  chart.data.datasets[0] = buildDataset();
  chart.options.scales!.x!.max = Math.max(points.value.length - 1, 1);
  chart.options.scales!.y!.min = -bound.value;
  chart.options.scales!.y!.max = bound.value;
  chart.update();
});

onBeforeUnmount(() => {
  chart?.destroy();
  chart = undefined;
});
</script>

<style scoped>
.score-momentum {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70cqw;
  height: 40cqh;

  /* The chart is kept in the layout (rather than `display: none`) so that it can be transitioned in */
  visibility: hidden;
  transition: visibility 0s linear 0.3s;

  .scene-momentum & {
    visibility: visible;
    transition: visibility 0s linear 0s;
  }
}

.score-momentum__box {
  height: 100%;
  box-sizing: border-box;
  /* Extra padding at the bottom to leave room for the credit overlapping the box */
  padding: 2.5cqh 2cqw 5cqh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 2cqh;
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(0);
  transition:
    background-color 0.3s ease,
    backdrop-filter 0.3s ease;

  .scene-momentum & {
    background-color: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(1.5cqh);
    transition:
      background-color 2s ease 1s,
      backdrop-filter 2s ease 1s;
  }
}

/*
 * The contents fade in on their own rather than through the whole component, as an ancestor with an
 * opacity below 1 would neutralise the `backdrop-filter` of the box while the transition runs.
 */
.score-momentum__team,
.score-momentum__chart,
.score-momentum__credit {
  opacity: 0;
  transition: opacity 0.3s ease;

  .scene-momentum & {
    opacity: 1;
    transition: opacity 2s ease 1s;
  }
}

.score-momentum__chart {
  flex: 1 0 0;
  min-height: 0;
}

.score-momentum__credit {
  /* Straddles the bottom edge of the box */
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);

  padding: 1.2cqh 2.5cqh;

  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.16));

  display: flex;
  align-items: center;
  gap: 1cqw;

  background-image: linear-gradient(-45deg, rgb(9, 9, 75), rgb(49, 49, 120));
  color: #fff;
  /* Large enough to always give fully rounded ends, whatever the height of the content */
  border-radius: 999px;

  font-size: 2cqh;
  font-weight: 700;
  text-transform: uppercase;
}

.score-momentum__credit-logo {
  height: 4.5cqh;
}

.score-momentum__team {
  font-size: 3cqh;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2;

  &.score-momentum__team--home {
    color: v-bind(homeTeamColor);
  }

  &.score-momentum__team--away {
    color: v-bind(awayTeamColor);
  }
}
</style>