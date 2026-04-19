import jsonMatchesData from '@/assets/data/matches.json';
import Match from '~/models/match.model';
import type { JsonMatch } from '~/types/jsonData';
import type { DataSource } from '~/types/dataSource';

export function useMatches() {
  const { getClupikMatch } = useClupikMatch();

  const jsonMatches = ref<JsonMatch[]>(
    jsonMatchesData.map((match) => ({
      ...match,
      mode: ['sets', 'time'].includes(match.mode) ? (match.mode as 'sets' | 'time') : 'time',
    }))
  );

  async function getMatch(id: string, source: DataSource): Promise<Match> {
    let match: Match | undefined;

    if (source === 'json') {
      const jsonMatch = jsonMatches.value.find((m) => m.id === id);
      if (jsonMatch) {
        match = new Match(jsonMatch, 'json');
      }
    }

    if (source === 'clupik') {
      const clupikMatch = await getClupikMatch(id);
      if (clupikMatch) {
        match = new Match(clupikMatch, 'clupik');
      }
    }

    if (!match) {
      throw new Error(`Match “${id}” not found in source “${source}”`);
    }

    return match;
  }

  return {
    jsonMatches,
    getMatch,
  };
}
