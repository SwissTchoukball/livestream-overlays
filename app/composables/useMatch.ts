import Match from '~/models/match.model';
import type { DataSource } from '~/types/dataSource';

export function useMatch(id: string, source: DataSource) {
  const { getClupikMatch } = useClupikMatch();
  const { jsonMatches } = useJsonMatches();

  const matchLoadingError = ref<Error>();

  async function getMatch(): Promise<Match | undefined> {
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
      matchLoadingError.value = new Error(`Match “${id}” not found in source “${source}”`);
      return;
    }

    return match;
  }

  return {
    getMatch,
    matchLoadingError,
  };
}
