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
  homeTeam: JsonTeam | null;
  awayTeam: JsonTeam | null;
}
