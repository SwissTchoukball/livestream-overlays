import type { JsonMatch } from '~/types/jsonData';
import jsonMatchesData from '@/assets/data/matches.json';

export function useJsonMatches() {
  const jsonMatches = ref<JsonMatch[]>(
    jsonMatchesData.map((match) => ({
      ...match,
      mode: ['sets', 'time'].includes(match.mode) ? (match.mode as 'sets' | 'time') : 'time',
    })),
  );

  return {
    jsonMatches,
  };
}
