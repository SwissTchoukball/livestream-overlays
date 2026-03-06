interface Team {
  name: string;
  logo: string;
  color: string;
}

interface Match {
  id: string;
  name: string;
  competition: string;
  mode: 'sets' | 'time';
  homeTeam: Team | null;
  awayTeam: Team | null;
}
