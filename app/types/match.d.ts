interface Team {
  name: string;
  logo: string;
  color: string;
}

interface Match {
  id: string;
  name: string;
  homeTeam: Team;
  awayTeam: Team;
}
