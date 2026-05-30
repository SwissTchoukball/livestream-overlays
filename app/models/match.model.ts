import type { DataSource } from '~/types/dataSource';
import Team from './team.model';
import type { JsonMatch } from '~/types/jsonData';
import type { ClupikMatch, ClupikTournament } from '~/types/clupik';
import type { TchoukNetCompetitionPhase, TchoukNetGame } from '~/types/tchoukDotNet';

export default class Match {
  id!: string;
  name!: string;
  competition: string | undefined;
  mode!: 'sets' | 'time';
  competitionHasLogo: boolean = false;
  isCountryCompetition: boolean = false;
  assetsFolder: string = 'default';
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
      const rawHomeTeam = clupikMatch.teams.find((team) => team.id === clupikMatch.meta.home_team);
      this.homeTeam = rawHomeTeam ? new Team(rawHomeTeam, source) : null;
      const rawAwayTeam = clupikMatch.teams.find((team) => team.id === clupikMatch.meta.away_team);
      this.awayTeam = rawAwayTeam ? new Team(rawAwayTeam, source) : null;
      this.resultHome = clupikMatch.results[0]?.value ?? null;
      this.resultAway = clupikMatch.results[1]?.value ?? null;
      this.periods = clupikMatch.periods.map((period) => ({
        scoreHome: period.results[0]?.value ?? null,
        scoreAway: period.results[1]?.value ?? null,
        finished: period.finished,
      }));
    }

    if (source === 'tchouk.net') {
      const tchoukDotNetMatch = data as TchoukNetGame;

      this.id = tchoukDotNetMatch.id;
      this.name = tchoukDotNetMatch.name || '';
      this.competition = this.getCompetitionFromTchoukDotNetCompetitionPhase(tchoukDotNetMatch.competition_phase);
      this.mode = 'time';
      this.startDate = tchoukDotNetMatch.start_at ? new Date(tchoukDotNetMatch.start_at) : undefined;
      this.homeTeam = tchoukDotNetMatch.selection_a ? new Team(tchoukDotNetMatch.selection_a, source) : null;
      this.awayTeam = tchoukDotNetMatch.selection_b ? new Team(tchoukDotNetMatch.selection_b, source) : null;
      this.resultHome = tchoukDotNetMatch.selection_a?.total_points ?? null;
      this.resultAway = tchoukDotNetMatch.selection_b?.total_points ?? null;
      this.periods = this.getPeriodsFromTchoukDotNetGame(tchoukDotNetMatch);
    }

    this.competitionHasLogo = this.competition === 'euro-2026';
    if (this.competition === 'swiss-cup') {
      this.assetsFolder = this.editionSlug ?? 'default';
    }
    if (this.competition === 'euro-2026') {
      this.assetsFolder = 'euro-2026';
      this.isCountryCompetition = true;
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
    switch (competitionPhase?.competition?.event?.name) {
      case 'Euro 2026':
        return 'euro-2026';
    }
    if (competitionPhase?.competition?.event?.name.includes('Geneva Indoors')) {
      return 'geneva-indoors';
    }
  }

  private getPeriodsFromTchoukDotNetGame(game: TchoukNetGame): Match['periods'] {
    const scores = [];

    const periodCounts = [
      3,
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

  get year(): number | undefined {
    return this.startDate?.getFullYear();
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
    if (this.competition === 'swiss-cup') {
      return `${this.competition}-${this.seasonEndYear}`;
    }
    return `${this.competition}-${this.seasonShortDisplayName}`;
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
      case 'euro-2026':
        // We don't display a text above the corner logo for Euro 2026
        return;
    }
    console.warn('No corner display name defined for competition', this.competition);
    return;
  }
}
