import type Match from '~/models/match.model';

export function useTeamColors(match?: Match) {
  const route = useRoute();

  const homeTeamColorQueryString = validateColor(route.query.color_home);
  const awayTeamColorQueryString = validateColor(route.query.color_away);
  const forceQueryStringColors = Object.keys(route.query).includes('force_colors');

  const homeTeamColor = ref<string>('#fff');
  const awayTeamColor = ref<string>('#fff');

  if (match && !forceQueryStringColors) {
    homeTeamColor.value = match.colorHome ?? '#fff';
    awayTeamColor.value = match.colorAway ?? '#fff';
  } else {
    homeTeamColor.value = homeTeamColorQueryString ?? '#fff';
    awayTeamColor.value = awayTeamColorQueryString ?? '#fff';
  }

  return {
    homeTeamColor,
    awayTeamColor,
  };
}
