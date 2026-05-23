import type {
  ClupikApiFaceoff,
  ClupikApiGroup,
  ClupikApiLicense,
  ClupikApiMatchReferee,
  ClupikApiTournament,
  ClupikApiFacility,
  ClupikApiProfile,
  ClupikApiMatch,
  ClupikApiResponse,
  ClupikApiPeriod,
  ClupikApiResult,
  ClupikApiTeam,
  ClupikApiRound,
  ClupikMatch,
} from '~/types/clupik';

export function useClupikMatch() {
  const { $clupikApi, $dataFormatter } = useNuxtApp();

  async function fetchClupikMatch(matchId: string) {
    const matchResponse = await $clupikApi<
      ClupikApiResponse<
        ClupikApiMatch[],
        | ClupikApiFaceoff
        | ClupikApiRound
        | ClupikApiGroup
        | ClupikApiTournament
        | ClupikApiTeam
        | ClupikApiResult
        | ClupikApiPeriod
        | ClupikApiMatchReferee
        | ClupikApiLicense
        | ClupikApiProfile
        | ClupikApiFacility
      >
    >(
      `/matches?filter=id:${matchId}` +
        `&include=round,round.group,round.group.tournament,round.group.tournament.scoringcriterion,faceoff,teams,results,periods,matchreferees.license.profile,periods.results,results,facility`
    );
    return {
      ...matchResponse,
      data: matchResponse.data[0]!,
    };
  }

  const getClupikMatch = async (matchId: string): Promise<ClupikMatch> => {
    const clupikMatch = await fetchClupikMatch(matchId);
    return $dataFormatter.deserialize(clupikMatch) as ClupikMatch;
  };

  return {
    getClupikMatch,
  };
}
