import type { TchoukNetGame } from '~/types/tchoukDotNet';

export function useTchoukDotNetMatch() {
  const { $tchoukDotNetApi } = useNuxtApp();

  async function getTchoukDotNetMatch(matchId: string) {
    const response = await $tchoukDotNetApi<{ game: TchoukNetGame }>(`/games/${matchId}/details`);
    return response.game;
  }

  return {
    getTchoukDotNetMatch,
  };
}
