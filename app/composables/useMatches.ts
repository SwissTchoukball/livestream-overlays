import matchesData from '@/assets/data/matches.json';

export function useMatches() {
  const matches = ref<Match[]>(matchesData);

  const getMatchById = (id: string) => {
    return matches.value.find((match) => match.id === id);
  };

  return {
    matches,
    getMatchById,
  };
}
