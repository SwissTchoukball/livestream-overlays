import matchesData from '@/assets/data/matches.json';

export function useMatches() {
  const matches = ref<Match[]>(
    matchesData.map((match) => ({
      ...match,
      mode: ['sets', 'time'].includes(match.mode) ? (match.mode as 'sets' | 'time') : 'time',
    }))
  );

  const getMatchById = (id: string) => {
    return matches.value.find((match) => match.id === id);
  };

  return {
    matches,
    getMatchById,
  };
}
