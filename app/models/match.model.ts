import type { DataSource } from '~/types/dataSource';
import Team from './team.model';
import type { JsonMatch } from '~/types/jsonData';
import type { ClupikMatch, ClupikTournament } from '~/types/clupik';
import type { TchoukNetCompetitionPhase, TchoukNetGame } from '~/types/tchoukDotNet';

export default class Match {
  id!: string;
  name!: string;
  competition: string | undefined;
  year: number | undefined;
  mode!: 'sets' | 'time';
  isCountryCompetition: boolean = false;
  startDate: Date | undefined;
  homeTeam!: Team | null;
  awayTeam!: Team | null;
  resultHome: number | null = null;
  resultAway: number | null = null;
  periods: {
    scoreHome: number | null;
    scoreAway: number | null;
    finished: boolean;
  }[] = [];
  source!: DataSource;

  competitionHasLogo: boolean = false;
  competitionHasCornerVisual: boolean = true;

  constructor(data: JsonMatch | ClupikMatch | TchoukNetGame, source: DataSource) {
    this.source = source;

    if (source === 'json') {
      const jsonMatch = data as JsonMatch;

      this.id = jsonMatch.id;
      this.name = jsonMatch.name;
      this.competition = jsonMatch.competition;
      this.mode = jsonMatch.mode;
      this.homeTeam = jsonMatch.homeTeam ? new Team(jsonMatch.homeTeam, source) : null;
      this.awayTeam = jsonMatch.awayTeam ? new Team(jsonMatch.awayTeam, source) : null;
    }

    if (source === 'clupik') {
      const clupikMatch = data as ClupikMatch;

      // console.log(clupikMatch);
      // console.log(clupikMatch.round.group.tournament);
      // console.log(clupikMatch.teams.map((team) => team.meta.avatar));

      this.id = clupikMatch.id;
      this.name = clupikMatch.faceoff?.round?.name || '';

      this.competition = this.getCompetitionFromClupikTournament(clupikMatch.round.group.tournament);
      this.mode = clupikMatch.round.group.tournament.scoringcriterion?.result_type === 'periods_wins' ? 'sets' : 'time';
      this.startDate = parseClupikDate(clupikMatch.datetime);
      this.year = this.startDate?.getFullYear();

      const rawHomeTeam = clupikMatch.teams.find((team) => team.id === clupikMatch.meta.home_team);
      this.homeTeam = rawHomeTeam ? new Team(rawHomeTeam, source) : null;
      const rawAwayTeam = clupikMatch.teams.find((team) => team.id === clupikMatch.meta.away_team);
      this.awayTeam = rawAwayTeam ? new Team(rawAwayTeam, source) : null;

      const resultHome = clupikMatch.results.find((result) => result.team?.id === rawHomeTeam?.id);
      this.resultHome = resultHome?.value ?? null;
      const resultAway = clupikMatch.results.find((result) => result.team?.id === rawAwayTeam?.id);
      this.resultAway = resultAway?.value ?? null;

      console.log(clupikMatch.periods);
      this.periods = clupikMatch.periods.map((period) => {
        const periodResultHome = period.results.find((result) => result.team?.id === rawHomeTeam?.id);
        const periodResultAway = period.results.find((result) => result.team?.id === rawAwayTeam?.id);
        return {
          scoreHome: periodResultHome?.value ?? null,
          scoreAway: periodResultAway?.value ?? null,
          finished: period.finished,
        };
      });
    }

    if (source === 'tchouk.net') {
      const tchoukDotNetMatch = data as TchoukNetGame;

      this.id = tchoukDotNetMatch.id;
      this.name = `${tchoukDotNetMatch.competition_phase?.competition?.name} ${tchoukDotNetMatch.name || tchoukDotNetMatch.competition_phase?.name}`;
      this.competition = this.getCompetitionFromTchoukDotNetCompetitionPhase(tchoukDotNetMatch.competition_phase);
      this.mode = 'time';
      this.startDate = tchoukDotNetMatch.start_at ? new Date(tchoukDotNetMatch.start_at) : undefined;
      this.year = this.startDate?.getFullYear();
      // If the match has no start date, try to extract the year from the event name
      if (!this.year && tchoukDotNetMatch.competition_phase?.competition?.event?.name) {
        const yearMatch = tchoukDotNetMatch.competition_phase?.competition?.event?.name.match(/(\d{4})/);
        if (yearMatch) {
          this.year = parseInt(yearMatch[1] || '');
        }
      }
      this.homeTeam = tchoukDotNetMatch.selection_a ? new Team(tchoukDotNetMatch.selection_a, source) : null;
      this.awayTeam = tchoukDotNetMatch.selection_b ? new Team(tchoukDotNetMatch.selection_b, source) : null;
      this.resultHome = tchoukDotNetMatch.selection_a?.total_points ?? null;
      this.resultAway = tchoukDotNetMatch.selection_b?.total_points ?? null;
      this.periods = this.getPeriodsFromTchoukDotNetGame(tchoukDotNetMatch);
    }

    if (this.competition === 'euro') {
      this.isCountryCompetition = true;
      this.competitionHasLogo = true;
      this.competitionHasCornerVisual = false;
    }
    if (this.competition === 'geneva-indoors') {
      this.isCountryCompetition = true;
    }
  }

