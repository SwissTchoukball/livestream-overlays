import Match from '~/models/match.model';
import type { DataSource } from '~/types/dataSource';

export function useMatch(id: string, source: DataSource) {
  const { getClupikMatch } = useClupikMatch();
  const { jsonMatches } = useJsonMatches();
  const { getTchoukDotNetMatch } = useTchoukDotNetMatch();

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

    if (source === 'tchouk.net') {
      const tchoukDotNetMatch = await getTchoukDotNetMatch(id);
      if (tchoukDotNetMatch) {
        match = new Match(tchoukDotNetMatch, 'tchouk.net');
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
