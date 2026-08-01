import type {TchoukNetGame, TchoukNetGameAnalytics} from '~/types/tchoukDotNet';

export function useTchoukDotNetMatch() {
  const { $tchoukDotNetApi } = useNuxtApp();

  async function getTchoukDotNetMatch(matchId: string) {
    const response = await $tchoukDotNetApi<{ game: TchoukNetGame, analytics: TchoukNetGameAnalytics }>(`/games/${matchId}/details`);
    response.game.analytics = response.analytics ?? { momentum: [] };
    return response.game;
  }

  return {
    getTchoukDotNetMatch,
  };
}
