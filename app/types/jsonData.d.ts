export interface JsonTeam {
  name: string;
  logo: string;
  color: string;
}

export interface JsonMatch {
  id: string;
  name: string;
  competition: string;
  mode: 'sets' | 'time';
  homeTeam: Team | null;
  awayTeam: Team | null;
}