  private getCompetitionFromClupikTournament(tournament: ClupikTournament): string | undefined {
    switch (tournament.scoringcriterion?.id) {
      case '36933': // 3×20
      case '47868': // 3×15
        if (tournament.gender === 'female') {
          return 'women-swiss-championship';
        }
        if (tournament.name.includes('Ligue A')) {
          return 'league-a';
        }
        if (tournament.name.includes('Ligue B')) {
          return 'league-b';
        }
        if (tournament.name.includes('Ligue C')) {
          return 'league-c';
        }
        if (tournament.name.includes('Promotions/relégations')) {
          return 'promotions-relegations';
        }
        return;
      case '39672':
        return 'swiss-cup';
      case '39683': // 2×15
      case '36934': // 2×12
      case '39684': // 2×20
      case '45815': // 3×15
      case '45816': // 3×12
        return 'junior-swiss-championship';
      case '42494': // 2×10
        return 'women-swiss-championship';
    }
  }

  private getCompetitionFromTchoukDotNetCompetitionPhase(
    competitionPhase?: TchoukNetCompetitionPhase,
  ): string | undefined {
    if (
      competitionPhase?.competition?.event?.name?.includes('Euro') ||
      competitionPhase?.competition?.event?.name?.includes('ETC')
    ) {
      return 'euro';
    }
    if (competitionPhase?.competition?.event?.name.includes('Geneva Indoors')) {
      return 'geneva-indoors';
    }
  }

  private getPeriodsFromTchoukDotNetGame(game: TchoukNetGame): Match['periods'] {
    const scores = [];

    const periodCounts = [
      Object.keys(game.selection_a?.period_points || {}).length || 0,
      Object.keys(game.selection_b?.period_points || {}).length || 0,
    ];
    const periodCount = Math.max(...periodCounts);

    let score_a, score_b;
    for (let i = 1; i <= periodCount; i++) {
      const period = i.toString() as '1' | '2' | '3';
      score_a = game?.selection_a?.period_points ? game.selection_a.period_points[period] || 0 : 0;
      score_b = game?.selection_b?.period_points ? game.selection_b.period_points[period] || 0 : 0;

      scores.push({
        scoreHome: score_a,
        scoreAway: score_b,
        finished: true,
      });
    }
    return scores;
  }

  get ongoingOrLastPeriod() {
    let period = this.periods.find((period) => !period.finished);
    if (!period) {
      period = this.periods[this.periods.length - 1];
    }
    return period;
  }

  get finishedPeriods(): {
    scoreHome: number | null;
    scoreAway: number | null;
  }[] {
    return this.periods.filter((period) => period.finished);
  }

  get currentPeriod(): number {
    const periodIndex = this.periods.findIndex((period) => !period.finished);
    if (periodIndex === -1) {
      if (this.periods.length) {
        return this.periods.length;
      }
      return 1;
    }
    return periodIndex + 1;
  }

  get currentPeriodDisplay(): string {
    switch (this.currentPeriod) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${this.currentPeriod}th`;
    }
  }

  get seasonStartYear(): number | undefined {
    return this.year ? this.year - (new Date().getMonth() < 9 ? 1 : 0) : undefined;
  }

  get seasonEndYear(): number | undefined {
    return this.seasonStartYear ? this.seasonStartYear + 1 : undefined;
  }

  get seasonShortDisplayName(): string | undefined {
    if (!this.seasonStartYear || !this.seasonEndYear) {
      return undefined;
    }
    return this.seasonStartYear
      ? `${this.seasonStartYear.toString().slice(-2)}-${this.seasonEndYear.toString().slice(-2)}`
      : undefined;
  }

  get editionSlug(): string | undefined {
    if (!this.competition) {
      return this.year?.toString();
    }
    if (!this.year) {
      return this.competition;
    }
    if (this.competition === 'swiss-cup' || this.competition === 'euro') {
      return `${this.competition}-${this.seasonEndYear}`;
    }
    return `${this.competition}-${this.seasonShortDisplayName}`;
  }

  get assetsFolder(): string {
    if (this.competition === 'swiss-cup' || this.competition === 'euro') {
      return this.editionSlug ?? 'default';
    }
    return 'default';
  }

  get competitionCornerDisplayName(): string | undefined {
    if (!this.competition) {
      return undefined;
    }
    switch (this.competition) {
      case 'women-swiss-championship':
        return `Championnat\nféminin\n${this.seasonShortDisplayName}`;
      case 'league-a':
        return `Championnat\nLigue A\n${this.seasonShortDisplayName}`;
      case 'league-b':
        return `Championnat\nLigue B\n${this.seasonShortDisplayName}`;
      case 'league-c':
        return `Championnat\nLigue C\n${this.seasonShortDisplayName}`;
      case 'promotions-relegations':
        return `Promotions/\nrelégations\n${this.seasonEndYear}`;
      case 'junior-swiss-championship':
        return `Championnat\njunior\n${this.seasonShortDisplayName}`;
      case 'swiss-cup':
        return `Coupe suisse\nTchoukball\n${this.seasonEndYear}`;
      case 'euro':
        // We don't display a text above the corner logo for Euros
        return;
    }
    console.warn('No corner display name defined for competition', this.competition);
    return;
  }
}
